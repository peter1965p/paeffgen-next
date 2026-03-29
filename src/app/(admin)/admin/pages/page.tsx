"use client";

import { motion } from "framer-motion";

const sectors = [
  { name: "Home", slug: "/home", status: "Operational", load: "low", lastUpdate: "07.03.2026" },
  { name: "Newsroom", slug: "/blog", status: "Operational", load: "high", lastUpdate: "08.03.2026" },
];

export default function SectorsPage() {
  return (
    <div className="p-10 bg-transparent">
      <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">Sectors</h1>
          <p className="text-blue-500 font-mono text-[10px] mt-4 uppercase tracking-[0.4em]">Environmental Control Unit</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)]">
          + Init Sector
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sectors.map((s) => (
          <motion.div 
            key={s.slug}
            whileHover={{ scale: 1.02 }}
            className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] hover:bg-white/[0.05] hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-12">
              <h3 className="text-4xl font-black text-white italic tracking-tighter">{s.name}</h3>
              <div className="px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[9px] font-black uppercase tracking-widest animate-pulse">
                {s.status}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest border-t border-white/5 pt-8">
              <div className="flex justify-between"><span>Endpoint:</span> <span className="text-white">{s.slug}</span></div>
              <div className="flex justify-between"><span>Last Sync:</span> <span className="text-white">{s.lastUpdate}</span></div>
            </div>

            <div className="mt-10 flex gap-4">
              <button className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Edit Sector</button>
              <button className="w-16 py-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all text-slate-600">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}