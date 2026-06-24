"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Globe, Eye, EyeOff, Navigation, RefreshCw, ArrowLeft, ExternalLink } from "lucide-react";

interface PageData {
  id?: number;
  title?: string;
  slug?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  is_published?: boolean;
  show_in_nav?: boolean;
  nav_order?: number;
}

interface Props {
  page?: PageData;
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>;
}

export default function PageForm({ page, action }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(page?.title || "");
  const [slug, setSlug] = useState(page?.slug || "");
  const [isPublished, setIsPublished] = useState(page?.is_published ?? false);
  const [showInNav, setShowInNav] = useState(page?.show_in_nav ?? false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const autoSlug = (t: string) =>
    t.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!page?.slug) setSlug(autoSlug(val));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await action(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
      } else if (result && "success" in result) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    });
  };

  const inputClass = "w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-5 text-white font-mono text-xs outline-none focus:border-[#b33927]/50 focus:ring-1 focus:ring-[#b33927]/10 transition-all placeholder:text-slate-700";
  const labelClass = "text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-500 mb-2 block ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Title + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Titel</label>
          <input
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Meine Seite"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Slug (URL)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-600">/</span>
            <input
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="meine-seite"
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label className={labelClass}>Inhalt (HTML)</label>
        <textarea
          name="content"
          defaultValue={page?.content || ""}
          rows={16}
          placeholder={"<h1>Überschrift</h1>\n<p>Dein Text hier...</p>"}
          className={`${inputClass} resize-y font-mono text-[11px] leading-relaxed`}
        />
      </div>

      {/* Meta */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={14} className="text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">SEO / Meta</span>
        </div>
        <div>
          <label className={labelClass}>Meta Title</label>
          <input name="meta_title" defaultValue={page?.meta_title || ""} placeholder={title || "Seiten-Titel"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Meta Description</label>
          <textarea name="meta_description" defaultValue={page?.meta_description || ""} rows={2} placeholder="Kurzbeschreibung für Suchmaschinen..." className={`${inputClass} resize-none`} />
        </div>
      </div>

      {/* Toggles + Nav Order */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Published Toggle */}
        <button
          type="button"
          onClick={() => setIsPublished(!isPublished)}
          className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${isPublished ? "bg-green-500/10 border-green-500/30" : "bg-zinc-950 border-white/5"}`}
        >
          {isPublished ? <Eye size={18} className="text-green-500" /> : <EyeOff size={18} className="text-slate-500" />}
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">{isPublished ? "Veröffentlicht" : "Entwurf"}</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{isPublished ? "Öffentlich sichtbar" : "Nur intern"}</p>
          </div>
          <input type="hidden" name="is_published" value={isPublished ? "on" : "off"} />
        </button>

        {/* Nav Toggle */}
        <button
          type="button"
          onClick={() => setShowInNav(!showInNav)}
          className={`flex items-center gap-4 p-6 rounded-2xl border transition-all ${showInNav ? "bg-blue-500/10 border-blue-500/30" : "bg-zinc-950 border-white/5"}`}
        >
          <Navigation size={18} className={showInNav ? "text-blue-500" : "text-slate-500"} />
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">Navigation</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{showInNav ? "Im Menü sichtbar" : "Nicht im Menü"}</p>
          </div>
          <input type="hidden" name="show_in_nav" value={showInNav ? "on" : "off"} />
        </button>

        {/* Nav Order */}
        <div>
          <label className={labelClass}>Reihenfolge (Nav)</label>
          <input
            name="nav_order"
            type="number"
            defaultValue={page?.nav_order ?? 0}
            min={0}
            className={inputClass}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-[10px] font-mono uppercase tracking-widest bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.push("/admin/pages")}
          className="flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14} /> Zurück
        </button>
        <div className="flex items-center gap-4">
          {page?.slug && isPublished && (
            <a
              href={`/${page.slug}`}
              target="_blank"
              className="flex items-center gap-2 text-slate-500 hover:text-blue-400 text-[10px] font-mono uppercase tracking-widest transition-colors"
            >
              <ExternalLink size={14} /> Vorschau
            </a>
          )}
          <button
            type="submit"
            disabled={isPending}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black italic uppercase tracking-widest text-[11px] transition-all shadow-lg ${
              saved
                ? "bg-green-600 text-white shadow-green-900/20"
                : "bg-[#b33927] hover:bg-[#d4442f] text-white shadow-[#b33927]/20"
            } disabled:opacity-50`}
          >
            {isPending ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {isPending ? "Speichern..." : saved ? "Gespeichert ✓" : "Speichern"}
          </button>
        </div>
      </div>
    </form>
  );
}
