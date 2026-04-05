"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export async function login(prevState: any, formData: FormData) {
  // 1. Beide Felder dynamisch aus dem Formular ziehen
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Kleiner Safety-Check
  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort angeben." };
  }

  // 2. Supabase Server Client initialisieren
  const supabase = createClient();

  // 3. Echtes Login bei Supabase mit den eingegebenen Daten
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Auth-Fehler:", error.message);
    // Wir geben eine generische Meldung zurück, um Brute-Force zu erschweren
    return { error: "Zugriff verweigert: Logindaten ungültig." };
  }

  // 4. Wenn Login erfolgreich, setzen wir den Session-Cookie
  if (data.user) {
    (await cookies()).set("admin_session", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 Stunden
      path: "/",
    });
    
    // Redirect in den Admin-Bereich
    redirect("/admin");
  }

  return { error: "Kritischer Systemfehler: Authentifizierung fehlgeschlagen." };
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/login");
}