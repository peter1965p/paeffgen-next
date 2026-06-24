"use client";

import { useState, useEffect } from "react";
import type { Block, HeroBlock, TextBlock, StatsBlock, TerminalBlock, CardsBlock, CtaBlock } from "@/lib/blocks";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection({ block }: { block: HeroBlock }) {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-black border-b border-white/5">
      <div className="relative z-10 w-full px-10 max-w-5xl mx-auto">
        {block.badge && (
          <div className="flex items-center gap-3 mb-8 text-blue-500 text-[10px] uppercase tracking-[0.3em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            {block.badge}
          </div>
        )}
        <div className="mb-10 pt-4">
          <h1 className="text-[4rem] md:text-[8rem] font-black tracking-[-0.08em] leading-none select-none">
            <span className="bg-gradient-to-b from-orange-200 via-orange-500 to-orange-950 bg-clip-text text-transparent drop-shadow-[0_0_70px_rgba(234,88,12,0.4)] uppercase">
              {block.headline}
            </span>
          </h1>
        </div>
        {block.subline && (
          <p className="text-xl md:text-2xl text-zinc-300 font-light italic tracking-[0.12em] opacity-80 uppercase mb-6 leading-relaxed">
            {block.subline}
          </p>
        )}
        {block.description && (
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-10 not-italic font-mono">
            {block.description}
          </p>
        )}
        {(block.primaryBtn || block.secondaryBtn) && (
          <div className="flex gap-4 flex-wrap">
            {block.primaryBtn && (
              <Link
                href={block.primaryBtn.href}
                className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-sm transition-colors"
              >
                {block.primaryBtn.label}
              </Link>
            )}
            {block.secondaryBtn && (
              <Link
                href={block.secondaryBtn.href}
                className="border border-orange-600 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 text-[11px] uppercase tracking-widest px-6 py-3 rounded-sm transition-all flex items-center gap-2"
              >
                {block.secondaryBtn.label} <ExternalLink size={11} />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Text ──────────────────────────────────────────────────────────────────────
function TextSection({ block }: { block: TextBlock }) {
  return (
    <section className="w-full px-10 py-20 border-b border-white/5 max-w-5xl mx-auto">
      {block.label && (
        <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">{block.label}</p>
      )}
      <h2 className="text-4xl font-black italic uppercase mb-8 leading-none">{block.heading}</h2>
      <p className="text-slate-400 text-sm leading-relaxed max-w-3xl font-mono">{block.body}</p>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function StatsSection({ block }: { block: StatsBlock }) {
  return (
    <section className="w-full px-10 py-16 border-b border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
        {block.items.map((item, i) => (
          <div key={i} className="bg-[#05070a] px-5 py-6 hover:bg-blue-600/5 transition-colors">
            <div className="text-2xl font-black text-white">
              {item.value}
              {item.unit && <span className="text-blue-500 text-base">{item.unit}</span>}
            </div>
            <div className="text-[9px] text-slate-600 tracking-widest mt-1 uppercase">{item.sublabel}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Terminal ──────────────────────────────────────────────────────────────────
function TerminalSection({ block }: { block: TerminalBlock }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= block.lines.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 600);
    return () => clearTimeout(t);
  }, [visible, block.lines.length]);

  return (
    <section className="w-full px-10 py-16 border-b border-white/5">
      <div className="max-w-5xl mx-auto bg-gradient-to-bl from-orange-600 via-violet-800 to-slate-900 border border-orange-600/50 rounded p-6 font-mono text-[11px]">
        <div className="flex items-center gap-2 mb-4">
          {["#ff5f56", "#febc2e", "#27c840"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          <span className="text-slate-300 text-[9px] tracking-widest ml-2 uppercase">
            {block.title || "KERNEL_OUTPUT"}
          </span>
        </div>
        <div className="space-y-1.5">
          {block.lines.slice(0, visible).map((line, i) => (
            <div key={i} className="text-blue-300">
              <span className="text-slate-400">&gt; </span>{line}
            </div>
          ))}
          {visible < block.lines.length && (
            <div className="text-slate-400">
              &gt;{" "}
              <span className="inline-block w-2 h-3 bg-blue-500 align-[-2px] animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Cards ─────────────────────────────────────────────────────────────────────
function CardsSection({ block }: { block: CardsBlock }) {
  return (
    <section className="w-full px-10 py-20 border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        {block.label && (
          <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-4">{block.label}</p>
        )}
        {block.heading && (
          <h2 className="text-4xl font-black italic uppercase mb-12 leading-none">{block.heading}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {block.items.map((item, i) => (
            <div key={i} className="bg-[#05070a] p-8 hover:bg-zinc-900/50 transition-all group">
              <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 text-xs font-black mb-4">
                {i + 1}
              </div>
              <h4 className="text-xs font-mono font-bold uppercase mb-3 tracking-widest">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CtaSection({ block }: { block: CtaBlock }) {
  const isRed = block.variant === "red";
  return (
    <section className="w-full px-10 py-20">
      <div className={`max-w-5xl mx-auto p-12 border rounded relative overflow-hidden ${
        isRed
          ? "bg-[#b33927]/10 border-[#b33927]/30"
          : "bg-blue-600/5 border-blue-500/20"
      }`}>
        {block.label && (
          <p className={`text-[10px] tracking-[0.3em] uppercase mb-4 ${isRed ? "text-[#b33927]" : "text-blue-500"}`}>
            {block.label}
          </p>
        )}
        <h2 className="text-4xl font-black italic uppercase mb-4 leading-none">{block.heading}</h2>
        {block.body && (
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl font-mono">{block.body}</p>
        )}
        <Link
          href={block.btn.href}
          className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-sm transition-colors ${
            isRed
              ? "bg-[#b33927] hover:bg-[#d4442f] text-white"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
        >
          {block.btn.label}
        </Link>
      </div>
    </section>
  );
}

// ── Main Renderer ─────────────────────────────────────────────────────────────
export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="min-h-screen bg-[#05070a] text-white font-mono">
      {blocks.map((block) => {
        switch (block.type) {
          case "hero":     return <HeroSection     key={block.id} block={block} />;
          case "text":     return <TextSection     key={block.id} block={block} />;
          case "stats":    return <StatsSection    key={block.id} block={block} />;
          case "terminal": return <TerminalSection key={block.id} block={block} />;
          case "cards":    return <CardsSection    key={block.id} block={block} />;
          case "cta":      return <CtaSection      key={block.id} block={block} />;
          default:         return null;
        }
      })}
    </div>
  );
}
