export const THEMES = {
  spectora: {
    name: "Spectora",
    accent: "#ea580c",
    accentHover: "#f97316",
    sidebar: "#1e293b",
    sidebarBorder: "rgba(255,255,255,0.06)",
    bg: "#0f172a",
  },
  midnight: {
    name: "Midnight",
    accent: "#3b82f6",
    accentHover: "#60a5fa",
    sidebar: "#0f1729",
    sidebarBorder: "rgba(59,130,246,0.12)",
    bg: "#020617",
  },
  forest: {
    name: "Forest",
    accent: "#10b981",
    accentHover: "#34d399",
    sidebar: "#0d1f18",
    sidebarBorder: "rgba(16,185,129,0.12)",
    bg: "#030f0a",
  },
  violet: {
    name: "Violet",
    accent: "#8b5cf6",
    accentHover: "#a78bfa",
    sidebar: "#150f26",
    sidebarBorder: "rgba(139,92,246,0.12)",
    bg: "#09050f",
  },
  rose: {
    name: "Rose",
    accent: "#e11d48",
    accentHover: "#fb7185",
    sidebar: "#1f0d14",
    sidebarBorder: "rgba(225,29,72,0.12)",
    bg: "#0f0308",
  },
  carbon: {
    name: "Carbon",
    accent: "#e2e8f0",
    accentHover: "#f8fafc",
    sidebar: "#111111",
    sidebarBorder: "rgba(255,255,255,0.06)",
    bg: "#000000",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = typeof THEMES[ThemeKey];

export const DEFAULT_THEME: ThemeKey = "spectora";

export function getTheme(key: string): Theme {
  return THEMES[(key as ThemeKey) in THEMES ? (key as ThemeKey) : DEFAULT_THEME];
}
