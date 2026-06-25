"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, ChevronRight } from "lucide-react";
import LangToggle from "@/components/LangToggle";
import { useLang } from "@/hooks/useLang";

const NAV_LABELS = {
  de: { home: "Home", blog: "Blog", about: "About", legal: "Impressum", login: "Login" },
  en: { home: "Home", blog: "Blog", about: "About", legal: "Legal Notice", login: "Login" },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [lang] = useLang();
  const lbl = NAV_LABELS[lang];

  const isAdmin = pathname?.startsWith("/admin");

  const links = isAdmin
    ? [
        { href: "/admin", label: "Control Center" },
        { href: "/admin/settings", label: "Settings" },
        { href: "/", label: "Exit to Web" },
      ]
    : [
        { href: "/", label: lbl.home },
        { href: "/blog", label: lbl.blog },
        { href: "/about", label: lbl.about },
        { href: "/contact", label: lbl.legal },
        { href: "/login", label: lbl.login },
      ];

  if (isAdmin && pathname !== "/admin/login") return null;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2 group">
        <Terminal size={20} className="text-[#b33927] group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-black italic uppercase tracking-tighter text-white">
          Päffgen <span className="text-[#b33927]">IT</span>
        </span>
      </Link>

      {/* DESKTOP */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all hover:text-white ${
              pathname === link.href ? "text-[#b33927]" : "text-slate-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <LangToggle />
      </nav>

      {/* MOBILE TRIGGER */}
      <button
        className="md:hidden p-2 text-white active:scale-90 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black z-[90] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b33927]/10 blur-[100px] -z-10" />
        <div className="flex flex-col h-full p-10 pt-32">
          <p className="text-[8px] font-mono text-[#b33927] uppercase tracking-[0.6em] mb-10">
            System Menu // Uplink Active
          </p>
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between border-b border-white/5 py-5 transition-all active:translate-x-2"
              >
                <span className={`text-4xl font-black italic uppercase tracking-tighter ${
                  pathname === link.href ? "text-[#b33927]" : "text-white group-hover:text-[#b33927]"
                }`}>
                  {link.label}
                </span>
                <ChevronRight className={pathname === link.href ? "text-[#b33927]" : "text-zinc-800"} size={20} />
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <LangToggle />
          </div>
          <div className="mt-auto border-t border-white/5 pt-8">
            <div className="flex items-center justify-between text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
              <span>Node: paeffgen-it.de</span>
              <span>v3.0.4</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
