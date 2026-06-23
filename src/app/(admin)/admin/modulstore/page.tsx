"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Layout, PenTool, ShoppingCart, ClipboardList,
  Calculator, Monitor, Search, Cpu, Lock, CheckCircle2,
  X, Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

interface Module {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  is_premium: boolean;
  icon_name: string;
  category: "Kostenlos" | "Premium";
}

interface UserSettings {
  active_modules: string[];
  [key: string]: unknown;
}

const IconMap: Record<string, React.ReactNode> = {
  Layout:        <Layout size={24} />,
  PenTool:       <PenTool size={24} />,
  ShoppingCart:  <ShoppingCart size={24} />,
  ClipboardList: <ClipboardList size={24} />,
  Calculator:    <Calculator size={24} />,
  Monitor:       <Monitor size={24} />,
  Search:        <Search size={24} />,
  Cpu:           <Cpu size={24} />,
};

export default function ModulStorePage() {
  const supabase = createClient();
  const [filter, setFilter] = useState<"Kostenlos" | "Premium">("Kostenlos");
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModules, setActiveModules] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [premiumModal, setPremiumModal] = useState<Module | null>(null);

  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);

    const [{ data: mods }, { data: userData }] = await Promise.all([
      supabase.from("modules").select("*").order("is_premium", { ascending: true }),
      supabase.from("users").select("settings").eq("id", user.id).single(),
    ]);

    if (mods) setModules(mods as Module[]);
    const settings = userData?.settings as UserSettings | null;
    if (settings?.active_modules) setActiveModules(settings.active_modules);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggle = async (mod: Module) => {
    if (mod.is_premium) {
      setPremiumModal(mod);
      return;
    }
    if (!userId || toggling) return;

    setToggling(mod.id);
    const isActive = activeModules.includes(mod.id);
    const updated = isActive
      ? activeModules.filter((m) => m !== mod.id)
      : [...activeModules, mod.id];

    const { data: userData } = await supabase
      .from("users")
      .select("settings")
      .eq("id", userId)
      .single();

    const currentSettings = (userData?.settings as UserSettings) || {};
    const { error } = await supabase
      .from("users")
      .update({ settings: { ...currentSettings, active_modules: updated } })
      .eq("id", userId);

    if (!error) setActiveModules(updated);
    setToggling(null);
  };

  const filtered = modules.filter((m) => m.category === filter);

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">

      {/* Premium Module Modal */}
      {premiumModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
          onClick={() => setPremiumModal(null)}
        >
          <div
            className="bg-[#0d111c] border border-[#b33927]/30 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl shadow-red-950/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#b33927]/10 rounded-2xl">
                  <Lock size={18} className="text-[#b33927]" />
                </div>
                <div>
                  <p className="text-[8px] font-mono text-[#b33927] uppercase tracking-widest">Premium Module</p>
                  <h2 className="text-lg font-black italic uppercase tracking-tighter text-white">{premiumModal.name}</h2>
                </div>
              </div>
              <button
                onClick={() => setPremiumModal(null)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              <p className="text-slate-400 text-[11px] leading-relaxed">{premiumModal.description}</p>

              <div className="flex items-center justify-between bg-white/5 rounded-2xl px-6 py-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Monatlich</span>
                <span className="text-2xl font-black text-white">{premiumModal.price_monthly}€<span className="text-xs text-slate-500 font-normal">/Mo</span></span>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#b33927]/5 border border-[#b33927]/20 rounded-2xl">
                <Zap size={14} className="text-[#b33927] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#b33927]/80 font-mono uppercase tracking-wider leading-relaxed">
                  Mollie-Integration in Arbeit — Lizenz-Freischaltung demnächst verfügbar.
                </p>
              </div>

              <button
                disabled
                className="w-full py-4 rounded-2xl bg-[#b33927]/20 text-[#b33927]/50 text-[10px] font-black uppercase tracking-widest cursor-not-allowed border border-[#b33927]/10"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">
          Module
        </h1>
        <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">
          System-Erweiterungen für SPECTORA
        </p>
      </div>

      <div className="flex gap-4 mb-12">
        {(["Kostenlos", "Premium"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f
                ? "bg-[#b33927] shadow-[0_0_20px_rgba(179,57,39,0.3)]"
                : "bg-zinc-900 border border-white/5 text-slate-500"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-slate-600 text-[10px] uppercase tracking-widest animate-pulse">
          Lade Module...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((mod) => {
            const isActive = activeModules.includes(mod.id);
            const isToggeling = toggling === mod.id;

            return (
              <div
                key={mod.id}
                className={`group relative bg-zinc-950 border p-10 rounded-[2.5rem] transition-all flex flex-col h-full overflow-hidden ${
                  isActive ? "border-green-500/30" : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                  {IconMap[mod.icon_name]}
                </div>

                <div className="mb-8 p-4 bg-zinc-900 w-fit rounded-2xl text-blue-500 shadow-inner">
                  {mod.is_premium
                    ? <Lock size={20} className="text-[#b33927]" />
                    : isActive
                      ? <CheckCircle2 size={20} className="text-green-500" />
                      : IconMap[mod.icon_name]}
                </div>

                <h3 className="text-xl font-black italic uppercase tracking-tight mb-2">
                  {mod.name}
                </h3>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-10">
                  {mod.description}
                </p>

                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md ${
                      isActive
                        ? "text-green-500 bg-green-500/10"
                        : mod.is_premium
                          ? "text-slate-400"
                          : "text-slate-600 bg-white/5"
                    }`}>
                      {mod.is_premium ? `${mod.price_monthly}€/Mo` : isActive ? "Aktiv" : "Inaktiv"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggle(mod)}
                    disabled={isToggeling}
                    className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 ${
                      mod.is_premium
                        ? "bg-[#b33927] hover:bg-[#d4442f] text-white"
                        : isActive
                          ? "bg-zinc-800 border border-green-500/20 text-green-400 hover:bg-red-900/20 hover:text-red-400 hover:border-red-500/20"
                          : "bg-zinc-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {isToggeling
                      ? "..."
                      : mod.is_premium
                        ? "Freischalten"
                        : isActive
                          ? "Deaktivieren"
                          : "Aktivieren"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filter === "Premium" && (
        <div className="mt-12 p-6 border border-[#b33927]/20 bg-[#b33927]/5 rounded-[2rem] flex items-center gap-6">
          <Lock size={20} className="text-[#b33927]" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#b33927]/80 leading-relaxed">
            Premium-Module erfordern eine Lizenz-Freischaltung via Mollie.
            Die Abrechnung erfolgt monatlich und ist jederzeit kündbar.
          </p>
        </div>
      )}
    </div>
  );
}
