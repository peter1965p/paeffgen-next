import { Wrench, Zap, Monitor, Activity, MapPin, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      {/* Hero: Der Onsite-Fokus */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Onsite_Engineer // Status: Active
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              PETER PAEFFGEN <br /> <span className="text-blue-600">FIELD OPS.</span>
            </h1>
          </div>
          <div className="max-w-md text-right">
            <p className="text-slate-500 font-mono text-xs uppercase leading-relaxed tracking-tighter">
              Spezialisiert auf Hardware-Rollout, Fehleranalyse & Vor-Ort-Instandsetzung. 
              Über 33 Jahre Erfahrung in der Entstörung kritischer Infrastrukturen.
            </p>
          </div>
        </div>
      </section>

      {/* Core Competencies Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-white/5">
        {[
          { icon: <Wrench />, title: "Hardware Replacement", desc: "Präziser Austausch von Notebooks, Workstations & Peripherie direkt beim Kunden." },
          { icon: <Activity />, title: "Troubleshooting", desc: "Tiefgehende Fehleranalyse und System-Wiederherstellung unter Zeitdruck." },
          { icon: <ShieldCheck />, title: "Enterprise Support", desc: "Zertifizierter Service für Projekte wie RWE, E.on & Dell Technologies." }
        ].map((item, i) => (
          <div key={i} className="p-12 border-b border-white/5 hover:bg-white/[0.02] transition-all group">
            <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-widest mb-4">{item.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Experience / Projects Bar */}
      <section className="bg-slate-950 py-8 overflow-hidden border-y border-blue-700">
        <div className="flex justify-around items-center opacity-30 grayscale contrast-150 font-black italic text-xl tracking-widest overflow-hidden whitespace-nowrap">
          <span>HEMMERSBACH</span>
          <span>DELL TECHNOLOGIES</span>
          <span>RWE PROJECT</span>
          <span>E.ON OPS</span>
          <span>FIELD SERVICE</span>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-black italic uppercase mb-6">Einsatzgebiet <span className="text-blue-600">Süd-West</span></h2>
          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-400">
            {["NRW", "RLP", "Saarland", "Hessen", "BaWü"].map(region => (
              <div key={region} className="flex items-center gap-2 border border-white/5 p-3 rounded-lg">
                <MapPin size={12} className="text-blue-500" /> {region} // AVAILABLE
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-zinc-900/50 border border-white/5 p-8 rounded-[0.5rem]">
          <h3 className="text-xs font-mono font-bold uppercase mb-4 text-blue-500">Aktuelles Projekt // Stand 2026</h3>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "Aktuell im Fieldservice tätig für RWE & E.on. Fokus auf Hardware-Lifecycle-Management und Onsite-Entstörung bis Projektabschluss 04/2026."
          </p>
        </div>
      </section>
    </div>
  );
}