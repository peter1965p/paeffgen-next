"use client";

import { useEffect, useRef, useState } from "react";
import {
  Wrench,
  Zap,
  MapPin,
  ShieldCheck,
  Code2,
  Database,
  ExternalLink,
  Activity,
  Brain,
  Layers,
} from "lucide-react";

// ── Animated particle canvas background ──────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
    };
    const pts: P[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.45 + 0.08,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // subtle grid
      ctx.strokeStyle = "rgba(59,130,246,0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.a})`;
        ctx.fill();
      });

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.07 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── Pulse rings ───────────────────────────────────────────────────────────────
function PulseRings() {
  return (
    <div className="absolute right-12 top-28 w-72 h-72 pointer-events-none hidden lg:block">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-blue-500/10"
          style={{
            inset: `${-i * 32}px`,
            animation: `expandRing 3s ease-out ${i}s infinite`,
          }}
        />
      ))}
      <div className="absolute inset-16 rounded-full border border-blue-500/30 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full border border-blue-500/60 bg-blue-500/5 flex items-center justify-center"
          style={{ animation: "pulseScale 2s ease-in-out infinite" }}
        >
          <div
            className="w-4 h-4 rounded-full bg-blue-500"
            style={{ animation: "blink 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
      <style>{`
        @keyframes expandRing { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(1.6);opacity:0} }
        @keyframes pulseScale { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes blink { 0%,100%{opacity:1;box-shadow:0 0 8px #3b82f6} 50%{opacity:.3;box-shadow:none} }
      `}</style>
    </div>
  );
}

// ── Typing terminal ───────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { prefix: "> ", text: "Initialisiere System...", color: "text-slate-500" },
  {
    prefix: "> ",
    text: "40+ Jahre IT-Erfahrung: GELADEN",
    color: "text-blue-400",
  },
  {
    prefix: "> ",
    text: "AI_Engine: ONLINE  //  Claude · GPT · Gemini",
    color: "text-blue-400",
  },
  {
    prefix: "> ",
    text: "Stack: Next.js · TypeScript · Tailwind · Supabase · Rust",
    color: "text-slate-300",
  },
  {
    prefix: "> ",
    text: "Peter Päffgen: VERFÜGBAR FÜR PROJEKTE",
    color: "text-blue-300",
  },
];

