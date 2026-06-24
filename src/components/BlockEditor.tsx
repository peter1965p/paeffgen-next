"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, ChevronDown as Expand } from "lucide-react";
import { type Block, type BlockType, type StatItem, type CardItem, BLOCK_LABELS, createBlock } from "@/lib/blocks";

interface Props {
  value: Block[];
  onChange: (blocks: Block[]) => void;
}

const inputClass = "w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-white font-mono text-xs outline-none focus:border-[#b33927]/50 transition-all placeholder:text-slate-700";
const labelClass = "text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-500 mb-1.5 block";

function updateField<T extends Block>(block: T, key: keyof T, value: unknown): T {
  return { ...block, [key]: value };
}

// ── Hero form ─────────────────────────────────────────────────────────────────
function HeroForm({ block, onChange }: { block: Extract<Block, { type: "hero" }>; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-4">
      <div><label className={labelClass}>Badge-Text</label><input className={inputClass} value={block.badge || ""} onChange={e => onChange(updateField(block, "badge", e.target.value))} placeholder="Verfügbar für Projekte" /></div>
      <div><label className={labelClass}>Headline *</label><input className={inputClass} value={block.headline} onChange={e => onChange(updateField(block, "headline", e.target.value))} placeholder="PÄFFGEN IT" /></div>
      <div><label className={labelClass}>Subline</label><input className={inputClass} value={block.subline || ""} onChange={e => onChange(updateField(block, "subline", e.target.value))} placeholder="Ich baue Produkte. Nicht Prototypen." /></div>
      <div><label className={labelClass}>Beschreibung</label><textarea className={`${inputClass} resize-none`} rows={3} value={block.description || ""} onChange={e => onChange(updateField(block, "description", e.target.value))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Button 1 — Label</label>
          <input className={inputClass} value={block.primaryBtn?.label || ""} onChange={e => onChange(updateField(block, "primaryBtn", { ...block.primaryBtn, label: e.target.value }))} placeholder="Projekt anfragen →" />
        </div>
        <div>
          <label className={labelClass}>Button 1 — Link</label>
          <input className={inputClass} value={block.primaryBtn?.href || ""} onChange={e => onChange(updateField(block, "primaryBtn", { ...block.primaryBtn, href: e.target.value }))} placeholder="/contact" />
        </div>
        <div>
          <label className={labelClass}>Button 2 — Label</label>
          <input className={inputClass} value={block.secondaryBtn?.label || ""} onChange={e => onChange(updateField(block, "secondaryBtn", { ...block.secondaryBtn, label: e.target.value }))} placeholder="GitHub_Access" />
        </div>
        <div>
          <label className={labelClass}>Button 2 — Link</label>
          <input className={inputClass} value={block.secondaryBtn?.href || ""} onChange={e => onChange(updateField(block, "secondaryBtn", { ...block.secondaryBtn, href: e.target.value }))} placeholder="https://github.com/..." />
        </div>
      </div>
    </div>
  );
}

// ── Text form ─────────────────────────────────────────────────────────────────
function TextForm({ block, onChange }: { block: Extract<Block, { type: "text" }>; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-4">
      <div><label className={labelClass}>Label (klein, blau)</label><input className={inputClass} value={block.label || ""} onChange={e => onChange(updateField(block, "label", e.target.value))} placeholder="Über mich" /></div>
      <div><label className={labelClass}>Heading *</label><input className={inputClass} value={block.heading} onChange={e => onChange(updateField(block, "heading", e.target.value))} placeholder="Systeme denken." /></div>
      <div><label className={labelClass}>Text *</label><textarea className={`${inputClass} resize-y`} rows={5} value={block.body} onChange={e => onChange(updateField(block, "body", e.target.value))} /></div>
    </div>
  );
}

// ── Stats form ────────────────────────────────────────────────────────────────
function StatsForm({ block, onChange }: { block: Extract<Block, { type: "stats" }>; onChange: (b: Block) => void }) {
  const updateItem = (i: number, field: keyof StatItem, val: string) => {
    const items = block.items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    onChange(updateField(block, "items", items));
  };
  const addItem = () => onChange(updateField(block, "items", [...block.items, { value: "0", unit: "", sublabel: "LABEL" }]));
  const removeItem = (i: number) => onChange(updateField(block, "items", block.items.filter((_, idx) => idx !== i)));

  return (
    <div className="space-y-3">
      {block.items.map((item, i) => (
        <div key={i} className="flex gap-3 items-end">
          <div className="w-24"><label className={labelClass}>Wert</label><input className={inputClass} value={item.value} onChange={e => updateItem(i, "value", e.target.value)} placeholder="3+" /></div>
          <div className="w-20"><label className={labelClass}>Einheit</label><input className={inputClass} value={item.unit || ""} onChange={e => updateItem(i, "unit", e.target.value)} placeholder="%" /></div>
          <div className="flex-1"><label className={labelClass}>Label</label><input className={inputClass} value={item.sublabel} onChange={e => updateItem(i, "sublabel", e.target.value)} placeholder="UPTIME_INDEX" /></div>
          <button type="button" onClick={() => removeItem(i)} className="p-3 hover:bg-red-900/20 text-red-500 rounded-xl transition-all mb-0.5"><Trash2 size={12} /></button>
        </div>
      ))}
      {block.items.length < 4 && (
        <button type="button" onClick={addItem} className="text-[10px] text-blue-500 hover:text-blue-400 uppercase tracking-widest flex items-center gap-2 transition-colors">
          <Plus size={12} /> Stat hinzufügen
        </button>
      )}
    </div>
  );
}

// ── Terminal form ─────────────────────────────────────────────────────────────
function TerminalForm({ block, onChange }: { block: Extract<Block, { type: "terminal" }>; onChange: (b: Block) => void }) {
  const updateLine = (i: number, val: string) => {
    const lines = block.lines.map((l, idx) => idx === i ? val : l);
    onChange(updateField(block, "lines", lines));
  };
  const addLine = () => onChange(updateField(block, "lines", [...block.lines, ""]));
  const removeLine = (i: number) => onChange(updateField(block, "lines", block.lines.filter((_, idx) => idx !== i)));

  return (
    <div className="space-y-3">
      <div><label className={labelClass}>Titel</label><input className={inputClass} value={block.title || ""} onChange={e => onChange(updateField(block, "title", e.target.value))} placeholder="KERNEL_OUTPUT" /></div>
      <label className={labelClass}>Zeilen</label>
      {block.lines.map((line, i) => (
        <div key={i} className="flex gap-2 items-center">
          <span className="text-slate-600 text-xs font-mono shrink-0">&gt;</span>
          <input className={`${inputClass} flex-1`} value={line} onChange={e => updateLine(i, e.target.value)} placeholder="System bereit." />
          <button type="button" onClick={() => removeLine(i)} className="p-2 hover:bg-red-900/20 text-red-500 rounded-lg transition-all"><Trash2 size={12} /></button>
        </div>
      ))}
      <button type="button" onClick={addLine} className="text-[10px] text-blue-500 hover:text-blue-400 uppercase tracking-widest flex items-center gap-2 transition-colors">
        <Plus size={12} /> Zeile hinzufügen
      </button>
    </div>
  );
}

// ── Cards form ────────────────────────────────────────────────────────────────
function CardsForm({ block, onChange }: { block: Extract<Block, { type: "cards" }>; onChange: (b: Block) => void }) {
  const updateItem = (i: number, field: keyof CardItem, val: string) => {
    const items = block.items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    onChange(updateField(block, "items", items));
  };
  const addItem = () => onChange(updateField(block, "items", [...block.items, { title: "Feature", text: "Beschreibung..." }]));
  const removeItem = (i: number) => onChange(updateField(block, "items", block.items.filter((_, idx) => idx !== i)));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Label</label><input className={inputClass} value={block.label || ""} onChange={e => onChange(updateField(block, "label", e.target.value))} placeholder="Features" /></div>
        <div><label className={labelClass}>Heading</label><input className={inputClass} value={block.heading || ""} onChange={e => onChange(updateField(block, "heading", e.target.value))} placeholder="Was wir bieten" /></div>
      </div>
      {block.items.map((item, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Card {i + 1}</span>
            <button type="button" onClick={() => removeItem(i)} className="p-1.5 hover:bg-red-900/20 text-red-500 rounded-lg transition-all"><Trash2 size={11} /></button>
          </div>
          <div><label className={labelClass}>Titel</label><input className={inputClass} value={item.title} onChange={e => updateItem(i, "title", e.target.value)} /></div>
          <div><label className={labelClass}>Text</label><textarea className={`${inputClass} resize-none`} rows={2} value={item.text} onChange={e => updateItem(i, "text", e.target.value)} /></div>
        </div>
      ))}
      {block.items.length < 6 && (
        <button type="button" onClick={addItem} className="text-[10px] text-blue-500 hover:text-blue-400 uppercase tracking-widest flex items-center gap-2 transition-colors">
          <Plus size={12} /> Card hinzufügen
        </button>
      )}
    </div>
  );
}

