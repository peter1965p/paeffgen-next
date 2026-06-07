"use client";
import { useState, useEffect } from "react";
import { 
  Layout, PenTool, ShoppingCart, ClipboardCheck, 
  Calculator, Monitor, Search, Cpu, Lock, CheckCircle2 
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

// Icon-Mapper für dynamische Icons aus der DB
const IconMap: any = {
  Layout: <Layout size={24} />,
  PenTool: <PenTool size={24} />,
  ShoppingCart: <ShoppingCart size={24} />,
  ClipboardCheck: <ClipboardCheck size={24} />,
  Calculator: <Calculator size={24} />,
  Monitor: <Monitor size={24} />,
  Search: <Search size={24} />,
  Cpu: <Cpu size={24} />,
};

export default function ModulStorePage() {
  const supabase = createClient();
  const [filter, setFilter] = useState<"Kostenlos" | "Premium">("Kostenlos");
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      const { data } = await supabase
        .from("modules")
        .select("*")
        .order("is_premium", { ascending: true });
      if (data) setModules(data);
      setLoading(false);
    }
    fetchModules();
  }, [supabase]);

  const handleAction = (module: any) => {
    if (module.is_premium) {
      alert(`Mollie Integration vorbereitet für: ${module.name} (${module.price_monthly}€/Mo)`);
      // Hier würde später createModuleSubscription() aufgerufen werden
    } else {
      alert(`${module.name} ist bereits in deinem System-Kern integriert.`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      {/* HEADER */}
      <div className="mb-16">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Modulstore</h1>
        <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">
          System-Erweiterungen für AETHER OS
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mb-12">
        <button 
          onClick={() => setFilter("Kostenlos")}
          className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'Kostenlos' ? 'bg-[#b33927] shadow-[0_0_20px_rgba(179,57,39,0.3)]' : 'bg-zinc-900 border border-white/5 text-slate-500'}`}
        >
          Kostenlos
        </button>
        <button 
          onClick={() => setFilter("Premium")}
          className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'Premium' ? 'bg-[#b33927] shadow-[0_0_20px_rgba(179,57,39,0.3)]' : 'bg-zinc-900 border border-white/5 text-slate-500'}`}
        >
          Premium
        </button>
      </div>

      {/* MODUL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.filter(m => m.category === filter).map((mod) => (
          <div 
            key={mod.id} 
            className="group relative bg-zinc-950 border border-white/5 p-10 rounded-[2.5rem] hover:border-white/10 transition-all flex flex-col h-full overflow-hidden"
          >
            {/* BACKGROUND DECO */}
            <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              {IconMap[mod.icon_name]}
            </div>

            {/* CONTENT */}
            <div className="mb-8 p-4 bg-zinc-900 w-fit rounded-2xl text-blue-500 shadow-inner">
              {mod.is_premium ? <Lock size={20} className="text-[#b33927]" /> : IconMap[mod.icon_name]}
            </div>

            <h3 className="text-xl font-black italic uppercase tracking-tight mb-2">{mod.name}</h3>
            <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-10">{mod.description}</p>

            <div className="mt-auto">
              <div className="flex justify-between items-center mb-6">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md ${mod.is_premium ? 'text-slate-400' : 'text-green-500 bg-green-500/10'}`}>
                  {mod.is_premium ? `${mod.price_monthly}€/Mo` : 'Aktiv'}
                </span>
                <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Gratis</span>
              </div>

              <button 
                onClick={() => handleAction(mod)}
                className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  mod.is_premium 
                  ? 'bg-[#b33927] hover:bg-[#d4442f] text-white shadow-[0_10px_20px_rgba(179,57,39,0.2)]' 
                  : 'bg-zinc-900 border border-white/5 text-slate-500 hover:text-white'
                }`}
              >
                {mod.is_premium ? 'Freischalten' : 'Bereit'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER INFO */}
      {filter === "Premium" && (
        <div className="mt-12 p-6 border border-[#b33927]/20 bg-[#b33927]/5 rounded-[2rem] flex items-center gap-6">
          <Lock size={20} className="text-[#b33927]" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#b33927]/80 leading-relaxed">
            Premium-Module erfordern eine Lizenz-Freischaltung via Mollie. <br/>
            Die Abrechnung erfolgt monatlich und ist jederzeit kündbar.
          </p>
        </div>
      )}
    </div>
  );
}