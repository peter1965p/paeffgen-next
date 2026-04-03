"use client";

import { useState, useEffect } from "react";
import { 
  Mail, Trash2, Building2, Palette, 
  CreditCard, Save, Globe, Plus, ShieldCheck, Laptop
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("branding");
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 md:p-12 space-y-10 max-w-7xl mx-auto mb-24">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-6xl font-black italic uppercase text-white tracking-tighter leading-none">
            System <span className="text-[#b33927]">Settings</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mt-4 flex items-center gap-2">
            <Laptop size={12} className="text-blue-500" /> AETHER OS // Enterprise Core [2026.04]
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-white/5 shadow-2xl">
          {[
            { id: "branding", label: "Identity", icon: <Palette size={12} /> },
            { id: "profile", label: "Profiling", icon: <Globe size={12} /> },
            { id: "mollie", label: "Payment", icon: <CreditCard size={12} /> },
            { id: "mail", label: "Uplink", icon: <Mail size={12} /> },
            { id: "legal", label: "Legal", icon: <Building2 size={12} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === tab.id ? "bg-[#b33927] text-white shadow-lg shadow-[#b33927]/20" : "text-slate-500 hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        
        {/* BRANDING & DESIGN */}
        {activeTab === "branding" && (
          <div className="bg-zinc-950 border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-10 shadow-2xl animate-in fade-in duration-500">
            <h2 className="text-2xl font-black italic uppercase text-white flex items-center gap-4">
               System Appearance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Business Name</label>
                <input placeholder="Global Industries" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs focus:border-[#b33927] outline-none transition-all" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Corporate Color</label>
                <div className="flex gap-4">
                  <input type="color" defaultValue="#b33927" className="h-12 w-24 bg-black border border-white/10 rounded-xl cursor-pointer p-1" />
                  <input placeholder="#B33927" className="flex-1 bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILING & LANDINGPAGE */}
        {activeTab === "profile" && (
          <div className="bg-zinc-950 border border-emerald-500/10 p-8 md:p-12 rounded-[3rem] space-y-10 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black italic uppercase text-white">Public Profile</h2>
              <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">System Online</div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Global URL Path</label>
                <div className="flex items-center bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs">
                  <span className="text-slate-600">aether-os.de/</span>
                  <input placeholder="my-business-slug" className="bg-transparent border-none outline-none w-full ml-1" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Business Bio / Landingpage Text</label>
                <textarea rows={4} placeholder="Beschreibe deine Expertise..." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs focus:border-[#b33927] outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* MOLLIE PAYMENT */}
        {activeTab === "mollie" && (
          <div className="bg-zinc-950 border border-blue-500/10 p-8 md:p-12 rounded-[3rem] space-y-10 shadow-2xl animate-in fade-in duration-500">
            <h2 className="text-2xl font-black italic uppercase text-white flex items-center gap-4">Payment Infrastructure</h2>
            <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl flex items-center gap-5">
              <ShieldCheck className="text-blue-500 shrink-0" size={24} />
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-relaxed">
                Connect your Mollie account to enable automated module subscriptions and billing logic.
              </p>
            </div>
            <div className="space-y-6">
              <input type="password" placeholder="Mollie Live Key (live_...)" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs focus:border-blue-500 outline-none" />
              <input type="password" placeholder="Mollie Test Key (test_...)" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs focus:border-blue-500 outline-none" />
            </div>
          </div>
        )}

        {/* MAIL UPLINK (Bestehende Logik integriert) */}
        {activeTab === "mail" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-[#0d111c] border border-blue-500/20 p-8 rounded-[2.5rem] flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 font-black italic text-xl">P</div>
                <div>
                  <h3 className="text-white font-black uppercase italic tracking-wider text-lg text-blue-500">peter@paeffgen-it.de</h3>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-1">IMAP: imaps.udag.de // SSL active</p>
                </div>
              </div>
              <button className="p-4 hover:bg-red-500/10 rounded-2xl text-slate-600 hover:text-red-500 transition-all"><Trash2 size={20} /></button>
            </div>

            <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] space-y-8">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] flex items-center gap-3">
                <Plus size={16} /> Add New Connection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Email Address" className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs" />
                <input type="password" placeholder="App Secret / Key" className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs" />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black italic uppercase text-[11px] tracking-[0.3em] shadow-lg shadow-blue-500/10 transition-all">
                Initialize Uplink
              </button>
            </div>
          </div>
        )}

        {/* LEGAL & IMPRESSUM */}
        {activeTab === "legal" && (
          <div className="bg-zinc-950 border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-10 shadow-2xl animate-in fade-in duration-500">
            <h2 className="text-2xl font-black italic uppercase text-white">Business Registration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input placeholder="Inhaber / CEO" className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs" />
              <input placeholder="Steuer-Nummer" className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs" />
              <input placeholder="Straße & Hausnummer" className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs md:col-span-2" />
              <input placeholder="PLZ" className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs" />
              <input placeholder="Ort" className="bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs" />
            </div>
          </div>
        )}

      </div>

      {/* PERSISTENT SAVE BUTTON */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          className="bg-[#b33927] hover:bg-[#d4442f] text-white px-14 py-6 rounded-3xl font-black italic uppercase text-[12px] tracking-[0.3em] shadow-[0_25px_50px_rgba(179,57,39,0.3)] transition-all flex items-center gap-4 active:scale-95 group"
        >
          <Save size={24} className="group-hover:rotate-12 transition-transform" /> 
          Deploy System Configuration
        </button>
      </div>
    </div>
  );
}