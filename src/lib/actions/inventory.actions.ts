"use server";

import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export type OrderResult =
  | { success: true; orderId: number | string; status: "PENDING" | "COMPLETED" }
  | { success: false; error: string; status?: never };

interface Product {
  id: number;
  name: string;
  price: number;
  cost_price: number;
  vat_rate: number;
  category_id: number;
  supplier_id?: number;
  stock: number;
  min_stock: number;
}

interface OrderWithItems {
  id: number;
  order_date: string;
  status: string;
  order_items: {
    quantity: number;
    products: { name: string } | null;
  }[];
}

interface SaleData {
  total_price: number | null;
}

interface Customer {
  id: number;
  full_name: string;
  email: string;
  tier: string;
  created_at: string;
}

// --- PRODUKT & INVENTAR LOGIK ---

export async function getInventoryData() {
  try {
    const { data, error } = await supabase.from("products").select(`
      id, name, price, cost_price, vat_rate, category_id, supplier_id, stock, min_stock
    `);

    if (error) throw error;

    return (data as Product[]).map((p) => ({
      ...p,
      bestand: p.stock || 0,
      min_bestand: p.min_stock || 5,
    }));
  } catch (error) {
    console.error("AETHER_INVENTORY_ERROR:", error);
    return [];
  }
}

export async function createFullProduct(data: {
  name: string;
  price: number;
  cost_price: number;
  vat_rate: number;
  category_id: number;
  supplier_id: number;
}) {
  try {
    const { data: newProduct, error } = await supabase
      .from("products")
      .insert([{
        name: data.name,
        price: data.price,
        cost_price: data.cost_price,
        vat_rate: data.vat_rate,
        category_id: data.category_id,
        supplier_id: data.supplier_id,
        stock: 0,
      }])
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/inventory");
    revalidatePath("/admin");
    return { success: true, id: newProduct.id };
  } catch (error) {
    console.error("AETHER_PRODUCT_CREATE_ERROR:", error);
    return { success: false };
  }
}

// --- BESTELL-LOGIK (ORDERS) ---

export async function getPendingOrders() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id, order_date, status,
        order_items (
          quantity,
          products ( name )
        )
      `)
      .eq("status", "PENDING")
      .order("order_date", { ascending: false });

    if (error) throw error;

    return (data as OrderWithItems[]).map((o) => ({
      id: o.id,
      datum: o.order_date,
      produkt_name: o.order_items?.[0]?.products?.name || "Unbekannt",
      menge: o.order_items?.[0]?.quantity || 0,
      status: o.status,
    }));
  } catch (error) {
    console.error("AETHER_ORDERS_ERROR:", error);
    return [];
  }
}

export async function createOrder(
  productId: number,
  quantity: number,
): Promise<OrderResult> {
  try {
    const { data: product } = await supabase
      .from("products")
      .select("price")
      .eq("id", productId)
      .single();

    if (!product) throw new Error("Produkt nicht gefunden");

    const { data: order, error: oError } = await supabase
      .from("orders")
      .insert([{
        status: "PENDING",
        total_price: product.price * quantity,
        order_date: new Date().toISOString(),
      }])
      .select()
      .single();

    if (oError) throw oError;

    await supabase.from("order_items").insert([{
      order_id: order.id,
      product_id: productId,
      quantity,
      price_at_purchase: product.price,
    }]);

    revalidatePath("/admin/inventory");
    return { success: true, orderId: order.id, status: "PENDING" };
  } catch (error) {
    console.error("AETHER_ORDER_CREATE_ERROR:", error);
    return { success: false, error: "System-Fehler bei Order-Erstellung" };
  }
}

// --- KATEGORIEN ---

export async function createCategory(name: string, slug: string) {
  try {
    await supabase.from("categories").insert([{ name, slug }]);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("AETHER_CAT_CREATE_ERROR:", error);
    return { success: false };
  }
}

export async function deleteCategory(id: number) {
  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("AETHER_CAT_DELETE_ERROR:", error);
    return { success: false };
  }
}

// --- ACCOUNTING & STATS ---

export async function getAccountingStats() {
  try {
    const { data: prodData } = await supabase
      .from("products")
      .select("stock, cost_price, price, min_stock");

    let invEK = 0;
    let invVK = 0;
    let lowStock = 0;

    (prodData as Product[])?.forEach((p) => {
      const stock = p.stock || 0;
      invEK += stock * (p.cost_price || 0);
      invVK += stock * (p.price || 0);
      if (stock < (p.min_stock || 5)) lowStock++;
    });

    const { data: salesData } = await supabase
      .from("orders")
      .select("total_price")
      .eq("status", "COMPLETED");

    const totalSales =
      (salesData as SaleData[])?.reduce(
        (sum, o) => sum + (o.total_price || 0),
        0,
      ) || 0;

    return { inventoryValueEK: invEK, inventoryValueVK: invVK, lowStock, totalSales };
  } catch (error) {
    console.error("AETHER_ACCOUNTING_ERROR:", error);
    return { inventoryValueEK: 0, inventoryValueVK: 0, lowStock: 0, totalSales: 0 };
  }
}

export async function getSettings() {
  try {
    const { data, error } = await supabase.from("settings").select("*").single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("AETHER_SETTINGS_ERROR", error);
    return null;
  }
}

export async function getCustomerDatabase() {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("id, full_name, email, tier, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Customer[];
  } catch (error) {
    console.error("AETHER_CUSTOMER_DB_ERROR:", error);
    return [];
  }
}
