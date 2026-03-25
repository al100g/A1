import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "A1 - Music & Mood Empowerment",
  description: "AI-powered music creation that understands your emotions. Detect your mood, generate songs, join live duets, and explore mood playlists.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-950 text-gray-100 antialiased font-sans">
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
