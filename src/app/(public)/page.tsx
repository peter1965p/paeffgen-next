import { 
  Wrench, 
  Zap, 
  Activity, 
  MapPin, 
  ShieldCheck, 
  Code2, 
  Database, 
  Layout, 
  ExternalLink,
  Server,
  Lock
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-blue-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6 text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              SYSTEM: AETHER OS // STATUS: OPERATIV // READY FOR PROJECTS 05/2026
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
            <p className="text-slate-500 font-mono text-[10px] uppercase leading-relaxed tracking-tighter">
              Spezialisiert auf hochperformante Dashboards und kritische Hardware-Infrastrukturen. 
              Verbindung von über 25 Jahren Onsite-Expertise mit moderner Fullstack-Entwicklung.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT SHOWCASE: AETHER OS */}
      <section id="aether-os" className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-x border-white/5 bg-gradient-to-b from-blue-600/[0.03] to-transparent">
        <div className="order-2 lg:order-1">
          <h2 className="text-sm font-mono font-bold uppercase text-blue-500 mb-4 tracking-[0.2em]">PRODUCT // AETHER OS</h2>
          <h3 className="text-4xl font-black italic uppercase mb-6 leading-tight">
            DAS BETRIEBSSYSTEM <br/>FÜR DEIN UNTERNEHMEN.
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-lg">
            AETHER OS ist ein modulares Dashboard-System auf Basis von **Next.js** und **Supabase**.
            Es ermöglicht die strikte Trennung von Admin-Schnittstellen und individuellen User-Contexts. 
            Ideal für skalierbare Lösungen im Automotive-Sektor oder komplexe Enterprise-Infrastrukturen.
          </p>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <Code2 className="text-blue-500" size={16}/> NEXT.JS // TAILWIND CSS
             </div>
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <Database className="text-blue-500" size={16}/> SUPABASE // POSTGRES
             </div>
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <Layout className="text-blue-500" size={16}/> MODULAR DASHBOARD
             </div>
             <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
               <ShieldCheck className="text-blue-500" size={16}/> RBAC AUTH SYSTEM
             </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative aspect-video bg-zinc-900 border border-white/10 rounded-sm overflow-hidden group shadow-2xl shadow-blue-900/20">
            <div 
              className="absolute inset-0 bg-[url('/aether-os-dashboard.png')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[9px] text-blue-400 bg-black/80 px-3 py-2 border border-blue-500/30 backdrop-blur-md">
                <Activity size={12} className="animate-pulse" />
                ADMIN_INTERFACE_V3.1 // LIVE_PREVIEW
            </div>
        </div>
      </section>

      {/* 3. TECH ARCHITECTURE (Die neue "Beweis"-Sektion) */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-x border-white/5 bg-[#05070a]">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl font-black italic uppercase mb-6 leading-none">
              THE <span className="text-blue-600">ENGINE</span> <br/> BEHIND AETHER.
            </h2>
            <p className="text-slate-400 font-mono text-[10px] leading-relaxed uppercase">
              Vollständig modularer Aufbau basierend auf dem Next.js App-Router. 
              Sicherheit durch serverseitige Validierung und Supabase-Integration.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {[
              { 
                label: "Logic Layer", 
                title: "Server Actions", 
                desc: "Direkte DB-Interaktion via lib/actions für maximale Performance ohne REST-Overhead." 
              },
              { 
                label: "Security", 
                title: "Middleware & Auth", 
                desc: "Zentralisierte Route-Protection und Role-Based Access Control (RBAC) über Next-Middleware." 
              },
              { 
                label: "UI System", 
                title: "Custom Components", 
                desc: "Wiederverwendbare Komponenten wie FormRenderer und Card für schnelle Skalierung." 
              },
              { 
                label: "Backend", 
                title: "Supabase Cloud", 
                desc: "PostgreSQL mit Realtime-Features für Live-Updates im Dashboard-Status." 
              }
            ].map((tech, i) => (
              <div key={i} className="bg-[#05070a] p-8 hover:bg-blue-600/[0.02] transition-colors">
                <span className="text-[9px] font-mono text-blue-500 tracking-[0.2em] uppercase">{tech.label}</span>
                <h4 className="text-sm font-bold mt-2 mb-3 uppercase tracking-widest">{tech.title}</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed italic">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE COMPETENCIES */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-white/5 bg-[#05070a]">
        {[
          { 
            icon: <Wrench size={24} />, 
            title: "Field Operations", 
            desc: "Präziser Hardware-Rollout, Lifecycle-Management und Vor-Ort-Instandsetzung für Enterprise-Flotten." 
          },
          { 
            icon: <Zap size={24} />, 
            title: "Fullstack Development", 
            desc: "Architektur moderner Web-Applikationen mit Next.js. Fokus auf Performance, Security und Realtime-Daten." 
          },
          { 
            icon: <ShieldCheck size={24} />, 
            title: "System Engineering", 
            desc: "Jahrzehntelange Erfahrung in der Entstörung kritischer Infrastrukturen (z.B. RWE, E.ON, Dell Technologies)."
          }
        ].map((item, i) => (
          <div key={i} className="p-12 border-b border-white/5 hover:bg-white/[0.02] transition-all group">
            <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-widest mb-4">{item.title}</h3>
            <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-tighter">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 5. EXPERIENCE BAR */}
      <section className="bg-slate-950 py-10 overflow-hidden border-y border-blue-700/50">
        <div className="flex justify-around items-center opacity-20 grayscale contrast-125 font-black italic text-xl tracking-[0.2em] whitespace-nowrap">
          <span>HEMMERSBACH</span>
          <span className="text-blue-500">/</span>
          <span>DELL TECHNOLOGIES</span>
          <span className="text-blue-500">/</span>
          <span>RWE PROJECT</span>
          <span className="text-blue-500">/</span>
          <span>E.ON OPS</span>
          <span className="text-blue-500">/</span>
          <span>FIELD SERVICE</span>
        </div>
      </section>

      {/* 6. REGION & CONTACT */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-black italic uppercase mb-8">
            SERVICE <span className="text-blue-600">REGIONS</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-slate-400">
            {["NRW", "RLP", "SAARLAND", "HESSEN", "LUXEMBURG"].map(region => (
              <div key={region} className="flex items-center gap-3 border border-white/5 p-4 rounded-sm bg-zinc-900/20 hover:border-blue-500/30 transition-colors">
                <MapPin size={12} className="text-blue-500" /> {region} // ACTIVE_ZONE
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 bg-blue-600/5 border border-blue-500/20 p-10 rounded-sm relative overflow-hidden bg-[#05070a]">
          <div className="absolute top-0 right-0 p-2 font-mono text-[8px] bg-blue-600 text-white uppercase italic tracking-widest">
            Available May 2026
          </div>
          <h3 className="text-xs font-mono font-bold uppercase mb-6 text-blue-500 tracking-widest">
            CURRENT_STATUS // RECRUITING_OPEN
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed italic mb-8">
            "Nach erfolgreichem Abschluss der Onsite-Projekte für RWE & E.ON stehe ich ab Mai 2026 für neue Herausforderungen zur Verfügung."
          </p>
          <a 
            href="/contact" 
            className="group flex items-center gap-3 font-mono text-[11px] text-white uppercase tracking-widest border-b border-blue-500 w-fit pb-2 hover:text-blue-400 transition-all"
          >
            PROJEKT_ANFRAGE_SENDEN <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
          © 2026 PAEFFGEN IT // ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}