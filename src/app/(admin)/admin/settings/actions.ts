"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function saveSettings(updates: Record<string, string>) {
  const { error } = await supabaseAdmin
    .from("settings")
    .upsert({ id: 1, ...updates }, { onConflict: "id" });
  if (error) return { error: error.message };
  return { success: true };
}
