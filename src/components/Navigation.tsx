"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/mood-detection", label: "Mood Detection" },
  { href: "/ai-songwriting", label: "AI Songwriting" },
  { href: "/live-duets", label: "Live Duets" },
  { href: "/mood-playlists", label: "Playlists" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              A1
            </div>
            <span className="font-bold text-lg gradient-text">A1</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? "bg-violet-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex gap-1">
            {navLinks.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`p-2 rounded text-xs ${
                  pathname === href ? "text-violet-400" : "text-gray-500"
                }`}
                title={label}
              >
                {label.split(" ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
