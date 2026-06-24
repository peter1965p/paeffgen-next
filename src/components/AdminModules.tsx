"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import {
  Layers, FileText, PenTool, ShoppingCart, ClipboardList,
  Users2, HeartHandshake, Truck, Palette, Calculator,
} from "lucide-react";

const moduleIconMap: Record<string, React.ElementType> = {
  cms: FileText,
  blog: PenTool,
  shop: ShoppingCart,
  forms: ClipboardList,
  users: Users2,
  crm: HeartHandshake,
  suppliers: Truck,
  theming: Palette,
  accounting_pro: Calculator,
};

export default function AdminModules() {
  const [modules, setModules] = useState<string[] | null>(null);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        setModules([]);
        return;
      }
      const { data } = await supabase
        .from("users")
        .select("settings")
        .eq("email", user.email)
        .single();
      setModules(data?.settings?.active_modules ?? []);
    })();
  }, []);

  if (modules === null) {
    return <p className="text-slate-600 text-[10px] italic uppercase tracking-widest py-2 animate-pulse">Lade Module...</p>;
  }

  if (modules.length === 0) {
    return <p className="text-slate-600 text-[10px] italic uppercase tracking-widest py-2">Keine Module via DB aktiviert.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {modules.map((key) => {
        const Icon = moduleIconMap[key] || Layers;
        return (
          <div
            key={key}
            className="flex items-center gap-3 px-6 py-3.5 bg-slate-700/80 border border-white/5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:border-blue-500/50 transition-all cursor-default"
          >
            <Icon size={14} className="text-blue-500 opacity-80" />
            {key.replace("_", " ")}
          </div>
        );
      })}
    </div>
  );
}
