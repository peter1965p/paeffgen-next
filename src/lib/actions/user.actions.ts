"use server";

import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

/**
 * --- AETHER OS USER MANAGEMENT --- [cite: 2026-03-08]
 */

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export async function getUserList(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, username, email, role, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("AETHER_FETCH_WARNING: Standard-Abfrage fehlgeschlagen, starte Recovery...");
      // WICHTIG: Auch der Fallback muss 'username' enthalten, sonst knallt es in der UI! [cite: 2026-03-08]
      const { data: recoveryData, error: recoveryError } = await supabase
        .from("users")
        .select("id, username, email, role, created_at") 
        .limit(10);
        
      if (recoveryError) throw recoveryError;
      return (recoveryData as User[]) || [];
    }
    
    // Explizites Casting auf das Interface [cite: 2026-03-08]
    return (data as User[]) || [];
  } catch (error: any) {
    console.error("AETHER_USER_GET_ERROR:", error.message || error);
    return [];
  }
}

export async function updateUserRole(id: string | number, role: string) {
  try {
    const { error } = await supabase
      .from("users")
      .update({ role: role.toLowerCase() }) // Konsistenz: Kleinschreibung [cite: 2026-03-08]
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("AETHER_USER_UPDATE_ERROR:", error.message || error);
    return { success: false, error: error.message };
  }
}

export async function createUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const role = (formData.get("role") as string) || "admin";

  try {
    const { error } = await supabase
      .from("users")
      .insert([{ 
        username, 
        email, 
        role: role.toLowerCase(), 
        created_at: new Date().toISOString() 
      }]);

    if (error) throw error;

    revalidatePath("/admin/users");
    revalidatePath("/admin/intelligence"); // Revalidate für das Mailsystem [cite: 2026-03-08]
    return { success: true };
  } catch (error: any) {
    console.error("AETHER_USER_CREATE_ERROR:", error.message);
    return { success: false, error: error.message };
  }
}