import type { Metadata } from 'next';
import '../styles/globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'A1 – Music & Mood Empowerment Platform',
  description:
    'A1 is a revolutionary music and mood empowerment platform. Using AI, A1 detects your mood, creates personalized songs, and curates playlists to uplift and inspire you.',
  keywords: ['music', 'AI', 'mood', 'songwriting', 'playlist', 'empowerment'],
  openGraph: {
    title: 'A1 – Music & Mood Empowerment Platform',
    description:
      'Personalized music experiences powered by AI. Detect your mood, generate songs, and join live duets.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-gray-950 text-white antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} A1 Music Platform. All rights reserved.</p>
          <p className="mt-1">Empowering emotions through music & AI.</p>
        </footer>
      </body>
    </html>
  );
}
