"use client";

import { useState, useEffect } from "react";
import { 
  Zap, ShieldCheck, TrendingUp, Cpu, 
  RefreshCcw, Radio, Sparkles, Activity, Layers, Globe, BarChart3
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

export default function MissionControl() {
  const [analyzing, setAnalyzing] = useState(false);
  const [lastEvent, setLastEvent] = useState("Blog Post: 'Cyber-Security 2026'");

  // Simulation der Echtzeit-Analyse
  const triggerManualSync = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2500);
  };

  const trendData = [
    { h: 0, v: 30 }, { h: 4, v: 45 }, { h: 8, v: 40 }, 
    { h: 12, v: 75 }, { h: 16, v: 85 }, { h: 20, v: 92 }, { h: 24, v: 98 }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12 space-y-10 pb-32">
      
      {/* TOP BAR: SYSTEM STATUS */}
      <div className="flex justify-between items-center bg-zinc-950 border border-white/5 p-6 rounded-[2rem]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 bg-[#b33927] rounded-full animate-ping absolute" />
            <div className="w-3 h-3 bg-[#b33927] rounded-full relative" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">SPECTORA Intelligence Core Active</span>
        </div>
        <div className="hidden md:flex gap-8 text-[9px] font-mono text-zinc-600 uppercase">
          <span>Uplink: Stable</span>
          <span>Market Sync: 100%</span>
        </div>
      </div>

      {/* MAIN INTELLIGENCE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: LIVE PULSE & NOTIFICATION */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest inline-flex items-center gap-2 border border-emerald-500/20">
                <Sparkles size={12}/> Auto-Adaptive SEO Enabled
              </div>
              <h1 className="text-4xl md:text-7xl font-black italic uppercase leading-tight tracking-tighter">
                Deine SEO wurde <br />
                <span className="text-[#b33927]">automatisch angepasst.</span>
              </h1>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                <Activity size={14} className="text-[#b33927]" /> Trigger: {lastEvent}
              </p>
            </div>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#b33927]/5 blur-[120px] rounded-full -mr-20 -mt-20" />
          </div>

          {/* PROJECTED GROWTH CHART */}
          <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] space-y-8">
            <div className="flex justify-between items-end">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                <BarChart3 size={14} /> 14-Day Visibility Forecast
              </h3>
              <span className="text-2xl font-black italic text-emerald-500">+42.8%</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b33927" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#b33927" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#b33927" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT: REAL-TIME KEYWORDS & AI ACTIONS */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[3rem] space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-black uppercase italic tracking-widest text-white">Live Keywords</h2>
              <button onClick={triggerManualSync} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <RefreshCcw size={16} className={`${analyzing ? 'animate-spin text-[#b33927]' : 'text-zinc-600'}`} />
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { kw: "Managed Services IT", score: 98 },
                { kw: "Cloud Security Manderscheid", score: 94 },
                { kw: "Cyber-Defense KMU", score: 88 },
                { kw: "IT-Systemhaus", score: 76 }
              ].map((item) => (
                <div key={item.kw} className="bg-black/50 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-[#b33927]/30 transition-all">
                  <span className="text-[10px] font-mono text-zinc-300 uppercase">{item.kw}</span>
                  <span className="text-[9px] font-black text-[#b33927]">{item.score}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#b33927] p-8 rounded-[3rem] space-y-6 shadow-[0_20px_40px_rgba(179,57,39,0.2)]">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-white flex items-center gap-2">
              <Radio size={16} className="animate-pulse" /> Market Intel
            </h3>
            <p className="text-[10px] font-mono text-white/80 leading-relaxed uppercase tracking-wider">
              Aktuell hohes Suchvolumen für "Resiliente IT-Infrastruktur" erkannt. System hat die Beschreibung automatisch nachjustiert.
            </p>
            <div className="pt-4">
              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION LOG (FOOTER) */}
      <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-[2rem] flex flex-wrap gap-10 items-center justify-center text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
        <div className="flex items-center gap-2"><Layers size={12}/> Sitemap Updated</div>
        <div className="flex items-center gap-2"><Globe size={12}/> Google Ping: Sent</div>
        <div className="flex items-center gap-2"><ShieldCheck size={12}/> Schema.org: Valid</div>
      </div>
    </div>
  );
}