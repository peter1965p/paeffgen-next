import { Wrench, Zap, Monitor, Activity, MapPin, ShieldCheck, Code2, Database, Layout } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans">
      {/* Hero: AETHER OS & Field Ops */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6 text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              System: AETHER OS // Status: Open for Projects 05/2026
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-4">
              PAEFFGEN IT <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">
                AETHER OS.
              </span>
            </h1>
            <p className="text-xl font-mono italic text-slate-400 tracking-tight">
              Next-Gen Infrastructure Management & Field Operations.
            </p>
          </div>
          <div className="max-w-md lg:text-right border-l lg:border-l-0 lg:border-r border-blue-600/30 pl-6 lg:pr-6 py-2">
            <p className="text-slate-500 font-mono text-xs uppercase leading-relaxed tracking-tighter">
              Verbindung von 33 Jahren Onsite-Expertise mit moderner Fullstack-Entwicklung. 
              Spezialisiert auf hochperformante Dashboards und kritische Hardware-Infrastrukturen.
            </p>
          </div>
        </div>
      </section>

      {/* AETHER OS Showcase Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-x border-white/5 bg-gradient-to-b from-blue-600/[0.03] to-transparent">
        <div className="order-2 lg:order-1">
          <h2 className="text-sm font-mono font-bold uppercase text-blue-500 mb-4 tracking-[0.2em]">Product // AETHER OS</h2>
          <h3 className="text-3xl font-black italic uppercase mb-6 leading-tight">Das Betriebssystem für <br/>dein Unternehmen.</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-lg">
            AETHER OS ist ein modulares Dashboard-System, das auf Next.js und Supabase basiert. 
            Es trennt strikt zwischen Admin-Logik und individuellen User-Contexts – perfekt für 
            skalierbare Lösungen im Automotive-Sektor oder Enterprise-Umfeld.
          </p>
          <div className="grid grid-cols-2 gap-6">
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <Code2 className="text-blue-500" size={16}/> NEXT.JS // TAILWIND
             </div>
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <Database className="text-blue-500" size={16}/> SUPABASE // RLS
             </div>
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <Layout className="text-blue-500" size={16}/> MODULAR UI
             </div>
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <ShieldCheck className="text-blue-500" size={16}/> ROLE BASED AUTH
             </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative aspect-video bg-zinc-900 border border-white/10 rounded-lg overflow-hidden group shadow-2xl shadow-blue-900/20">
            {/* Hier käme dein Screenshot rein */}
            <div className="absolute inset-0 bg-[url('/dashboard-preview.png')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-blue-400 bg-black/50 px-2 py-1 rounded">
                LIVE DEMO PREVIEW // V.3.1
            </div>
        </div>
      </section>

      {/* Field Ops Competencies */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-white/5">
        {[
          { icon: <Wrench />, title: "Field Operations", desc: "Präziser Hardware-Rollout und Vor-Ort-Instandsetzung für Enterprise-Flotten." },
          { icon: <Activity />, title: "Fullstack Dev", desc: "Entwicklung moderner Web-Applikationen mit Fokus auf Performance und Realtime-Daten." },
          { icon: <ShieldCheck />, title: "System Engineering", desc: "Über 33 Jahre Erfahrung in der Entstörung und Verwaltung kritischer IT-Infrastrukturen." }
        ].map((item, i) => (
          <div key={i} className="p-12 border-b border-white/5 hover:bg-white/[0.02] transition-all group">
            <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-widest mb-4">{item.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Moving Experience Bar */}
      <section className="bg-slate-950 py-8 overflow-hidden border-y border-blue-700">
        <div className="flex justify-around items-center opacity-30 grayscale contrast-150 font-black italic text-xl tracking-widest">
          <span>HEMMERSBACH</span>
          <span>DELL TECHNOLOGIES</span>
          <span>RWE PROJECT</span>
          <span>E.ON OPS</span>
          <span>NEXT.JS // SUPABASE</span>
        </div>
      </section>

      {/* Availability & Area */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-black italic uppercase mb-6">Service <span className="text-blue-600">Region</span></h2>
          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-400">
            {["NRW", "RLP", "Saarland", "Hessen", "Luxemburg"].map(region => (
              <div key={region} className="flex items-center gap-2 border border-white/5 p-3 rounded-lg">
                <MapPin size={12} className="text-blue-500" /> {region} // ACTIVE
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-blue-600/5 border border-blue-500/20 p-8 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 font-mono text-[8px] bg-blue-600 text-white uppercase italic">Available May 2026</div>
          <h3 className="text-xs font-mono font-bold uppercase mb-4 text-blue-500 tracking-tighter">Aktueller Fokus // Recruiting</h3>
          <p className="text-sm text-slate-300 leading-relaxed italic mb-4">
            "Nach erfolgreichem Abschluss der Projekte für RWE/E.on im April 2026 stehe ich für neue Herausforderungen zur Verfügung."
          </p>
          <a href="mailto:peter@paeffgen-it.de" className="inline-block font-mono text-[10px] text-white border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors">
            KONTAKT AUFNEHMEN - peter@paeffgen-it.de
          </a>
        </div>
      </section>
    </div>
  );
}