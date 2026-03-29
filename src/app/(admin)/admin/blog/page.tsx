"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const intelligenceUnits = [
  { title: "AETHER OS: System-Initialisierung 2026", slug: "system-initialisierung-2026", date: "08.03.2026", threat: "Low", status: "Encrypted" },
  { title: "Cyber-Sicherheit im Fokus", slug: "cyber-sicherheit-fokus", date: "08.03.2026", threat: "Medium", status: "Published" },
  { title: "Die Zukunft der IT-Infrastruktur", slug: "zukunft-it", date: "08.03.2026", threat: "Low", status: "Published" },
];

export default function IntelligenceHub() {
  return (
    <div className="p-10 space-y-12 bg-transparent">
      {/* Header analog zu Sectors [cite: 2026-03-08] */}
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div>
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none text-shadow-glow">Intelligence</h1>
          <p className="text-blue-500 font-mono text-[10px] mt-4 uppercase tracking-[0.4em]">Global Data Stream Management</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)]">
          + NEW ENTRY
        </button>
      </div>

      {/* Intelligence Cards [cite: 2026-03-08] */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {intelligenceUnits.map((unit, i) => (
          <motion.div
            key={unit.slug}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#0d111c]/50 border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/50 hover:bg-white/[0.03] transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-12">
              <div className="max-w-[70%]">
                <span className="text-blue-500 font-mono text-[9px] uppercase tracking-widest mb-2 block">Data Package // {unit.date}</span>
                <h3 className="text-3xl font-black text-white italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                  {unit.title}
                </h3>
              </div>
              <div className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${
                unit.threat === 'Medium' ? 'border-orange-500/50 text-orange-400 bg-orange-500/5' : 'border-blue-500/50 text-blue-400 bg-blue-500/5'
              }`}>
                {unit.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8 mb-8">
              <div className="bg-black/20 rounded-2xl p-4">
                <p className="text-slate-600 text-[8px] font-black uppercase tracking-widest mb-1">Source Slug</p>
                <p className="text-slate-400 font-mono text-[10px] truncate">/{unit.slug}</p>
              </div>
              <div className="bg-black/20 rounded-2xl p-4">
                <p className="text-slate-600 text-[8px] font-black uppercase tracking-widest mb-1">Access Level</p>
                <p className="text-white font-mono text-[10px]">Level 04 // Public</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href={`/admin/blog/edit/${unit.slug}`} className="flex-1">
                <button className="w-full bg-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-black hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                  DECRYPT & EDIT
                </button>
              </Link>
              <button className="w-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all text-slate-600">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}