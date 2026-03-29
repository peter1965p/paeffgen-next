"use client";

import { Mail, Shield, Plus, Trash2 } from "lucide-react";

export default function MailSettings() {
  return (
    <div className="p-10 space-y-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            System <span className="text-blue-500">Settings</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] mt-2">
            Uplink: paeffgen-it.de // Account Management [cite: 2026-02-20]
          </p>
        </div>
      </div>

      {/* Account Liste (Individuell erweiterbar) */}
      <div className="grid gap-6">
        <div className="bg-[#0d111c] border border-blue-500/20 p-6 rounded-[2rem] flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 font-black italic">P</div>
            <div>
              <h3 className="text-white font-bold uppercase italic">peter@paeffgen-it.de</h3>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">IMAP: imaps.udag.de // Port: 993</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 hover:bg-white/5 rounded-xl text-slate-500 transition-all"><Trash2 size={16} /></button>
          </div>
        </div>

        {/* Formular für neue Accounts */}
        <div className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] space-y-6 shadow-2xl">
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em] flex items-center gap-2">
            <Plus size={14} /> Add New Data Uplink
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Email (z.B. info@paeffgen-it.de)" className="bg-[#0d111c] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs focus:border-blue-500 outline-none" />
            <input type="password" placeholder="Passwort / App-Key" className="bg-[#0d111c] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs focus:border-blue-500 outline-none" />
            <input placeholder="IMAP: imaps.udag.de" defaultValue="imaps.udag.de" className="bg-[#0d111c] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs opacity-50" />
            <input placeholder="SMTP: smtps.udag.de" defaultValue="smtps.udag.de" className="bg-[#0d111c] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs opacity-50" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black italic uppercase text-[10px] tracking-widest shadow-lg shadow-blue-500/10 transition-all">
            Initialize Account
          </button>
        </div>
      </div>
    </div>
  );
}