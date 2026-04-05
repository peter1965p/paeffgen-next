"use server";

import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Erstellt einen neuen Blog-Post
 */
export async function createBlogPost(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  const { error } = await supabase
    .from('blog_posts')
    .insert([{ title, slug, content, is_published: false }]);

  if (error) {
    return { error: `Supabase Fehler: ${error.message}` };
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

/**
 * Holt einen einzelnen Blog-Post anhand des Slugs oder der ID
 * Wir nutzen hier den Slug, da dieser in deiner URL (.../edit/cyber-sicherheit-fokus) steht.
 */
export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Fehler beim Laden des Posts:", error.message);
    return null;
  }

  return data;
}

/**
 * Aktualisiert einen bestehenden Blog-Post
 */
export async function updateBlogPost(id: string, prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const is_published = formData.get("is_published") === "true";

  const { error } = await supabase
    .from("blog_posts")
    .update({ title, slug, content, is_published, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: `Update Fehler: ${error.message}` };
  }

  revalidatePath("/admin/blog");
  revalidatePath(`/blog/${slug}`); // Auch die öffentliche Seite aktualisieren
  redirect("/admin/blog");
}

/**
 * Holt einen einzelnen Blog-Post anhand der technischen ID (UUID)
 */
export async function getBlogPostById(id: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id) // Suche nach der ID-Spalte
    .single();

  if (error) {
    console.error("Fehler beim Laden des Posts per ID:", error.message);
    return null;
  }

  return data;
}

