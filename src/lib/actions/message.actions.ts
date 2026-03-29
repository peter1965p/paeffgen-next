"use server";

import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

/**
 * --- AETHER OS INTELLIGENCE ACTIONS ---
 * Zentrale Logik für das interne Mailsystem auf paeffgen-it.de [cite: 2026-02-20, 2026-03-08]
 */

// 1. Nachricht senden (Broadcast) [cite: 2026-03-08]
export async function sendInternalMessage(formData: FormData) {
  const receiver_id = formData.get("receiver_id") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  
  // Deine Admin-ID aus dem users-Cluster (image_72811d.png) [cite: 2026-03-08]
  const sender_id = "ab67ef59-2070-4f90-b0d5-742d2bf92911"; 

  try {
    const { error } = await supabase
      .from("messages")
      .insert([
        { 
          sender_id, 
          receiver_id, 
          subject, 
          content,
          is_read: false,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;

    // Cache leeren, damit die Inbox sofort aktualisiert wird [cite: 2026-03-08]
    revalidatePath("/admin/intelligence");
    return { success: true };
  } catch (error: any) {
    console.error("AETHER_MAIL_SEND_ERROR:", error.message);
    return { success: false, error: error.message };
  }
}

// 2. Posteingang abrufen (Inbox) [cite: 2026-03-08]
export async function getInboxMessages(userId: string) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        id,
        subject,
        content,
        created_at,
        is_read,
        sender:users!messages_sender_id_fkey (
          username,
          email
        )
      `)
      .eq("receiver_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error: any) {
    console.error("AETHER_INBOX_FETCH_ERROR:", error.message);
    return [];
  }
}

// 3. Nachricht als gelesen markieren [cite: 2026-03-08]
export async function markMessageAsRead(messageId: string) {
  try {
    const { error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("id", messageId);

    if (error) throw error;

    revalidatePath("/admin/intelligence");
    return { success: true };
  } catch (error: any) {
    console.error("AETHER_MAIL_UPDATE_ERROR:", error.message);
    return { success: false };
  }
}

export async function markAsRead(id: string) {
  await supabase.from("messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/intelligence");
}