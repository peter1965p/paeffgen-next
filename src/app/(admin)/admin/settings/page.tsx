"use client";

import { useState, useEffect } from "react";
import { 
  Mail, Trash2, Building2, Palette, 
  CreditCard, Save, Globe, Plus, ShieldCheck, Laptop,
  Lock, Terminal, ChevronRight, CheckCircle2
} from "lucide-react";
import { deploySystemConfiguration } from "@/lib/actions/settings.actions";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("branding");
  const [host, setHost] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  // Erkennt die Domain automatisch für den Global URL Path (GUP)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.hostname);
    }
  }, []);

  // Kleiner Timer für die Statusmeldung
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(formData: FormData) {
    // Den Toggle-Status manuell hinzufügen, da Checkboxen/Buttons im FormData oft tricky sind
    formData.append("isPublic", String(isPublic));
    
    const result = await deploySystemConfiguration(formData);
    if (result.success) {
      setStatus({ type: 'success', msg: 'System Configuration Deployed Successfully' });
    } else {
      setStatus({ type: 'error', msg: 'Deployment Failed: ' + result.message });
    }
  }

  return (
    <div className="p-6 md:p-12 space-y-10 max-w-7xl mx-auto mb-32">
      
      {/* SUCCESS / ERROR TOAST */}
      {status && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl ${
          status.type === 'success' ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400' : 'bg-red-950 border-red-500/50 text-red-400'
        }`}>
          <CheckCircle2 size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest">{status.msg}</span>
        </div>
      )}

      <form action={handleSubmit}>
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div className="animate-in slide-in-from-left duration-700">
            <h1 className="text-6xl font-black italic uppercase text-white tracking-tighter leading-none">
              System <span className="text-[#b33927]">Settings</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mt-4 flex items-center gap-2">
              <Laptop size={12} className="text-[#b33927]" /> SPECTORA // ENTERPRISE CORE
            </p>
          </div>

          {/* NAVIGATION TABS */}
          <div className="flex flex-wrap gap-2 bg-black p-2 rounded-[2rem] border border-white/5 shadow-2xl animate-in fade-in duration-1000">
            {[
              { id: "branding", label: "Identity", icon: <Palette size={14} /> },
              { id: "profile", label: "Profiling", icon: <Globe size={14} /> },
              { id: "mollie", label: "Payment", icon: <CreditCard size={14} /> },
              { id: "mail", label: "Uplink", icon: <Mail size={14} /> },
              { id: "legal", label: "Legal", icon: <Building2 size={14} /> }
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? "bg-[#b33927] text-white shadow-xl shadow-[#b33927]/20 scale-105" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-10">
          
          {/* BRANDING & DESIGN */}
          {activeTab === "branding" && (
            <div className="bg-zinc-950 border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="p-3 bg-[#b33927]/10 rounded-2xl text-[#b33927]"><Palette size={20}/></div>
                <h2 className="text-2xl font-black italic uppercase text-white">System Appearance</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Business Name</label>
                  <input name="businessName" placeholder="Global Industries" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none transition-all shadow-inner" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Corporate Color</label>
                  <div className="flex gap-4">
                    <input name="corporateColor" type="color" defaultValue="#b33927" className="h-16 w-24 bg-black border border-white/10 rounded-2xl cursor-pointer p-2" />
                    <input placeholder="#B33927" className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROFILING & LANDINGPAGE */}
          {activeTab === "profile" && (
            <div className="bg-zinc-950 border border-emerald-500/10 p-8 md:p-12 rounded-[3rem] space-y-10 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start md:items-center border-b border-white/5 pb-8">
                <div>
                  <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter flex items-center gap-4">
                    <Globe className="text-emerald-500" size={24} /> Public Profile
                  </h2>
                  <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-2 ml-10">
                    Node Identity Management // GUP Config
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    System Online
                  </div>
                  <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-[0.2em]">Detected Host: {host}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-end px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Global URL Path (GUP)</label>
                    <span className="text-[8px] font-black italic text-[#b33927] uppercase tracking-widest">Dynamic Domain Active</span>
                  </div>
                  <div className="flex items-center bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus-within:border-[#b33927] transition-all group shadow-inner">
                    <span className="text-zinc-700 group-focus-within:text-[#b33927] transition-colors">{host || "paeffgen-it.de"}/</span>
                    <input name="gupSlug" placeholder="my-business-slug" className="bg-transparent border-none outline-none w-full ml-1 placeholder:text-zinc-900" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Business Bio / Landingpage Text</label>
                  <textarea name="businessBio" rows={5} placeholder="Beschreibe deine Expertise..." className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none transition-all resize-none shadow-inner" />
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between bg-black/20 p-6 rounded-[2rem]">
                  <div className="space-y-1">
                    <h3 className="text-[11px] font-black uppercase text-white tracking-widest">Live Deployment</h3>
                    <p className="text-[8px] font-mono text-zinc-600 uppercase">Aktiviert die öffentliche Erreichbarkeit unter deinem Slug.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsPublic(!isPublic)}
                    className="h-7 w-14 bg-zinc-900 rounded-full p-1 relative flex items-center group transition-all border border-white/5"
                  >
                    <div className={`h-5 w-5 rounded-full transition-all shadow-lg ${isPublic ? 'bg-emerald-500 shadow-emerald-500/40 translate-x-7' : 'bg-zinc-700 translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MOLLIE PAYMENT */}
          {activeTab === "mollie" && (
            <div className="bg-zinc-950 border border-blue-500/10 p-8 md:p-12 rounded-[3rem] space-y-10 shadow-2xl animate-in fade-in duration-500">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                <h2 className="text-2xl font-black italic uppercase text-white flex items-center gap-4">
                  <CreditCard className="text-blue-500" size={24} /> Payment Infrastructure
                </h2>
                <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">API Version: 1.4.2</span>
              </div>
              
              <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-[2rem] flex items-start gap-5">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Lock size={20} /></div>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em] leading-relaxed pt-1">
                  Connect your Mollie account to enable automated module subscriptions and real-time billing logic.
                </p>
              </div>

              <div className="grid gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 italic">Mollie Live Key</label>
                  <input name="mollieLiveKey" type="password" placeholder="live_xxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-blue-500 outline-none transition-all shadow-inner" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 italic">Mollie Test Key</label>
                  <input name="mollieTestKey" type="password" placeholder="test_xxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-blue-500 outline-none transition-all opacity-60 focus:opacity-100 shadow-inner" />
                </div>
              </div>
            </div>
          )}

          {/* MAIL UPLINK */}
          {activeTab === "mail" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-[#0d111c] border border-blue-500/20 p-8 rounded-[3rem] flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 font-black italic text-2xl rotate-3 shadow-inner">P</div>
                  <div>
                    <h3 className="text-white font-black uppercase italic tracking-wider text-xl">peter@paeffgen-it.de</h3>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.4em] mt-1 flex items-center gap-2">
                      <Terminal size={10} className="text-emerald-500" /> IMAP: imaps.udag.de // SSL active
                    </p>
                  </div>
                </div>
                <button type="button" className="p-5 hover:bg-red-500/10 rounded-2xl text-slate-700 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20 group">
                  <Trash2 size={22} className="group-active:scale-75 transition-transform" />
                </button>
              </div>

              <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] space-y-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full" />
                <h2 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] flex items-center gap-4">
                  <Plus size={18} /> Uplink Node Initialization
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Relay Address</label>
                    <input name="mailAddress" placeholder="email@provider.com" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-blue-500 outline-none" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">App Encryption Secret</label>
                    <input name="mailSecret" type="password" placeholder="••••••••••••" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LEGAL & IMPRESSUM */}
          {activeTab === "legal" && (
            <div className="bg-zinc-950 border border-red-500/10 p-8 md:p-12 rounded-[3rem] space-y-12 shadow-2xl animate-in fade-in duration-500">
              <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                <div className="p-3 bg-red-500/10 rounded-2xl text-red-500"><Building2 size={20}/></div>
                <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">Business Registration</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">CEO / Representative</label>
                  <input name="ceoName" placeholder="Inhaber / CEO" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Tax ID / VAT</label>
                  <input name="taxId" placeholder="Steuer-Nummer" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Headquarters Address</label>
                  <input name="address" placeholder="Straße & Hausnummer" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Postal Code</label>
                  <input name="plz" placeholder="PLZ" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">City / Region</label>
                  <input name="city" placeholder="Ort" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-white font-mono text-xs focus:border-[#b33927] outline-none" />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* PERSISTENT SAVE BUTTON (Optimiert & Kleiner) */}
        <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right duration-700 delay-300">
          <button 
            type="submit"
            className="bg-[#b33927] hover:bg-[#d4442f] text-white px-8 py-4 rounded-xl font-black italic uppercase text-[9px] tracking-[0.3em] shadow-[0_20px_40px_rgba(179,57,39,0.25)] border border-white/5 transition-all flex items-center gap-3 active:scale-95 group"
          >
            <Save size={16} className="group-hover:rotate-12 transition-transform" /> 
            Deploy Config
          </button>
        </div>
      </form>
    </div>
  );
}