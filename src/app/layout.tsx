import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "A1 – Music & Mood Empowerment",
  description:
    "A1 uses cutting-edge AI to create personalized songs based on your mood. Detect emotions, generate lyrics, join live duets, and discover mood-curated playlists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <footer className="text-center py-8 text-gray-500 text-sm border-t border-white/10 mt-16">
          <p>© 2024 A1 – Music &amp; Mood Empowerment Platform</p>
        </footer>
      </body>
    </html>
  );
}
