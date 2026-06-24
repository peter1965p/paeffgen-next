"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { THEMES, ThemeKey, DEFAULT_THEME, getTheme } from "@/lib/themes";

type ThemeCtx = { theme: ThemeKey; setTheme: (t: ThemeKey) => void };
const ThemeContext = createContext<ThemeCtx>({ theme: DEFAULT_THEME, setTheme: () => {} });

export function useTheme() { return useContext(ThemeContext); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(DEFAULT_THEME);

  useEffect(() => {
    const saved = localStorage.getItem("spectora-theme") as ThemeKey | null;
    if (saved && saved in THEMES) setThemeState(saved);
  }, []);

  useEffect(() => {
    const t = getTheme(theme);
    const root = document.documentElement;
    root.style.setProperty("--admin-accent",        t.accent);
    root.style.setProperty("--admin-accent-hover",  t.accentHover);
    root.style.setProperty("--admin-sidebar",       t.sidebar);
    root.style.setProperty("--admin-sidebar-border",t.sidebarBorder);
    root.style.setProperty("--admin-bg",            t.bg);
  }, [theme]);

  function setTheme(t: ThemeKey) {
    setThemeState(t);
    localStorage.setItem("spectora-theme", t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
