"use server";

import { createClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPages() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("nav_order", { ascending: true });
  if (error) return [];
  return data;
}

export async function getPageById(id: number) {
  const supabase = createClient();
  const { data } = await supabase.from("pages").select("*").eq("id", id).single();
  return data;
}

export async function getPageBySlug(slug: string) {
  const supabase = createClient();
  const { data } = await supabase.from("pages").select("*").eq("slug", slug).single();
  return data;
}

export async function createPage(formData: FormData) {
  const supabase = createClient();

  const title = formData.get("title") as string;
  const rawSlug = formData.get("slug") as string;
  const slug = rawSlug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const { data, error } = await supabase
    .from("pages")
    .insert({
      title,
      slug,
      content:          formData.get("content")          as string || "",
      meta_title:       formData.get("meta_title")       as string || title,
      meta_description: formData.get("meta_description") as string || "",
      is_published:     formData.get("is_published")     === "on",
      show_in_nav:      formData.get("show_in_nav")      === "on",
      nav_order:        parseInt(formData.get("nav_order") as string) || 0,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/pages");
  redirect(`/admin/pages/edit/${data.id}`);
}

export async function updatePage(id: number, formData: FormData) {
  const supabase = createClient();

  const title = formData.get("title") as string;
  const rawSlug = formData.get("slug") as string;
  const slug = rawSlug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const { error } = await supabase
    .from("pages")
    .update({
      title,
      slug,
      content:          formData.get("content")          as string || "",
      meta_title:       formData.get("meta_title")       as string || title,
      meta_description: formData.get("meta_description") as string || "",
      is_published:     formData.get("is_published")     === "on",
      show_in_nav:      formData.get("show_in_nav")      === "on",
      nav_order:        parseInt(formData.get("nav_order") as string) || 0,
      updated_at:       new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/pages");
  revalidatePath(`/${slug}`);
  return { success: true };
}

export async function deletePage(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/pages");
  return { success: true };
}
