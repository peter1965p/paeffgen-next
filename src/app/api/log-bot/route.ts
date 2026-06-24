import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { bot_name, user_agent, path } = await request.json();
    if (!bot_name || !path) return NextResponse.json({ ok: false });

    const supabase = createClient();
    await supabase.from("bot_visits").insert({ bot_name, user_agent, path });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
