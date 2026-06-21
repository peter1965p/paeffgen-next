import {
  Brain,
  Code2,
  GitBranch,
  Monitor,
  Layers,
  ExternalLink,
  Server,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const PROJECTS = [
  {
    icon: <Monitor size={20} />,
    title: "Plexora",
    subtitle: "Modulare Business-Plattform",
    desc: "Vollständige SaaS-Plattform mit CRM, Finance, HR, Support und Analytics — selbst konzipiert, architekturiert und deployed. Multi-Modul-Architektur mit Realtime-Daten und Role-based Access Control.",
    tags: ["Vue 3", "Nuxt 4", "TypeScript", "AWS DynamoDB", "Supabase", "CI/CD"],
    link: "https://github.com/peter1965p/plexora",
  },
  {
    icon: <Code2 size={20} />,
    title: "Nexora",
    subtitle: "Firmenwebseite & Corporate Identity",
    desc: "Moderne Unternehmenswebseite mit klarem Design, performantem Stack und vollständiger CI — entwickelt als eigenständiges Produkt mit Fokus auf Conversion und Markenpräsenz.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    link: "https://github.com/peter1965p/nexora_libsql",
  },
  {
    icon: <Brain size={20} />,
    title: "BlutzuckerApp",
    subtitle: "Cross-Platform Diabetes Tracker",
    desc: "Offline-fähige Desktop-App (Windows, Linux, macOS) mit Cloud-Sync, Datenvisualisierung und PDF-Export. Modulare Architektur — echter Nutzen, kein Demo-Projekt.",
    tags: ["C#", ".NET 9", "Avalonia UI", "Supabase", "OxyPlot", "QuestPDF"],
    link: "https://github.com/peter1965p/BlutzuckerApp",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-24 pb-12 font-mono">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 border-l-4 border-blue-600 pl-8 py-4">
          <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">
            Über mich
          </p>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            VIBE <span className="text-blue-600">CODER.</span>
          </h1>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-[0.3em]">
            Peter Päffgen // Fullstack · AI-First · Remote aus der Vulkaneifel
          </p>
        </div>

        {/* Profil */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold italic uppercase text-blue-500">
              Profil_Analyse
            </h2>
            <p className="text-slate-400 leading-relaxed font-light text-sm">
              Ich baue Produkte — keine Prototypen. Mein Ansatz ist AI-First:
              Claude, GPT und Gemini sind meine Präzisionswerkzeuge, um komplexe
              Systeme schnell zu konzipieren, zu iterieren und produktionsreif zu
              deployen.
            </p>
            <p className="text-slate-400 leading-relaxed font-light text-sm">
              Vibe Coding ist für mich kein Buzzword, sondern eine Arbeitsweise —
              Idee rein, fertiges Produkt raus. Vom Datenbankschema über REST-APIs
              bis zum fertigen UI denke ich das System als Ganzes.
            </p>
          </div>
          <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="text-[10px] font-mono font-bold uppercase text-blue-500 mb-3 tracking-widest">
                Status
              </h3>
              <p className="text-lg font-black italic tracking-tighter">
                Verfügbar
              </p>
              <p className="text-[9px] font-mono text-slate-500 uppercase mt-1">
                Remote · DACH · EU
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono font-bold uppercase text-blue-500 mb-3 tracking-widest">
                GitHub
              </h3>
              <a
                href="https://github.com/peter1965p"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] text-slate-300 hover:text-blue-400 uppercase tracking-widest transition-colors"
              >
                <GitBranch size={11} />
                peter1965p
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* Kompetenz-Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 mb-20">
          {[
            {
              icon: <Brain size={18} />,
              title: "AI-First Development",
              text: "KI nicht als Hype — als Werkzeug. Claude, GPT und Gemini zur Systemarchitektur, Code-Generierung und schnellen Iteration.",
            },
            {
              icon: <Code2 size={18} />,
              title: "Fullstack aus einer Hand",
              text: "Vue 3, Nuxt 4, Next.js, TypeScript, Tailwind im Frontend — Node.js, C#/.NET, Supabase, AWS im Backend.",
            },
            {
              icon: <Layers size={18} />,
              title: "Produkt-Denken",
              text: "Ich denke in Produkten, nicht in Tickets. Plexora, Nexora, BlutzuckerApp — alles selbst konzipiert und shipped.",
            },
            {
              icon: <Server size={18} />,
              title: "Cloud & Deployment",
              text: "AWS DynamoDB, S3, IAM, Supabase, Vercel, Cloudflare — produktionsreife Infrastruktur von Anfang an.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#05070a] p-8 group hover:bg-zinc-900/50 transition-all"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-xs font-mono font-bold uppercase mb-2 tracking-widest">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Projekte */}
        <div className="mb-20">
          <h2 className="text-xl font-bold italic uppercase text-blue-500 mb-10">
            Projekte_Live
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="p-8 hover:bg-white/[0.015] transition-all group flex flex-col"
              >
                <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform inline-block">
                  {p.icon}
                </div>
                <h3 className="text-[13px] font-bold uppercase tracking-widest mb-1">
                  {p.title}
                </h3>
                <p className="text-[9px] uppercase tracking-widest mb-4 text-blue-500">
                  {p.subtitle}
                </p>
                <p className="text-slate-500 text-[10px] leading-relaxed mb-6 flex-1">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] border px-2 py-1 rounded-sm text-blue-400 border-blue-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-2 text-[10px] text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors w-fit"
                >
                  <GitBranch size={11} />
                  GitHub ansehen
                  <ExternalLink
                    size={10}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Modus Operandi */}
        <div className="space-y-12 mb-20">
          <h2 className="text-xl font-bold italic uppercase text-blue-500 text-center">
            Modus_Operandi
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                n: 1,
                title: "Idee → Produkt",
                text: "Vom Konzept bis zum Deployment in einem Zug — kein endloser Planungs-Overhead.",
              },
              {
                n: 2,
                title: "AI als Co-Pilot",
                text: "Nicht Copy-Paste, sondern gezielter Einsatz von KI zur Systemarchitektur und Iteration.",
              },
              {
                n: 3,
                title: "Ship fast. Fix fast.",
                text: "Früh deployen, echtes Feedback holen, schnell verbessern — keine Demo-Projekte.",
              },
            ].map((item) => (
              <div key={item.n} className="space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white">
                  {item.n}
                </div>
                <h5 className="text-[10px] font-mono uppercase font-bold">
                  {item.title}
                </h5>
                <p className="text-[11px] text-slate-500 italic">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-12 p-10 border border-blue-600/20 rounded-[3rem] bg-blue-600/5 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-500 mb-4">
            Berufliches Selbstverständnis
          </p>
          <blockquote className="text-xl md:text-2xl font-light italic leading-relaxed">
            Ich baue Dinge die funktionieren. Mit KI als Werkzeug, mit echtem
            Code, für echte Nutzer.
          </blockquote>
          <div className="mt-8">
            <a
              href="https://github.com/peter1965p"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-blue-600/40 hover:border-blue-500 text-slate-400 hover:text-blue-400 text-[10px] uppercase tracking-widest px-6 py-3 rounded-sm transition-all"
            >
              <GitBranch size={12} />
              GitHub: peter1965p
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
