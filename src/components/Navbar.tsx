"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Falls du lucide-react nutzt, sonst nehmen wir SVGs

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/login", label: "Login" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors hover:text-foreground/80 ${
              pathname === link.href
                ? "text-foreground border-b-2 border-primary py-1"
                : "text-muted-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <button 
        className="md:hidden p-2 text-foreground z-[100]" 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* --- MOBILE OVERLAY MENU --- */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)} // Schließt Menü nach Klick
            className={`text-2xl font-black uppercase tracking-tighter transition-all ${
              pathname === link.href 
                ? "text-primary scale-110" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
        
        {/* Optional: Ein kleiner Footer im mobilen Menü */}
        <div className="absolute bottom-10 text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
          AETHER OS // FIELD OPS
        </div>
      </div>
    </>
  );
}