// ── CTA form ──────────────────────────────────────────────────────────────────
function CtaForm({ block, onChange }: { block: Extract<Block, { type: "cta" }>; onChange: (b: Block) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Label</label><input className={inputClass} value={block.label || ""} onChange={e => onChange(updateField(block, "label", e.target.value))} placeholder="Kontakt" /></div>
        <div>
          <label className={labelClass}>Farbe</label>
          <select className={inputClass} value={block.variant || "blue"} onChange={e => onChange(updateField(block, "variant", e.target.value))}>
            <option value="blue">Blau</option>
            <option value="red">Rot (#b33927)</option>
          </select>
        </div>
      </div>
      <div><label className={labelClass}>Heading *</label><input className={inputClass} value={block.heading} onChange={e => onChange(updateField(block, "heading", e.target.value))} placeholder="Lass uns reden." /></div>
      <div><label className={labelClass}>Text</label><textarea className={`${inputClass} resize-none`} rows={3} value={block.body || ""} onChange={e => onChange(updateField(block, "body", e.target.value))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={labelClass}>Button Label</label><input className={inputClass} value={block.btn.label} onChange={e => onChange(updateField(block, "btn", { ...block.btn, label: e.target.value }))} placeholder="Jetzt anfragen →" /></div>
        <div><label className={labelClass}>Button Link</label><input className={inputClass} value={block.btn.href} onChange={e => onChange(updateField(block, "btn", { ...block.btn, href: e.target.value }))} placeholder="/contact" /></div>
      </div>
    </div>
  );
}

// ── Block Card ────────────────────────────────────────────────────────────────
function BlockCard({
  block, index, total,
  onUpdate, onDelete, onMove,
}: {
  block: Block; index: number; total: number;
  onUpdate: (b: Block) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? "border-[#b33927]/30" : "border-white/5"}`}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-all"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-slate-600 w-5 text-center">{index + 1}</span>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-white">{BLOCK_LABELS[block.type]}</span>
            {"headline" in block && block.headline && <span className="text-slate-500 text-xs ml-2 font-mono">— {String(block.headline).slice(0, 30)}</span>}
            {"heading" in block && block.heading && <span className="text-slate-500 text-xs ml-2 font-mono">— {String(block.heading).slice(0, 30)}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={e => { e.stopPropagation(); onMove(-1); }} disabled={index === 0} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 disabled:opacity-20 transition-all"><ChevronUp size={14} /></button>
          <button type="button" onClick={e => { e.stopPropagation(); onMove(1); }} disabled={index === total - 1} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 disabled:opacity-20 transition-all"><ChevronDown size={14} /></button>
          <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }} className="p-1.5 hover:bg-red-900/20 rounded-lg text-red-500 transition-all ml-1"><Trash2 size={14} /></button>
          <Expand size={14} className={`text-slate-600 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* Form */}
      {open && (
        <div className="px-5 pb-6 border-t border-white/5 pt-5">
          {block.type === "hero"     && <HeroForm     block={block} onChange={onUpdate} />}
          {block.type === "text"     && <TextForm     block={block} onChange={onUpdate} />}
          {block.type === "stats"    && <StatsForm    block={block} onChange={onUpdate} />}
          {block.type === "terminal" && <TerminalForm block={block} onChange={onUpdate} />}
          {block.type === "cards"    && <CardsForm    block={block} onChange={onUpdate} />}
          {block.type === "cta"      && <CtaForm      block={block} onChange={onUpdate} />}
        </div>
      )}
    </div>
  );
}

