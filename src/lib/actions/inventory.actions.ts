"use server";

import { supabase } from "@/lib/supabaseClient"; // Korrigierter Import
import { revalidatePath } from "next/cache";

// --- TYPEN DEFINITIONEN ---
export type OrderResult =
  | { success: true; orderId: number | string; status: "PENDING" | "COMPLETED" }
  | { success: false; error: string; status?: never };

interface Produkt {
  id: number;
  name: string;
  preis: number;
  ek_preis?: number;
  ust_satz?: number;
  category_id: number;
  supplier_id?: number;
  lagerbestand: number;
  min_bestand: number;
}

// --- PRODUKT & INVENTAR LOGIK ---

export async function getInventoryData() {
  try {
    const { data, error } = await supabase.from("produkte").select(`
        id, name, preis, category_id,
        lagerbestand,
        min_bestand
      `);

    if (error) throw error;

    return (data as Produkt[]).map((p) => ({
      ...p,
      bestand: p.lagerbestand || 0,
      min_bestand: p.min_bestand || 5,
    }));
  } catch (error) {
    console.error("AETHER_INVENTORY_ERROR:", error);
    return [];
  }
}

export async function createFullProduct(data: {
  name: string;
  preis: number;
  ek_preis: number;
  ust_satz: number;
  category_id: number;
  supplier_id: number;
}) {
  try {
    const { data: newProduct, error } = await supabase
      .from("produkte")
      .insert([
        {
          name: data.name,
          preis: data.preis,
          ek_preis: data.ek_preis,
          ust_satz: data.ust_satz,
          category_id: data.category_id,
          supplier_id: data.supplier_id,
          lagerbestand: 0,
        },
      ])
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
        id, datum, status,
        order_items (
          menge,
          produkte ( name )
        )
      `)
      .eq("status", "PENDING")
      .order("datum", { ascending: false });

    if (error) throw error;

    return (data as any[]).map((o) => ({
      id: o.id,
      datum: o.datum,
      produkt_name: o.order_items?.[0]?.produkte?.name || "Unbekannt",
      menge: o.order_items?.[0]?.menge || 0,
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
    const { data: produkt } = await supabase
      .from("produkte")
      .select("preis")
      .eq("id", productId)
      .single();

    if (!produkt) throw new Error("Produkt nicht gefunden");

    const { data: order, error: oError } = await supabase
      .from("orders")
      .insert([
        {
          typ: "POS",
          status: "PENDING",
          gesamtpreis: produkt.preis * quantity,
          datum: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (oError) throw oError;

    await supabase.from("order_items").insert([
      {
        order_id: order.id,
        produkt_id: productId,
        menge: quantity,
        einzelpreis: produkt.preis,
      },
    ]);

    revalidatePath("/admin/inventory");
    return { success: true, orderId: order.id, status: "PENDING" };
  } catch (error) {
    console.error("AETHER_ORDER_CREATE_ERROR:", error);
    return { success: false, error: "System-Fehler bei Order-Erstellung" };
  }
}

// --- KATEGORIEN & LIEFERANTEN ---

export async function createCategory(name: string, type: string) {
  try {
    await supabase.from("categories").insert([{ name, type }]);
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
      .from("produkte")
      .select("lagerbestand, ek_preis, preis, min_bestand");

    let invEK = 0;
    let invVK = 0;
    let lowStock = 0;

    (prodData as Produkt[])?.forEach((p) => {
      const stock = p.lagerbestand || 0;
      invEK += stock * (p.ek_preis || 0);
      invVK += stock * (p.preis || 0);
      if (stock < (p.min_bestand || 5)) lowStock++;
    });

    const { data: salesData } = await supabase
      .from("orders")
      .select("gesamtpreis")
      .eq("status", "COMPLETED");

    const totalSales =
      (salesData as any[])?.reduce((sum: number, o: any) => sum + (o.gesamtpreis || 0), 0) || 0;

    return {
      inventoryValueEK: invEK,
      inventoryValueVK: invVK,
      lowStock: lowStock,
      totalSales: totalSales,
    };
  } catch (error) {
    return {
      inventoryValueEK: 0,
      inventoryValueVK: 0,
      lowStock: 0,
      totalSales: 0,
    };
  }
}

export async function getSettings() {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("setting_key, setting_value");
    if (error) throw error;

    return (data as any[]).reduce((acc: any, row: any) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
  } catch (error) {
    console.error("AETHER_SETTINGS_ERROR", error);
    return {};
  }
}

export async function getCustomerDatabase() {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("id, name, email, status, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("AETHER_CUSTOMER_DB_ERROR:", error);
    return [];
  }
}

