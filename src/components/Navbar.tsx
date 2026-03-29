"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/login", label: "Login" },    
  ];

  return (
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
  );
}