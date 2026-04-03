"use server";

import { createClient } from "@/lib/supabaseClient"; // Dein Supabase-Server-Client

export async function updateMollieKeys(formData: FormData) {
  const supabase = createClient();
  const liveKey = formData.get("liveKey") as string;
  const testKey = formData.get("testKey") as string;

  const { error } = await supabase
    .from("settings")
    .update({ 
      mollie_live_key: liveKey, 
      mollie_test_key: testKey,
      updated_at: new Date().toISOString()
    })
    .eq("id", "DEINE_SETTINGS_ID"); // Hier die ID deiner Settings-Zeile nutzen

  if (error) throw new Error("Update fehlgeschlagen");
  return { success: true };
}