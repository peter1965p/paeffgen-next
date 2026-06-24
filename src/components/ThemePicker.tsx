"use client";

import { THEMES, ThemeKey } from "@/lib/themes";
import { useTheme } from "@/components/ThemeProvider";
import { Check } from "lucide-react";

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-6">
      <h2 className="text-sm font-black text-white uppercase tracking-wide italic mb-1">Theme</h2>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-5">
        Design des Admin Panels
      </p>
      <div className="flex flex-wrap gap-3">
        {(Object.entries(THEMES) as [ThemeKey, typeof THEMES[ThemeKey]][]).map(([key, t]) => {
          const isActive = theme === key;
          return (
            <button
              key={key}
              onClick={() => setTheme(key)}
              title={t.name}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                isActive
                  ? "border-white/20 bg-white/8"
                  : "border-white/5 hover:border-white/15 hover:bg-white/5"
              }`}
            >
              <div className="relative flex-shrink-0">
                {/* Sidebar swatch */}
                <div
                  className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 flex flex-col"
                >
                  <div className="w-full h-5" style={{ backgroundColor: t.sidebar }} />
                  <div className="w-full h-3" style={{ backgroundColor: t.accent }} />
                </div>
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Check size={9} className="text-black" strokeWidth={3} />
                  </div>
                )}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${
                isActive ? "text-white" : "text-slate-400 group-hover:text-white"
              }`}>
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
