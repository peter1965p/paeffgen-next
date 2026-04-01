"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname() ?? "";

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/pages", label: "Sectors" }, // "Sectors" statt Pages für den AETHER-Vibe
    { href: "/admin/blog", label: "Intelligence" }, // Blog ist jetzt "Intelligence" 
    { href: "/admin/forms", label: "Formulare" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/intelligence", label: "Mailbox" },
    { href: "/admin/store", label: "Shop" },
    { href: "/admin/modulstore", label: "Modul Shop" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-[#0d111c] border-r border-white/5 h-screen flex flex-col p-8">
      <div className="mb-12">
        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
          AETHER <span className="text-orange-600">OS</span>
        </h2>
        <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1">Control Center</p>
      </div>

      <nav className="flex flex-col gap-3">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                isActive 
                  ? "bg-orange-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                  : "text-slate-500 hover:text-white hover:bg-orange-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        
        <div className="my-8 border-t border-white/5"></div>
        
        <Link 
          href="/" 
          className="group flex items-center gap-3 px-5 py-2 text-[10px] font-bold text-slate-600 hover:text-blue-400 transition-colors uppercase tracking-widest"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Exit to Web
        </Link>
      </nav>

      {/* Footer in der Sidebar [cite: 2026-02-20] */}
      <div className="mt-auto pt-8 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">System Online</span>
        </div>
      </div>
    </aside>
  );
}