function Terminal() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 700);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="mt-10 bg-black/60 border border-white/8 rounded-sm p-5 font-mono text-[11px] backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        {["#ff5f56", "#febc2e", "#27c840"].map((c) => (
          <div
            key={c}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: c }}
          />
        ))}
        <span className="text-slate-600 text-[9px] tracking-widest ml-2 uppercase">
          KERNEL_OUTPUT
        </span>
      </div>
      <div className="space-y-1.5">
        {TERMINAL_LINES.slice(0, visible).map((l, i) => (
          <div key={i} className={l.color}>
            <span className="text-slate-600">{l.prefix}</span>
            {l.text}
          </div>
        ))}
        {visible < TERMINAL_LINES.length && (
          <div className="text-slate-600">
            {">"}{" "}
            <span className="inline-block w-2 h-3 bg-blue-500 align-[-2px] animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Live uptime flicker ───────────────────────────────────────────────────────
function LiveMetric() {
  const [val, setVal] = useState("99.9");
  useEffect(() => {
    const t = setInterval(
      () => setVal((99.7 + Math.random() * 0.3).toFixed(1)),
      2800,
    );
    return () => clearInterval(t);
  }, []);
  return <>{val}</>;
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white font-mono selection:bg-blue-500/30 overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#05070a]/90 backdrop-blur-md">
        <div className="text-[11px] tracking-[0.25em] text-blue-400 uppercase">
          Päffgen<span className="text-white">_</span>IT
        </div>
        <div className="hidden md:flex gap-8">
          {["Über mich", "Services", "Referenzen", "Kontakt"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(" ", "-")}`}
              className="text-[10px] text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px] text-slate-600 uppercase tracking-widest">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
          </span>
          System Online
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center w-full px-10 py-24 border-b border-white/5 overflow-hidden">
        <ParticleCanvas />
        <PulseRings />

        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-8 text-blue-500 text-[10px] uppercase tracking-[0.3em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Verfügbar für Projekte // Remote aus der Vulkaneifel
          </div>

          {/* ── ULTRA-TECH LOGO HERO ── */}
          <div className="relative text-center w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] min-h-screen flex items-center justify-center overflow-hidden">
            <h1 className="text-[6rem] md:text-[12rem] font-black tracking-[-0.08em] leading-none select-none flex flex-wrap items-center">
              {/* PÄFFGEN: Chrome-Effekt */}
              <span className="relative bg-gradient-to-b from-blue-200 via-blue-500 to-blue-950 bg-clip-text text-transparent drop-shadow-[0_0_70px_rgba(59,130,246,0.5)] uppercase transition-all duration-1000 group-hover:tracking-normal">
                Päffgen
              </span>
              {/* IT: Akzent */}
              <span className="relative ml-6 italic bg-gradient-to-br from-white via-slate-400 to-slate-800 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                IT
              </span>
            </h1>
            <div className="mt-6">
              <p className="text-blue-400/40 font-mono text-[11px] tracking-[1.8em] uppercase italic opacity-60">
                Senior_IT_Systemdenker_&_AI_Dev
              </p>
            </div>
          </div>

          <p className="max-w-3xl text-xl md:text-2xl text-zinc-300 font-light italic tracking-[0.15em] opacity-80 uppercase mb-16 leading-relaxed">
            40+ Jahre Erfahrung. Neue Werkzeuge.
            <span className="block mt-4 text-blue-500 font-black font-mono text-xs tracking-[0.6em] not-italic">
              AI_FIRST // SYSTEMS_THINKING // REMOTE_READY
            </span>
          </p>

          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mb-10 not-italic">
            40+ Jahre Hardware &amp; Fieldservice-Expertise — von RWE über E.ON
            bis Dell Technologies. Jetzt baue ich komplexe Webanwendungen mit KI
            als Co-Pilot. Ich denke Systeme. Ich sehe Zusammenhänge. Ich
            liefere.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm mb-10 overflow-hidden">
            {[
              { val: "40+", unit: "Jahre", label: "IT_ERFAHRUNG" },
              { val: <LiveMetric />, unit: "%", label: "UPTIME_INDEX" },
              { val: "AI", unit: "_FIRST", label: "DEV_APPROACH" },
              { val: "100%", unit: "", label: "REMOTE_READY" },
            ].map((m, i) => (
              <div
                key={i}
                className="bg-[#05070a] px-5 py-4 hover:bg-blue-600/5 transition-colors"
              >
                <div className="text-xl font-black text-white">
                  {m.val}
                  <span className="text-blue-500 text-sm">{m.unit}</span>
                </div>
                <div className="text-[9px] text-slate-600 tracking-widest mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#kontakt"
              className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-sm transition-colors"
            >
              Projekt anfragen →
            </a>
            <a
              href="https://github.com/peter1965p"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 text-[11px] uppercase tracking-widest px-6 py-3 rounded-sm transition-all flex items-center gap-2"
            >
              GitHub_Access <ExternalLink size={11} />
            </a>
          </div>

          <Terminal />
        </div>
      </section>

      {/* ── EXPERIENCE BAND ── */}
      <section className="bg-slate-950 py-8 overflow-hidden border-y border-blue-700/20">
        <div className="flex justify-around items-center opacity-20 grayscale font-black italic text-sm tracking-[0.2em] whitespace-nowrap">
          {[
            "HEMMERSBACH",
            "DELL TECHNOLOGIES",
            "RWE PROJECT",
            "E.ON OPS",
            "FIELD_SERVICE_EU",
          ].map((s, i) => (
            <span key={i}>
              {s}
              {i < 4 && <span className="text-blue-500 mx-6">/</span>}
            </span>
          ))}
        </div>
      </section>

      {/* ── ÜBER MICH ── */}
      <section
        id="über-mich"
        className="w-full px-10 py-24 border-b border-white/5"
      >
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-2/5">
            <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">
              Über mich
            </p>
            <h2 className="text-4xl font-black italic uppercase leading-none mb-6">
              Jahrzehnte
              <br />
              <span className="text-blue-500">Praxis.</span>
              <br />
              Neue Werkzeuge.
            </h2>
            <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-tighter">
              Ich komme nicht aus der Theorie — ich komme aus dem Maschinenraum.
              Hardware-Rollouts, kritische Infrastrukturen, Entstörung unter
              Zeitdruck. Das gibt mir einen Blick auf Systeme den kein Bootcamp
              lehrt.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <Brain size={18} />,
                title: "Systemdenken",
                desc: "40+ Jahre Hardware und Fieldservice haben mir beigebracht, komplexe Systeme als Ganzes zu sehen — nicht nur einzelne Komponenten.",
              },
              {
                icon: <Zap size={18} />,
                title: "AI als Hebel",
                desc: "Ich nutze KI nicht als Hype-Tool, sondern als Präzisionswerkzeug — um komplexe Webanwendungen zu bauen, die sonst ein ganzes Team bräuchten.",
              },
              {
                icon: <Layers size={18} />,
                title: "Design-Instinkt",
                desc: "Fotografisches Gedächtnis und jahrelanges Interesse an UI/UX: Ich weiß wie etwas aussehen soll — und warum.",
              },
              {
                icon: <ShieldCheck size={18} />,
                title: "Hands-on & direkt",
                desc: "Kein Buzzword-Bingo. Kein Overhead. Ich liefere — pünktlich, durchdacht, und mit echtem Verständnis für dein Business.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-zinc-900/30 border border-white/5 p-6 rounded-sm hover:border-blue-500/20 transition-colors group"
              >
                <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform inline-block">
                  {c.icon}
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-3">
                  {c.title}
                </h3>
                <p className="text-slate-500 text-[10px] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="w-full px-10 py-24 border-b border-white/5"
      >
        <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">
          Services
        </p>
        <h2 className="text-4xl font-black italic uppercase mb-12">
          Was ich anbiete
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {[
            {
              icon: <Code2 size={22} />,
              title: "Web-Entwicklung",
              desc: "Komplexe Webanwendungen mit Next.js, TypeScript und Tailwind. Von der Architektur bis zum Launch — aus einer Hand.",
              tags: ["Next.js", "React", "TypeScript", "Tailwind"],
            },
            {
              icon: <Brain size={22} />,
              title: "AI-Integration",
              desc: "Ich integriere KI-Modelle sinnvoll in bestehende Prozesse und Anwendungen — kein Hype, nur echter Mehrwert.",
              tags: ["Claude API", "GPT", "Automation", "Workflows"],
            },
            {
              icon: <Database size={22} />,
              title: "System-Architektur",
              desc: "Datenbank-Design, API-Struktur, Cloud-Setup. Ich denke das System als Ganzes — nicht nur die Oberfläche.",
              tags: ["Supabase", "PostgreSQL", "AWS", "Node.js"],
            },
          ].map((s, i) => (
            <div
              key={i}
              className="p-10 hover:bg-white/[0.015] transition-all group"
            >
              <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform inline-block">
                {s.icon}
              </div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4">
                {s.title}
              </h3>
              <p className="text-slate-500 text-[10px] leading-relaxed mb-6">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] text-blue-400 border border-blue-500/20 px-2 py-1 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="w-full px-10 py-16 border-b border-white/5">
        <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase mb-8">
          Tech_Stack
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Supabase",
            "PostgreSQL",
            "MongoDB",
            "SQLite3",
            "Electron",
            "Rust",
            "AWS S3",
            "Google Cloud",
            "JavaScript",
            "HTML/CSS",
          ].map((t) => (
            <span
              key={t}
              className="text-[10px] text-slate-400 border border-white/8 px-3 py-2 rounded-sm hover:border-blue-500/30 hover:text-blue-400 transition-all cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── REGION & CONTACT ── */}
      <section
        id="kontakt"
        className="w-full px-10 py-24 flex flex-col md:flex-row gap-16 items-start"
      >
        <div className="flex-1">
          <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">
            Erreichbarkeit
          </p>
          <h2 className="text-3xl font-black italic uppercase mb-8">
            Service
            <br />
            <span className="text-blue-500">Regionen</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400 mb-8">
            {["NRW", "RLP", "Saarland", "Hessen", "Luxemburg", "Remote_EU"].map(
              (r) => (
                <div
                  key={r}
                  className="flex items-center gap-3 border border-white/5 p-4 rounded-sm hover:border-blue-500/20 transition-colors"
                >
                  <MapPin size={11} className="text-blue-500" /> {r}
                </div>
              ),
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Activity size={11} className="text-blue-500 animate-pulse" />
            Bevorzugt Remote — Vor-Ort auf Anfrage
          </div>
        </div>

        <div className="flex-1 bg-blue-600/5 border border-blue-500/20 p-10 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1.5 bg-blue-600 text-white text-[9px] uppercase tracking-widest font-bold">
            Verfügbar
          </div>
          <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">
            Status // Open
          </p>
          <h3 className="text-2xl font-black italic uppercase mb-4 leading-tight">
            Lass uns
            <br />
            reden.
          </h3>
          <p className="text-slate-400 text-[11px] leading-relaxed mb-8">
            Du hast ein Projekt das Systemdenken braucht? Eine Idee die jemanden
            braucht der sie wirklich versteht? Dann schreib mir.
          </p>
          <div className="space-y-3">
            <a
              href="mailto:peter@paeffgen-it.de"
              className="group flex items-center gap-3 text-[11px] text-white uppercase tracking-widest border-b border-blue-500/30 pb-3 hover:text-blue-400 hover:border-blue-400 transition-all w-fit"
            >
              E-Mail schreiben{" "}
              <ExternalLink
                size={11}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="https://github.com/peter1965p"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[11px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-3 hover:text-blue-400 hover:border-blue-400 transition-all w-fit"
            >
              GitHub ansehen{" "}
              <ExternalLink
                size={11}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full px-10 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em]">
          © 2026 Päffgen IT // Peter Päffgen // Manderscheid, Vulkaneifel
        </p>
        <div className="flex items-center gap-2 text-[9px] text-slate-700 uppercase tracking-widest">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
          </span>
          System Online // paeffgen-it.de
        </div>
      </footer>
    </div>
  );
}
