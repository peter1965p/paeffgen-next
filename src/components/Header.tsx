import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/80 backdrop-blur-md dark:border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Paeffgen <span className="text-blue-700">IT</span>
          </Link>
          {/* Die Navbar sitzt hier perfekt neben dem Logo */}
          <Navbar />
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}