// ── Block Picker ──────────────────────────────────────────────────────────────
function BlockPicker({ onAdd }: { onAdd: (type: BlockType) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-white/10 hover:border-[#b33927]/50 rounded-2xl text-slate-500 hover:text-[#b33927] text-[10px] font-black uppercase tracking-widest transition-all"
      >
        <Plus size={14} /> Block hinzufügen
      </button>
      {open && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-[#0d111c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10">
          {(Object.entries(BLOCK_LABELS) as [BlockType, string][]).map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => { onAdd(type); setOpen(false); }}
              className="w-full text-left px-5 py-3.5 hover:bg-white/5 text-[10px] font-mono text-slate-300 hover:text-white uppercase tracking-widest transition-colors border-b border-white/5 last:border-0"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main BlockEditor ──────────────────────────────────────────────────────────
export default function BlockEditor({ value, onChange }: Props) {
  const update = (i: number, b: Block) => {
    const next = [...value];
    next[i] = b;
    onChange(next);
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  const move = (i: number, dir: -1 | 1) => {
    const next = [...value];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const add = (type: BlockType) => onChange([...value, createBlock(type)]);

  return (
    <div className="space-y-3">
      {value.length === 0 && (
        <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest">Noch keine Blöcke — füge deinen ersten hinzu</p>
        </div>
      )}
      {value.map((block, i) => (
        <BlockCard
          key={block.id}
          block={block}
          index={i}
          total={value.length}
          onUpdate={(b) => update(i, b)}
          onDelete={() => remove(i)}
          onMove={(dir) => move(i, dir)}
        />
      ))}
      <BlockPicker onAdd={add} />
    </div>
  );
}
