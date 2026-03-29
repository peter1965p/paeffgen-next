"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password");

  if (password === process.env.ADMIN_PASSWORD) {
    // Cookie setzen, gültig für 1 Tag (oder nach Bedarf anpassen)
    (await cookies()).set("admin_session", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    redirect("/admin");
  } else {
    return { error: "Falsches Passwort" };
  }
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/login");
}
