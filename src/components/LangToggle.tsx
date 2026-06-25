"use client";
import { useLang } from "@/hooks/useLang";

export default function LangToggle() {
  const [lang, setLang] = useLang();
  return (
    <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden">
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-all ${
            lang === l
              ? "bg-[#b33927] text-white"
              : "text-slate-500 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
