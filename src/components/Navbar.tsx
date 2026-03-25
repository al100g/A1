"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/mood", label: "Mood" },
  { href: "/song", label: "My Song" },
  { href: "/recommendations", label: "Discover" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black gradient-text tracking-tight">A1</span>
          <span className="text-xs text-purple-400 hidden sm:inline-block">
            Empowerment Through Music
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                  : "text-purple-200/70 hover:text-purple-200 hover:bg-purple-600/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
