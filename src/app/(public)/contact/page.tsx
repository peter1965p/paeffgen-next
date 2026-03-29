"use client";
import { Send, Terminal, Cpu, MapPin, Calendar } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Terminal size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">
              Request_Interface // V3.0.4
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
            SERVICE <span className="text-blue-600">REQUEST.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-mono text-xs uppercase tracking-tight">
            Initialisieren Sie einen Hardware-Einsatz oder fordern Sie eine Fehleranalyse an.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          
          {/* Form Side */}
          <div className="md:col-span-3">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-500 ml-2">Client_Name</label>
                  <input type="text" placeholder="Vorname Nachname" className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl font-mono text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-500 ml-2">Contact_Endpoint</label>
                  <input type="email" placeholder="email@firma.de" className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl font-mono text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-slate-500 ml-2">Service_Type</label>
                <select className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl font-mono text-sm focus:border-blue-500/50 outline-none transition-all appearance-none text-zinc-400">
                  <option>Hardware_Replacement</option>
                  <option>Fault_Analysis_Onsite</option>
                  <option>Rollout_Deployment</option>
                  <option>Other_Technical_Issues</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-slate-500 ml-2">Incident_Description</label>
                <textarea rows={5} placeholder="Beschreiben Sie den Defekt oder das Projektziel..." className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl font-mono text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700 resize-none"></textarea>
              </div>

              <button className="group w-full py-5 bg-blue-600 hover:bg-white text-white hover:text-black font-black italic uppercase text-xs rounded-xl transition-all flex items-center justify-center gap-3">
                Request_Initialisieren <Send size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="md:col-span-2 space-y-8">
            <div className="p-6 border border-white/5 rounded-3xl bg-zinc-900/20 backdrop-blur-sm">
              <h3 className="text-[10px] font-mono font-bold uppercase text-blue-500 mb-6 flex items-center gap-2">
                <Cpu size={14} /> System_Parameters
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-white">Einsatzgebiet</p>
                    <p className="text-xs text-slate-500 italic">RLP, Saarland, Hessen, BaWü, NRW</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Calendar size={16} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-white">Verfügbarkeit</p>
                    <p className="text-xs text-slate-500 italic">Ab 01.05.2026 für neue Projekte</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 border border-blue-500/20 rounded-3xl bg-blue-500/5">
              <p className="text-[10px] font-mono text-blue-400 uppercase leading-relaxed italic">
                "Anfragen werden innerhalb der Standard-SLA (24h) gesichtet und technisch bewertet."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}