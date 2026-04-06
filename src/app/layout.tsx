import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "A1 — Your AI Music & Mood Companion",
  description:
    "A1 is an AI-powered music and mood empowerment platform. Detect your mood, generate personalized songs, and let AI sing just for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
