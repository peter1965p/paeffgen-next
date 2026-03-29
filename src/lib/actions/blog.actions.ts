"use server";

import { supabase } from "@/lib/supabaseClient"; // Korrekter Pfad laut deinem Explorer
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/admin/blog"); // Cache leeren, damit der neue Post erscheint
  redirect("/admin/blog");
}