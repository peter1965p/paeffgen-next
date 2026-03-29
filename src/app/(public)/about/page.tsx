import { Shield, Clock, HardDrive, Wrench, ClipboardCheck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header: Status-Meldung */}
        <div className="mb-16 border-l-4 border-blue-600 pl-8 py-4">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            SYSTEM <span className="text-blue-600">ENGINEER.</span>
          </h1>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-[0.3em]">
            Peter Paeffgen // Hardware-Lifecycle & Field Service
          </p>
        </div>

        {/* Profil-Sektion */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold italic uppercase text-blue-500">Profil_Analyse</h2>
            <p className="text-slate-400 leading-relaxed font-light">
              Als versierter IT-Techniker mit Fokus auf Hardware-Lifecycle und Vor-Ort-Service sorge ich für maximale Systemverfügbarkeit. 
              Meine Arbeitsweise ist geprägt von einer hohen Erstlösungsquote und technischer Präzision.
            </p>
            <p className="text-slate-400 leading-relaxed font-light">
              Zuletzt bei <span className="text-white font-semibold">Hemmersbach</span> tätig, liegt meine Stärke darin, komplexe Fehlerbilder schnell zu analysieren 
              und Hardware-Infrastrukturen effizient instand zu setzen – auch in zeitkritischen Situationen.
            </p>
          </div>
          <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-[10px] font-mono font-bold uppercase text-blue-500 mb-4 tracking-widest">Verfügbarkeit</h3>
            <div className="space-y-2">
              <p className="text-2xl font-black italic tracking-tighter">01.05.2026</p>
              <p className="text-[9px] font-mono text-slate-500 uppercase">Projektende Hemmersbach: 30.04.2026</p>
            </div>
          </div>
        </div>

        {/* Kompetenz-Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 mb-20">
          {[
            { icon: <HardDrive size={18} />, title: "Hardware-Management", text: "Austausch & Upgrade von Notebooks, PCs, Workstations & Druckersystemen." },
            { icon: <Wrench size={18} />, title: "Fehleranalyse", text: "Gezieltes Troubleshooting und Entstörung direkt am Point of Presence (PoP)." },
            { icon: <ClipboardCheck size={18} />, title: "Service-Exzellenz", text: "Lückenlose Dokumentation in Ticketsystemen wie ServiceNow." },
            { icon: <Shield size={18} />, title: "Field-Support", text: "Eigenverantwortliche Reparaturen unter Einhaltung strenger SLAs." }
          ].map((item, i) => (
            <div key={i} className="bg-[#05070a] p-8 group hover:bg-zinc-900/50 transition-all">
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h4 className="text-xs font-mono font-bold uppercase mb-2 tracking-widest">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Arbeitsweise / Stärken */}
        <div className="space-y-12">
          <h2 className="text-xl font-bold italic uppercase text-blue-500 text-center">Modus_Operandi</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white">1</div>
              <h5 className="text-[10px] font-mono uppercase font-bold">Resilienz</h5>
              <p className="text-[11px] text-slate-500 italic">Souveränes Arbeiten auch bei hohem Ticketaufkommen.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white">2</div>
              <h5 className="text-[10px] font-mono uppercase font-bold">Verlässlichkeit</h5>
              <p className="text-[11px] text-slate-500 italic">Hohes Verantwortungsbewusstsein gegenüber Kunden-Assets.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white">3</div>
              <h5 className="text-[10px] font-mono uppercase font-bold">Präzision</h5>
              <p className="text-[11px] text-slate-500 italic">Saubere Dokumentation für stabile Prozesse.</p>
            </div>
          </div>
        </div>

        {/* Footer-Note */}
        <div className="mt-24 p-10 border border-blue-600/20 rounded-[3rem] bg-blue-600/5 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-500 mb-4">Berufliches Selbstverständnis</p>
          <blockquote className="text-xl md:text-2xl font-light italic leading-relaxed">
            "Ich bin der Techniker, der dafür sorgt, dass die IT läuft. Probleme erkennen, Hardware tauschen, Betriebsbereitschaft herstellen."
          </blockquote>
        </div>

      </div>
    </div>
  );
}