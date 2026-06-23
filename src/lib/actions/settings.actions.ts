"use server";

import { createClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export async function getSystemSettings() {
  const supabase = createClient();
  const { data } = await supabase.from("settings").select("*").single();
  return data;
}

export async function deploySystemConfiguration(formData: FormData) {
  const supabase = createClient();

  const updateData = {
    company_name:      formData.get("businessName")    as string || undefined,
    primary_color:     formData.get("corporateColor")  as string || undefined,
    mollie_live_key:   formData.get("mollieLiveKey")   as string || undefined,
    mollie_test_key:   formData.get("mollieTestKey")   as string || undefined,
    owner_name:        formData.get("ceoName")         as string || undefined,
    tax_number:        formData.get("taxId")           as string || undefined,
    address_full:      formData.get("address")         as string || undefined,
    support_email:     formData.get("mailAddress")     as string || undefined,
    system_designation: "SPECTORA",
    updated_at:        new Date().toISOString(),
  };

  const { error } = await supabase
    .from("settings")
    .update(updateData)
    .not("id", "is", null);

  if (error) {
    console.error("SPECTORA_SETTINGS_DEPLOY_ERROR:", error.message);
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/settings");
  return { success: true };
}
