"use client"; // Wichtig für den Tab-Wechsel
import { useState } from "react";
import { 
  Lock, 
  Calculator, 
  MonitorSmartphone, 
  MessageSquare, 
  Search, 
  Share2, 
  BrainCircuit,
  BarChartHorizontal
} from "lucide-react";

export default function ModulStore() {
  const [activeTab, setActiveTab] = useState("premium"); // "kostenlos" oder "premium"

  const premiumModules = [
    { name: "Buchhaltung Pro", price: "49€/Mo", icon: Calculator },
    { name: "Kassensystem", price: "29€/Mo", icon: MonitorSmartphone },
    { name: "Community Forum", price: "19€/Mo", icon: MessageSquare },
    { name: "SEO Pro", price: "39€/Mo", icon: Search },
    { name: "Messaging Pro", price: "59€/Mo", icon: MessageSquare },
    { name: "Social Media Tool", price: "79€/Mo", icon: Share2 },
    { name: "Business Intelligence", price: "99€/Mo", icon: BarChartHorizontal },
    { name: "KI-Assistent Pro", price: "149€/Mo", icon: BrainCircuit },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans min-h-screen bg-black">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Modulstore</h1>
        <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Erweitere dein System mit kostenlosen und kostenpflichtigen Modulen</p>
        
        {/* Tab-Switcher (wie im Bild) */}
        <div className="flex gap-1 mt-8 bg-zinc-900/50 p-1.5 rounded-2xl w-fit border border-white/5">
          <button 
            onClick={() => setActiveTab("kostenlos")}
            className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTab === "kostenlos" ? "bg-[#b33927] text-white shadow-lg" : "text-slate-500 hover:text-white"
            }`}
          >
            Kostenlos
          </button>
          <button 
            onClick={() => setActiveTab("premium")}
            className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTab === "premium" ? "bg-[#b33927] text-white shadow-lg" : "text-slate-500 hover:text-white"
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {activeTab === "premium" && (
        <>
          {/* Premium Info-Banner */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-8 flex items-center gap-4">
            <Lock size={18} className="text-orange-500" />
            <p className="text-orange-200/70 text-xs font-medium tracking-wide">
              Premium-Module sind als Abo erhältlich. Klicke auf ein Modul zum Freischalten.
            </p>
          </div>

          {/* Premium Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumModules.map((mod, i) => (
              <div key={i} className="relative group overflow-hidden bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center transition-all hover:border-white/10">
                {/* Blur-Hintergrund für den "Lock"-Effekt */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10"></div>
                
                {/* Content (Hinter dem Blur) */}
                <div className="relative z-0 opacity-20 group-hover:opacity-30 transition-opacity">
                   <mod.icon size={48} className="mb-4 text-white mx-auto" />
                   <h3 className="text-white font-bold">{mod.name}</h3>
                </div>

                {/* Overlay Steuerung (Vordergrund) */}
                <div className="relative z-20 flex flex-col items-center">
                  <div className="p-4 bg-orange-500/10 rounded-2xl mb-4">
                    <Lock size={28} className="text-orange-500" />
                  </div>
                  <h3 className="text-white font-black uppercase italic tracking-tighter text-sm mb-1">{mod.name}</h3>
                  <p className="text-[#b33927] font-bold text-xs mb-6">{mod.price}</p>
                  <button className="bg-[#b33927] hover:bg-[#962f21] text-white text-[10px] font-black px-8 py-3 rounded-xl uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-xl">
                    Freischalten
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "kostenlos" && (
        <div className="text-white text-xs opacity-50 italic uppercase tracking-[0.3em] py-20 text-center">
          Lade kostenlose Module...
        </div>
      )}
    </div>
  );
}