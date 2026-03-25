import SongGenerator from "@/components/SongGenerator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Songwriting | A1",
  description: "Generate custom lyrics and melodies based on your mood and genre",
};

export default function AISongwritingPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-full text-sm text-pink-300 font-medium">
          <span className="text-lg">🎵</span>
          AI Songwriting
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Create Your{" "}
          <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            Perfect Song
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
          Select your mood and favorite genre, then let A1&apos;s AI compose original lyrics,
          suggest a melody, and determine the perfect tempo and key for your song.
        </p>
      </div>

      {/* Feature highlights */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { icon: "📝", label: "Custom Lyrics", desc: "8-line original verses" },
          { icon: "🎼", label: "Melody Guide", desc: "Detailed composition notes" },
          { icon: "🎹", label: "Key & Tempo", desc: "Professional music theory" },
          { icon: "🎙️", label: "AI Singing", desc: "Coming soon" },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1 text-center">
            <span className="text-2xl block">{item.icon}</span>
            <p className="text-white font-semibold text-sm">{item.label}</p>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Song Generator */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <SongGenerator />
      </div>

      {/* Info note */}
      <div className="bg-white/3 border border-white/10 rounded-xl p-4 flex gap-3">
        <span className="text-violet-400 text-lg flex-shrink-0">💡</span>
        <p className="text-gray-400 text-sm leading-relaxed">
          A1 generates mood-matched songs across 6 genres and 6 emotional states — that&apos;s{" "}
          <strong className="text-white">36 unique compositions</strong> to discover. Each song
          includes custom lyrics, melody description, tempo, and musical key. The AI Singing
          feature is coming soon!
        </p>
      </div>
    </div>
  );
}
