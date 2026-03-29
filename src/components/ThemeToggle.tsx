"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Die saubere Lösung

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (!theme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return <div className="w-10 h-10" />; // Placeholder gegen Layout-Shift

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 active:scale-95 transition-all duration-200 group"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun 
          size={18} 
          className="text-blue-600 group-hover:text-yellow-500 transition-colors duration-300" 
        />
      ) : (
        <Moon 
          size={18} 
          className="text-slate-600 group-hover:text-blue-600 transition-colors duration-300" 
        />
      )}
    </button>
  );
}