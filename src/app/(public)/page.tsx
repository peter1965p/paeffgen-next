"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLang } from "@/hooks/useLang";
import {
  Zap, MapPin, ShieldCheck, Code2, Database, ExternalLink,
  Activity, Brain, Layers, Server, Monitor, GitBranch,
} from "lucide-react";

// ── i18n ─────────────────────────────────────────────────────────────────────
const i18n = {
  de: {
    available:  "Verfügbar für Projekte // Remote aus der Vulkaneifel",
    h1sub:      "Fullstack Engineer · TypeScript · Vue · AWS · C# .NET",
    tagline:    "Ich baue Produkte. Nicht Prototypen.",
    taglineSub: "FULLSTACK // AI_ASSISTED // REMOTE_READY",
    intro:      "Von der Datenbankarchitektur bis zum fertigen UI — ich entwickle komplette Systeme. Mein aktuelles Projekt Plexora ist eine modulare Business-Plattform mit Vue 3, Nuxt 4 und AWS DynamoDB. Daneben C#/.NET, Linux-Tooling und KI als Präzisionswerkzeug.",
    metrics: [
      { val: "3", unit: "+ Projekte",  label: "PRODUKTIONSREIF" },
      { unit: "%", label: "UPTIME_INDEX" },
      { val: "AI", unit: "_FIRST",     label: "DEV_APPROACH" },
      { val: "100%", unit: "",         label: "REMOTE_READY" },
    ],
    ctaContact: "Projekt anfragen →",
    ctaGithub:  "GitHub_Access",
    terminal: [
      { prefix: "> ", text: "Initialisiere System...",                      color: "text-slate-500" },
      { prefix: "> ", text: "Stack: Vue 3 · Nuxt 4 · TypeScript · AWS · C# .NET", color: "text-blue-400" },
      { prefix: "> ", text: "AI_Engine: ONLINE  //  Claude · GPT · Gemini", color: "text-blue-400" },
      { prefix: "> ", text: "Plexora: DEPLOYED  //  CRM · Finance · HR · Support", color: "text-slate-300" },
      { prefix: "> ", text: "Peter Päffgen: VERFÜGBAR FÜR PROJEKTE",        color: "text-blue-300" },
    ],
    aboutLabel: "Über mich",
    aboutH2:    ["Systeme", "denken.", "Produkte bauen."],
    aboutText:  "Ich baue vollständige Systeme — von der Datenbankarchitektur über REST-APIs bis zum fertigen UI. Mein Fokus liegt auf sauberem, modularem Code und Cloud-nativen Architekturen. 40+ Jahre Enterprise-IT geben mir einen Blick auf Systeme den kein Bootcamp lehrt.",
    aboutCards: [
      { title: "Produkt-Denken",   desc: "Ich denke in Produkten, nicht in Tickets. Plexora, BlutzuckerApp, sysRunner — alles selbst konzipiert, architekturiert und deployed." },
      { title: "AI als Werkzeug",  desc: "KI nicht als Hype, sondern als Präzisionswerkzeug — um komplexe Systeme zu bauen, schneller zu iterieren und saubere Architekturen zu strukturieren." },
      { title: "Full-Stack-Tiefe", desc: "Vue/Nuxt, TypeScript, AWS DynamoDB, C#/.NET, Supabase, Linux-Tooling — ich kenne den ganzen Stack, nicht nur eine Schicht." },
      { title: "Enterprise-Kontext", desc: "4 Jahre SLA-getriebener Enterprise-Support bei DAX-Konzernen (E.ON, RWE). Arbeitszeugnis: 'Hervorragende Leistungen' — Projektende, kein eigenes Verschulden." },
    ],
    portfolioLabel: "Portfolio",
    portfolioH2:    ["Echte Projekte.", "Echter Code."],
    projects: [
      { title: "Plexora",       subtitle: "Modulare Business-Plattform", desc: "Vollständige SaaS-Plattform mit CRM, Finance, HR, Support und Analytics — selbst entwickelt, produktionsreif deployed. Multi-Modul-Architektur mit Realtime-Daten und Role-based Access Control.", link: "https://github.com/peter1965p/plexora", accent: "blue", tags: ["Vue 3","Nuxt 4","TypeScript","AWS DynamoDB","Supabase","CI/CD"] },
      { title: "BlutzuckerApp", subtitle: "Cross-Platform Diabetes Tracker", desc: "Offline-fähige Desktop-App (Windows, Linux, macOS) mit Cloud-Sync. Datenvisualisierung, PDF-Export, modulare Architektur — echter Nutzen, kein Demo-Projekt.", link: "https://github.com/peter1965p/BlutzuckerApp", accent: "violet", tags: ["C#",".NET 9","Avalonia UI","Supabase","OxyPlot","QuestPDF"] },
      { title: "sysRunner",     subtitle: "Norton-Commander-Style Automation & Linux-Tooling", desc: "sysRunner — ein moderner Dateimanager im Norton-Commander-Stil für die Kommandozeile. Dazu cachyos-dashboard-qt: Linux System Overview mit Monitoring und Logging.", link: "https://github.com/peter1965p/sysRunner", accent: "blue", tags: ["Python","Rust","Qt","Linux","Automation"] },
    ],
    githubBtn: "GitHub ansehen",
    requestBtn: "Anfragen →",
    servicesLabel: "Services",
    servicesH2: "Was ich anbiete",
    services: [
      { title: "Fullstack-Entwicklung", desc: "Komplette Webanwendungen von der Datenbankarchitektur bis zum fertigen UI. Vue/Nuxt, Next.js, TypeScript, Tailwind — aus einer Hand, produktionsreif.", tags: ["Vue 3","Nuxt 4","Next.js","TypeScript","Tailwind"], accent: "blue" },
      { title: "AI-Integration",        desc: "KI sinnvoll in Anwendungen einbauen — als Automatisierung, als Assistent, als intelligente Schnittstelle. Kein Hype, nur echter Mehrwert.", tags: ["Claude API","OpenAI","LLM-Orchestrierung","Automation"], accent: "violet" },
      { title: "System-Architektur",    desc: "Datenbank-Design, API-Struktur, Cloud-Setup. Ich denke das System als Ganzes — nicht nur die Oberfläche. Skalierbar, wartbar, durchdacht.", tags: ["AWS","Supabase","PostgreSQL","Node.js","REST-APIs"], accent: "blue" },
    ],
    stackLabel:  "Tech Stack",
    stackLegend: "Legende:",
    stackCategories: [
      { color: "bg-blue-500/20 text-blue-400 border-blue-500/20",       label: "Frontend" },
      { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20", label: "Backend" },
      { color: "bg-red-500/20 text-red-400 border-red-500/20",          label: "Database" },
      { color: "bg-orange-500/20 text-orange-400 border-orange-500/20", label: "Systems" },
      { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20", label: "Cloud" },
      { color: "bg-violet-500/20 text-violet-400 border-violet-500/20", label: "Microsoft Stack" },
    ],
    contactLabel:  "Erreichbarkeit",
    contactH2:     "Remote First.",
    contactText:   "Ich arbeite vollständig remote — vollständig ausgestattet, selbstständig und lieferstark. Vor-Ort in der DACH-Region auf Anfrage möglich.",
    contactStatus: "Status // Open",
    contactH3:     ["Lass uns", "reden."],
    contactDesc:   "Du hast ein Projekt das einen Entwickler braucht der wirklich liefert? Fullstack, Cloud, AI-Integration — schreib mir.",
    contactEmailBtn: "E-Mail schreiben",
    contactGithubBtn: "GitHub ansehen",
    contactAvail: "Bevorzugt Remote — Vor-Ort auf Anfrage",
    footerCopy:   `© ${new Date().getFullYear()} Päffgen IT // Peter Päffgen // Manderscheid, Vulkaneifel`,
    footerStatus: "System Online // paeffgen-it.de",
  },
  en: {
    available:  "Available for Projects // Remote from the Vulkaneifel",
    h1sub:      "Fullstack Engineer · TypeScript · Vue · AWS · C# .NET",
    tagline:    "I build products. Not prototypes.",
    taglineSub: "FULLSTACK // AI_ASSISTED // REMOTE_READY",
    intro:      "From database architecture to finished UI — I develop complete systems. My current project Plexora is a modular business platform built with Vue 3, Nuxt 4 and AWS DynamoDB. Additionally C#/.NET, Linux tooling and AI as a precision instrument.",
    metrics: [
      { val: "3", unit: "+ Projects",  label: "PRODUCTION_READY" },
      { unit: "%", label: "UPTIME_INDEX" },
      { val: "AI", unit: "_FIRST",     label: "DEV_APPROACH" },
      { val: "100%", unit: "",         label: "REMOTE_READY" },
    ],
    ctaContact: "Request project →",
    ctaGithub:  "GitHub_Access",
    terminal: [
      { prefix: "> ", text: "Initializing system...",                      color: "text-slate-500" },
      { prefix: "> ", text: "Stack: Vue 3 · Nuxt 4 · TypeScript · AWS · C# .NET", color: "text-blue-400" },
      { prefix: "> ", text: "AI_Engine: ONLINE  //  Claude · GPT · Gemini", color: "text-blue-400" },
      { prefix: "> ", text: "Plexora: DEPLOYED  //  CRM · Finance · HR · Support", color: "text-slate-300" },
      { prefix: "> ", text: "Peter Päffgen: AVAILABLE FOR PROJECTS",        color: "text-blue-300" },
    ],
    aboutLabel: "About me",
    aboutH2:    ["Think in", "systems.", "Build products."],
    aboutText:  "I build complete systems — from database architecture through REST APIs to finished UI. My focus is on clean, modular code and cloud-native architectures. 40+ years of enterprise IT give me a perspective on systems that no bootcamp teaches.",
    aboutCards: [
      { title: "Product Thinking",    desc: "I think in products, not tickets. Plexora, BlutzuckerApp, sysRunner — all conceived, architected and deployed by me." },
      { title: "AI as a Tool",        desc: "Not as hype, but as a precision instrument — to build complex systems, iterate faster and structure clean architectures." },
      { title: "Full-Stack Depth",    desc: "Vue/Nuxt, TypeScript, AWS DynamoDB, C#/.NET, Supabase, Linux tooling — I know the full stack, not just one layer." },
      { title: "Enterprise Context",  desc: "4 years SLA-driven enterprise support at DAX corporations (E.ON, RWE). Reference: 'Outstanding performance' — project end, no fault of my own." },
    ],
    portfolioLabel: "Portfolio",
    portfolioH2:    ["Real Projects.", "Real Code."],
    projects: [
      { title: "Plexora",       subtitle: "Modular Business Platform", desc: "Complete SaaS platform with CRM, Finance, HR, Support and Analytics — self-developed, production deployed. Multi-module architecture with real-time data and role-based access control.", link: "https://github.com/peter1965p/plexora", accent: "blue", tags: ["Vue 3","Nuxt 4","TypeScript","AWS DynamoDB","Supabase","CI/CD"] },
      { title: "BlutzuckerApp", subtitle: "Cross-Platform Diabetes Tracker", desc: "Offline-capable desktop app (Windows, Linux, macOS) with cloud sync. Data visualization, PDF export, modular architecture — real utility, not a demo project.", link: "https://github.com/peter1965p/BlutzuckerApp", accent: "violet", tags: ["C#",".NET 9","Avalonia UI","Supabase","OxyPlot","QuestPDF"] },
      { title: "sysRunner",     subtitle: "Norton Commander-Style Automation & Linux Tooling", desc: "sysRunner — a modern Norton Commander-style file manager for the command line. Plus cachyos-dashboard-qt: Linux system overview with monitoring and logging.", link: "https://github.com/peter1965p/sysRunner", accent: "blue", tags: ["Python","Rust","Qt","Linux","Automation"] },
    ],
    githubBtn: "View on GitHub",
    requestBtn: "Request →",
    servicesLabel: "Services",
    servicesH2: "What I offer",
    services: [
      { title: "Fullstack Development", desc: "Complete web applications from database architecture to finished UI. Vue/Nuxt, Next.js, TypeScript, Tailwind — all from one source, production-ready.", tags: ["Vue 3","Nuxt 4","Next.js","TypeScript","Tailwind"], accent: "blue" },
      { title: "AI Integration",        desc: "Integrating AI meaningfully into applications — as automation, as an assistant, as an intelligent interface. No hype, just real value.", tags: ["Claude API","OpenAI","LLM Orchestration","Automation"], accent: "violet" },
      { title: "System Architecture",   desc: "Database design, API structure, cloud setup. I think the system as a whole — not just the surface. Scalable, maintainable, well thought-out.", tags: ["AWS","Supabase","PostgreSQL","Node.js","REST APIs"], accent: "blue" },
    ],
    stackLabel:  "Tech Stack",
    stackLegend: "Legend:",
    stackCategories: [
      { color: "bg-blue-500/20 text-blue-400 border-blue-500/20",       label: "Frontend" },
      { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20", label: "Backend" },
      { color: "bg-red-500/20 text-red-400 border-red-500/20",          label: "Database" },
      { color: "bg-orange-500/20 text-orange-400 border-orange-500/20", label: "Systems" },
      { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20", label: "Cloud" },
      { color: "bg-violet-500/20 text-violet-400 border-violet-500/20", label: "Microsoft Stack" },
    ],
    contactLabel:  "Availability",
    contactH2:     "Remote First.",
    contactText:   "I work fully remote — fully equipped, self-directed and delivery-strong. On-site in the DACH region available on request.",
    contactStatus: "Status // Open",
    contactH3:     ["Let's", "talk."],
    contactDesc:   "You have a project that needs a developer who actually delivers? Fullstack, Cloud, AI integration — write to me.",
    contactEmailBtn: "Send email",
    contactGithubBtn: "View GitHub",
    contactAvail: "Preferred remote — on-site on request",
    footerCopy:   `© ${new Date().getFullYear()} Päffgen IT // Peter Päffgen // Manderscheid, Vulkaneifel`,
    footerStatus: "System Online // paeffgen-it.de",
  },
};

// ── Particle canvas ───────────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const pts: P[] = Array.from({ length: 70 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: Math.random() * 1.2 + 0.3, a: Math.random() * 0.45 + 0.08 }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(59,130,246,0.04)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 90) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(59,130,246,${0.07 * (1 - d / 90)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── Terminal ─────────────────────────────────────────────────────────────────
function Terminal({ lines }: { lines: typeof i18n.de.terminal }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    setVisible(0);
    const t = setTimeout(() => setVisible(1), 200);
    return () => clearTimeout(t);
  }, [lines]);
  useEffect(() => {
    if (visible >= lines.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 700);
    return () => clearTimeout(t);
  }, [visible, lines.length]);
  return (
    <div className="mt-10 bg-gradient-to-bl from-orange-600 via-violet-800 to-slate-900 border border-orange-600 rounded p-5 font-mono text-[11px] backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        {["#ff5f56", "#febc2e", "#27c840"].map((c) => (<div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />))}
        <span className="text-slate-300 text-[9px] tracking-widest ml-2 uppercase">KERNEL_OUTPUT</span>
      </div>
      <div className="space-y-1.5">
        {lines.slice(0, visible).map((l, i) => (
          <div key={i} className={l.color}><span className="text-slate-400">{l.prefix}</span>{l.text}</div>
        ))}
        {visible < lines.length && (
          <div className="text-slate-400">{">"} <span className="inline-block w-2 h-3 bg-blue-500 align-[-2px] animate-pulse" /></div>
        )}
      </div>
    </div>
  );
}

// ── Live uptime ───────────────────────────────────────────────────────────────
function LiveMetric() {
  const [val, setVal] = useState("99.9");
  useEffect(() => { const t = setInterval(() => setVal((99.7 + Math.random() * 0.3).toFixed(1)), 2800); return () => clearInterval(t); }, []);
  return <>{val}</>;
}

const STACK_ITEMS = [
  { label: "Vue 3", color: "blue" }, { label: "Nuxt 4", color: "blue" }, { label: "Next.js", color: "blue" },
  { label: "React", color: "blue" }, { label: "TypeScript", color: "blue" }, { label: "Tailwind CSS", color: "blue" },
  { label: "Node.js", color: "green" }, { label: "Python", color: "green" }, { label: "Hono", color: "green" },
  { label: "C#", color: "violet" }, { label: ".NET 9", color: "violet" }, { label: "ASP.NET", color: "violet" }, { label: "Avalonia UI", color: "violet" },
  { label: "Rust", color: "orange" }, { label: "Qt", color: "orange" }, { label: "Electron", color: "orange" }, { label: "Linux", color: "orange" },
  { label: "Supabase", color: "red" }, { label: "PostgreSQL", color: "red" }, { label: "AWS DynamoDB", color: "red" }, { label: "LibSQL", color: "red" }, { label: "MongoDB", color: "red" },
  { label: "AWS S3", color: "yellow" }, { label: "AWS IAM", color: "yellow" }, { label: "Vercel", color: "yellow" }, { label: "Cloudflare", color: "yellow" },
  { label: "GitHub CI/CD", color: "orange" }, { label: "Docker", color: "orange" },
];

const ICON_MAP = [<Monitor size={22} />, <Brain size={22} />, <Server size={22} />];
const ABOUT_ICONS = [<Brain size={18} />, <Zap size={18} />, <Layers size={18} />, <ShieldCheck size={18} />];

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang] = useLang();
  const t = i18n[lang];

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-mono selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <ParticleCanvas />
        <div className="relative z-10 w-full px-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 text-blue-500 text-[10px] uppercase tracking-[0.3em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            {t.available}
          </div>
          <div className="relative mb-12 group text-center pt-4">
            <h1 className="text-[5rem] md:text-[9rem] font-black tracking-[-0.08em] leading-none select-none">
              <span className="bg-gradient-to-b from-orange-200 via-orange-500 to-orange-950 bg-clip-text text-transparent drop-shadow-[0_0_70px_rgba(234,88,12,0.5)] uppercase">
                Päffgen IT
              </span>
            </h1>
            <p className="mt-6 text-slate-500 font-mono text-[11px] tracking-[1.5em] uppercase italic opacity-60">{t.h1sub}</p>
          </div>
          <p className="text-xl md:text-2xl text-zinc-300 font-light italic tracking-[0.15em] opacity-80 uppercase mb-8 leading-relaxed">
            {t.tagline}
            <span className="block mt-4 text-blue-500 font-black font-mono text-xs tracking-[0.6em] not-italic">{t.taglineSub}</span>
          </p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-10 not-italic">{t.intro}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm mb-10 overflow-hidden">
            {t.metrics.map((m, i) => (
              <div key={i} className="bg-[#05070a] px-5 py-4 hover:bg-blue-600/5 transition-colors">
                <div className="text-xl font-black text-white">
                  {i === 1 ? <LiveMetric /> : m.val}
                  <span className="text-blue-500 text-sm">{m.unit}</span>
                </div>
                <div className="text-[9px] text-slate-600 tracking-widest mt-1">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap">
            <a href="#kontakt" className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-sm transition-colors">{t.ctaContact}</a>
            <a href="https://github.com/peter1965p" target="_blank" rel="noopener noreferrer" className="border border-orange-600 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 text-[11px] uppercase tracking-widest px-6 py-3 rounded-sm transition-all flex items-center gap-2">
              {t.ctaGithub} <ExternalLink size={11} />
            </a>
          </div>
          <Terminal lines={t.terminal} />
        </div>
      </section>

      {/* EXPERIENCE BAND */}
      <section className="bg-slate-950 py-8 overflow-hidden border-y border-blue-700/20">
        <motion.div className="flex gap-16 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-16 shrink-0">
              {["PLEXORA","BLUTZUCKERAPP","HEMMERSBACH","DELL TECHNOLOGIES","RWE PROJECT","E.ON OPS"].map((s) => (
                <span key={s} className="font-black italic text-sm tracking-[0.2em] text-white opacity-20">
                  {s} <span className="text-blue-500 mx-2">/</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ÜBER MICH */}
      <section id="über-mich" className="w-full px-10 py-24 border-b border-white/5">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-2/5">
            <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">{t.aboutLabel}</p>
            <h2 className="text-4xl font-black italic uppercase leading-none mb-6">
              {t.aboutH2[0]}<br />
              <span className="text-blue-500">{t.aboutH2[1]}</span><br />
              {t.aboutH2[2]}
            </h2>
            <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-tighter">{t.aboutText}</p>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.aboutCards.map((c, i) => (
              <div key={i} className="bg-zinc-900/30 border border-white/5 p-6 rounded-sm hover:border-blue-500/20 transition-colors group">
                <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform inline-block">{ABOUT_ICONS[i]}</div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3">{c.title}</h3>
                <p className="text-slate-500 text-[10px] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJEKTE */}
      <section id="projekte" className="w-full px-10 py-24 border-b border-white/5">
        <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">{t.portfolioLabel}</p>
        <h2 className="text-4xl font-black italic uppercase mb-12">
          {t.portfolioH2[0]}<br /><span className="text-blue-500">{t.portfolioH2[1]}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {t.projects.map((p, i) => (
            <div key={i} className="p-10 hover:bg-white/[0.015] transition-all group flex flex-col">
              <div className={`mb-6 group-hover:scale-110 transition-transform inline-block ${p.accent === "violet" ? "text-violet-400" : "text-blue-500"}`}>{ICON_MAP[i]}</div>
              <h3 className="text-[13px] font-bold uppercase tracking-widest mb-1">{p.title}</h3>
              <p className={`text-[9px] uppercase tracking-widest mb-4 ${p.accent === "violet" ? "text-violet-500" : "text-blue-500"}`}>{p.subtitle}</p>
              <p className="text-slate-500 text-[10px] leading-relaxed mb-6 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag) => (
                  <span key={tag} className={`text-[9px] border px-2 py-1 rounded-sm ${p.accent === "violet" ? "text-violet-400 border-violet-500/20" : "text-blue-400 border-blue-500/20"}`}>{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-[10px] text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors w-fit">
                  <GitBranch size={11} /> {t.githubBtn} <ExternalLink size={10} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
                <Link href="/contact" className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors w-fit ${p.accent === "violet" ? "bg-violet-600/20 text-violet-400 hover:bg-violet-600/40" : "bg-blue-600/20 text-blue-400 hover:bg-blue-600/40"}`}>
                  {t.requestBtn}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="w-full px-10 py-24 border-b border-white/5">
        <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">{t.servicesLabel}</p>
        <h2 className="text-4xl font-black italic uppercase mb-12">{t.servicesH2}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {t.services.map((s, i) => (
            <div key={i} className="p-10 hover:bg-white/[0.015] transition-all group">
              <div className={`mb-6 group-hover:scale-110 transition-transform inline-block ${s.accent === "violet" ? "text-violet-400" : "text-blue-500"}`}>{[<Code2 size={22} />, <Brain size={22} />, <Database size={22} />][i]}</div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4">{s.title}</h3>
              <p className="text-slate-500 text-[10px] leading-relaxed mb-6">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (<span key={tag} className={`text-[9px] border px-2 py-1 rounded-sm ${s.accent === "violet" ? "text-violet-400 border-violet-500/20" : "text-blue-400 border-blue-500/20"}`}>{tag}</span>))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="w-full py-16 border-b border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-10 mb-8">
          <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase">{t.stackLabel}</p>
          <div className="hidden md:flex items-center gap-6">
            <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase">{t.stackLegend}</p>
            {t.stackCategories.map((l) => (<div key={l.label} className="flex items-center gap-2"><span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${l.color}`}>{l.label}</span></div>))}
          </div>
        </div>
        <motion.div className="flex gap-4 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-4 shrink-0 items-center">
              {STACK_ITEMS.map((item) => (
                <span key={item.label + r} className={`text-[10px] font-mono px-4 py-1.5 rounded-full whitespace-nowrap transition-all cursor-default
                  ${item.color === "blue"   ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20" : ""}
                  ${item.color === "green"  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20" : ""}
                  ${item.color === "orange" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20" : ""}
                  ${item.color === "violet" ? "bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20" : ""}
                  ${item.color === "red"    ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" : ""}
                  ${item.color === "yellow" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20" : ""}
                `}>{item.label}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="w-full px-10 py-24 flex flex-col md:flex-row gap-16 items-start">
        <div className="flex-1">
          <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">{t.contactLabel}</p>
          <h2 className="bg-gradient-to-b from-orange-200 via-orange-500 to-orange-950 bg-clip-text text-transparent drop-shadow-[0_0_70px_rgba(234,88,12,0.5)] uppercase text-4xl font-black italic mb-6">{t.contactH2}</h2>
          <p className="text-slate-500 text-[11px] leading-relaxed mb-6 uppercase tracking-tighter">{t.contactText}</p>
          <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400 mb-8">
            {["NRW","RLP","Hessen","BaWü","Saarland","Luxemburg","Remote_EU","Remote_DE"].map((r) => (
              <div key={r} className="flex items-center gap-3 border border-blue-600/40 p-4 rounded hover:border-blue-500/20 transition-colors">
                <MapPin size={11} className="text-blue-500" /> {r}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Activity size={11} className="text-blue-500 animate-pulse" />
            {t.contactAvail}
          </div>
        </div>
        <div className="flex-1 bg-blue-600/5 border border-blue-500/20 p-10 rounded relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1.5 bg-blue-600 text-white text-[9px] uppercase tracking-widest font-bold">
            {lang === "de" ? "Verfügbar" : "Available"}
          </div>
          <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">{t.contactStatus}</p>
          <h3 className="text-2xl font-black italic uppercase mb-4 leading-tight">{t.contactH3[0]}<br />{t.contactH3[1]}</h3>
          <p className="text-slate-400 text-[11px] leading-relaxed mb-8">{t.contactDesc}</p>
          <div className="space-y-3">
            <a href="mailto:peter@paeffgen-it.de" className="group flex items-center gap-3 text-[11px] text-white uppercase tracking-widest border-b border-blue-500/30 pb-3 hover:text-blue-400 hover:border-blue-400 transition-all w-fit">
              {t.contactEmailBtn} <ExternalLink size={11} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://github.com/peter1965p" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-[11px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-3 hover:text-blue-400 hover:border-blue-400 transition-all w-fit">
              {t.contactGithubBtn} <ExternalLink size={11} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/peter-paeffgen/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-[11px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-3 hover:text-blue-400 hover:border-blue-400 transition-all w-fit">
              LinkedIn <ExternalLink size={11} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" className="group flex items-center gap-3 text-[11px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-3 hover:text-blue-400 hover:border-blue-400 transition-all w-fit">
              {lang === "de" ? "Impressum" : "Legal Notice"}
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-10 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em]">{t.footerCopy}</p>
        <div className="flex items-center gap-2 text-[9px] text-slate-700 uppercase tracking-widest">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
          </span>
          {t.footerStatus}
        </div>
      </footer>
    </div>
  );
}
