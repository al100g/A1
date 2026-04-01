'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music } from 'lucide-react';

const navLinks = [
  { href: '/mood', label: 'Mood' },
  { href: '/songs', label: 'Songs' },
  { href: '/duets', label: 'Duets' },
  { href: '/playlists', label: 'Playlists' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-purple-800/40">
      <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
        <Music className="w-6 h-6 text-violet-400" />
        A1
      </Link>
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === href
                ? 'bg-violet-600/30 text-violet-300'
                : 'text-purple-300 hover:text-white hover:bg-purple-800/40'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
