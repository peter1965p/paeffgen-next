"use client";
import { useState, useEffect } from "react";

export type Lang = "de" | "en";
const KEY = "paeffgen-lang";
const EVT = "paeffgen-lang-change";

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Lang | null;
    if (saved === "de" || saved === "en") setLangState(saved);

    const handler = (e: Event) =>
      setLangState((e as CustomEvent<Lang>).detail);
    window.addEventListener(EVT, handler);
    return () => window.removeEventListener(EVT, handler);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(KEY, l);
    window.dispatchEvent(new CustomEvent<Lang>(EVT, { detail: l }));
  };

  return [lang, setLang];
}
