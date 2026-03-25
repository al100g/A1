import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'A1 - Music & Mood Empowerment',
  description: 'AI-powered music platform for mood detection, songwriting, and live duets',
  keywords: ['music', 'mood', 'AI', 'songwriting', 'duets', 'playlists'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen text-purple-50">
        <Providers>
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
