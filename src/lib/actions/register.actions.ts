"use server";

import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

// Dein geheimer Code
const SECRET_INVITE_CODE = "SPECTORA-2026-X"; 

export async function register(prevState: any, formData: FormData) {
  // 1. Daten aus dem Formular extrahieren
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const inviteCode = formData.get("inviteCode") as string; // Hier wird inviteCode definiert!

  // 2. Invite Code Check
  if (inviteCode !== SECRET_INVITE_CODE) {
    return {
      error: "ACCESS_DENIED: Ungültiger Invite Code.",
      success: false,
    };
  }

  // 3. Supabase Auth Registration
  // Wir destrukturieren hier 'error', damit TypeScript weiß, woher es kommt
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "operator",
      },
    },
  });

  // 4. Fehlerbehandlung
  if (authError) {
    return {
      error: `UPLINK_ERROR: ${authError.message}`,
      success: false,
    };
  }

  // 5. Erfolg
  redirect("/login?message=registration-success");
  
  // Fallback für TS
  return { error: "", success: true };
}