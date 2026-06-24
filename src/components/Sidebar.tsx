"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, PenTool, ClipboardList,
  Users, Search, Tag, Mail, ShoppingCart, Package,
  Settings, ArrowLeft, Database, TerminalSquare,
} from "lucide-react";

const navLinks = [
  { href: "/admin",              label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/pages",        label: "Pages",      icon: FileText },
  { href: "/admin/blog",         label: "Blog",       icon: PenTool },
  { href: "/admin/forms",        label: "Formulare",  icon: ClipboardList },
  { href: "/admin/users",        label: "Users",      icon: Users },
  { href: "/admin/seo",          label: "SEO",        icon: Search },
  { href: "/admin/categories",   label: "Kategorien", icon: Tag },
  { href: "/admin/intelligence",  label: "Mailbox",   icon: Mail },
  { href: "/admin/store",        label: "Shop",       icon: ShoppingCart },
  { href: "/admin/modulstore",   label: "Module",     icon: Package },
  { href: "/admin/database",     label: "Database",   icon: Database },
  { href: "/admin/sql",          label: "SQL Editor", icon: TerminalSquare },
  { href: "/admin/settings",     label: "Settings",   icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside
      className="w-60 h-screen flex flex-col p-6 border-r"
      style={{
        backgroundColor: "var(--admin-sidebar, #1e293b)",
        borderColor: "var(--admin-sidebar-border, rgba(255,255,255,0.06))",
      }}
    >
      <div className="mb-10 px-2">
        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">
          SPECTORA
        </h2>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold mt-1">
          Control Center
        </p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
                isActive ? "text-white shadow-sm" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
              style={isActive ? { backgroundColor: "var(--admin-accent, #ea580c)" } : {}}
            >
              <Icon size={13} />
              {link.label}
            </Link>
          );
        })}

        <div className="my-3 border-t border-white/5" />

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-[10px] font-bold text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={12} />
          Exit to Web
        </Link>
      </nav>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>
    </aside>
  );
}
