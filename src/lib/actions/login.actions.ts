"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseClient"; // Wir brauchen den Server-Client!

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  const email = "news24regional@gmail.com"; 

  // 1. Supabase Server Client initialisieren
  const supabase = createClient();

  // 2. Echtes Login bei Supabase versuchen
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Auth-Fehler:", error.message);
    return { error: "Zugriff verweigert: " + error.message };
  }

  // 3. Wenn Login erfolgreich, setzen wir den Session-Cookie
  if (data.user) {
    (await cookies()).set("admin_session", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    
    // Wichtig: Redirect muss außerhalb von try/catch stehen
    redirect("/admin");
  }

  return { error: "Unbekannter Fehler beim Login" };
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/login");
}