import MoodPlaylist from "@/components/MoodPlaylist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mood Playlists | A1",
  description: "Discover curated playlists that perfectly match your emotional state",
};

export default function MoodPlaylistsPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-sm text-teal-300 font-medium">
          <span className="text-lg">🎧</span>
          Mood Playlists
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Music for Every{" "}
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Emotion
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
          Browse our curated collection of mood-matched playlists. Filter by your current
          emotional state and discover music that truly resonates with how you feel.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: "12", label: "Playlists", icon: "🎵" },
          { value: "6", label: "Mood Types", icon: "🎭" },
          { value: "272", label: "Total Tracks", icon: "🎧" },
          { value: "18h+", label: "Total Duration", icon: "⏱️" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1">
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-white font-black text-xl">{stat.value}</p>
            <p className="text-gray-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Playlist Grid with filter */}
      <MoodPlaylist />

      {/* Info note */}
      <div className="bg-white/3 border border-white/10 rounded-xl p-4 flex gap-3">
        <span className="text-teal-400 text-lg flex-shrink-0">🎧</span>
        <p className="text-gray-400 text-sm leading-relaxed">
          All playlists are curated by A1&apos;s AI and updated weekly. Use our{" "}
          <a href="/mood-detection" className="text-teal-400 hover:text-teal-300 underline">
            Mood Detection
          </a>{" "}
          feature to automatically find the best playlist for your current emotional state.
          Full audio streaming coming soon!
        </p>
      </div>
    </div>
  );
}
