"use server";

import { createClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export async function deploySystemConfiguration(formData: FormData) {
  const supabase = createClient();

  const updateData = {
    business_name: formData.get("businessName"),
    corporate_color: formData.get("corporateColor"),
    gup_slug: formData.get("gupSlug"),
    business_bio: formData.get("businessBio"),
    is_public: formData.get("isPublic") === "true",
    mollie_live_key: formData.get("mollieLiveKey"),
    mollie_test_key: formData.get("mollieTestKey"),
    updated_at: new Date().toISOString(),
  };

  // Wir gehen davon aus, dass es nur einen Einstellungs-Satz gibt
  const { error } = await supabase
    .from("settings")
    .upsert({ id: 'global_config', ...updateData });

  if (error) {
    console.error("Deploy Error:", error.message);
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/settings");
  return { success: true };
}