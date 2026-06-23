"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Gute Nacht";
  if (hour < 11) return "Guten Morgen";
  if (hour < 14) return "Mahlzeit";
  if (hour < 18) return "Guten Tag";
  return "Guten Abend";
};

export default function AdminGreeting() {
  const [displayName, setDisplayName] = useState<string>("...");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setDisplayName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Operator");
      setUserId(user.id);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-black tracking-tighter uppercase italic">
        {getGreeting()}, {displayName} 👋
      </h1>
      <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">
        System-Status: Optimal // Operativ {userId && `// ID: ${userId.slice(0, 8)}`}
      </p>
    </div>
  );
}
