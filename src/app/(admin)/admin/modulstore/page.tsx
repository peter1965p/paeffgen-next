"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient"; // Dein Client-Pfad
import { 
  FileText, PenTool, ShoppingCart, ClipboardList, 
  Users2, HeartHandshake, Truck, Palette, Lock,
  Calculator, MonitorSmartphone, MessageSquare, Search, 
  Share2, BrainCircuit, BarChartHorizontal 
} from "lucide-react";

export default function ModulStore() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("kostenlos");
  const [activeModules, setActiveModules] = useState<string[]>([]);
  const userEmail = "news24regional@gmail.com"; // Dein Benutzer

  // 1. Aktive Module aus DB laden
  useEffect(() => {
    const loadSettings = async () => {
      const { data } = await supabase
        .from('users')
        .select('settings')
        .eq('email', userEmail)
        .single();
      if (data?.settings?.active_modules) {
        setActiveModules(data.settings.active_modules);
      }
    };
    loadSettings();
  }, []);

  // 2. Modul in DB freischalten/aktivieren
  const toggleModule = async (moduleKey: string) => {
    const isPaid = premiumModules.find(m => m.id === moduleKey);
    const newModules = activeModules.includes(moduleKey)
      ? activeModules.filter(id => id !== moduleKey)
      : [...activeModules, moduleKey];

    const { error } = await supabase
      .from('users')
      .update({ settings: { active_modules: newModules } })
      .eq('email', userEmail);

    if (!error) setActiveModules(newModules);
  };

  const freeModules = [
    { id: "cms", name: "CMS & Seiten", desc: "Seiten verwalten", icon: FileText },
    { id: "blog", name: "Blog", desc: "News & Artikel", icon: PenTool },
    { id: "shop", name: "Shop", desc: "Produkte & Sales", icon: ShoppingCart },
    { id: "forms", name: "Formularbuilder", desc: "Anfragen generieren", icon: ClipboardList },
  ];

  const premiumModules = [
    { id: "accounting", name: "Buchhaltung Pro", price: "49€/Mo", icon: Calculator },
    { id: "pos", name: "Kassensystem", price: "29€/Mo", icon: MonitorSmartphone },
    { id: "seo", name: "SEO Pro", price: "39€/Mo", icon: Search },
    { id: "ai", name: "KI-Assistent Pro", price: "149€/Mo", icon: BrainCircuit },
  ];

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto min-h-screen bg-black">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Modulstore</h1>
        <p className="text-slate-500 text-xs mt-2 uppercase tracking-[0.2em]">System-Erweiterungen für AETHER OS</p>
        
        <div className="flex gap-1 mt-8 bg-zinc-900/50 p-1.5 rounded-2xl w-fit border border-white/5">
          {["kostenlos", "premium"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? "bg-[#b33927] text-white shadow-lg" : "text-slate-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {activeTab === "kostenlos" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {freeModules.map((mod) => (
            <div key={mod.id} className="p-8 bg-zinc-950/40 border border-white/5 rounded-[2.5rem] flex flex-col justify-between group hover:border-blue-500/20 transition-all">
              <div>
                <div className="mb-6 text-blue-500 bg-blue-500/10 w-fit p-4 rounded-2xl">
                  <mod.icon size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2 uppercase italic">{mod.name}</h3>
                <p className="text-slate-500 text-[10px] leading-relaxed tracking-wider">{mod.desc}</p>
              </div>
              <div className="flex justify-between items-center mt-10">
                <span className={`px-4 py-1.5 text-[9px] font-black rounded-lg uppercase tracking-widest ${
                  activeModules.includes(mod.id) ? "bg-green-500/10 text-green-500" : "bg-zinc-800 text-zinc-500"
                }`}>
                  {activeModules.includes(mod.id) ? "AKTIV" : "BEREIT"}
                </span>
                <span className="text-slate-600 text-[10px] font-bold uppercase">Gratis</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-500">
          <div className="lg:col-span-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4 mb-2 flex items-center gap-4">
            <Lock size={16} className="text-orange-500" />
            <p className="text-orange-200/50 text-[10px] font-bold uppercase tracking-widest">Premium-Module erfordern eine Lizenz-Freischaltung.</p>
          </div>
          {premiumModules.map((mod) => (
            <div key={mod.id} className="group relative bg-zinc-950/20 border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center transition-all">
              <div className="absolute top-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <mod.icon size={80} strokeWidth={1} />
              </div>
              <div className="mb-6 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-orange-500">
                <Lock size={28} fill="currentColor" fillOpacity={0.1} />
              </div>
              <h3 className="text-white font-black uppercase italic text-sm mb-1">{mod.name}</h3>
              <p className="text-[#b33927] font-black text-[11px] mb-8">{mod.price}</p>
              <button 
                onClick={() => toggleModule(mod.id)}
                className="w-full bg-[#b33927] hover:bg-[#d4442f] text-white text-[10px] font-black py-4 rounded-2xl uppercase tracking-widest shadow-xl transition-all active:scale-95"
              >
                {activeModules.includes(mod.id) ? "Verwalten" : "Freischalten"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}