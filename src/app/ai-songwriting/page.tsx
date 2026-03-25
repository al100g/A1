"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Song = {
  title: string;
  genre: string;
  tempo: string;
  lyrics: string;
  chords: string[];
};

const MOOD_OPTIONS = [
  { value: "happy", label: "Happy 😊" },
  { value: "sad", label: "Sad 😢" },
  { value: "energetic", label: "Energetic ⚡" },
  { value: "calm", label: "Calm 🌿" },
  { value: "romantic", label: "Romantic 💕" },
  { value: "melancholic", label: "Melancholic 🌧️" },
];

function SongwritingContent() {
  const searchParams = useSearchParams();
  const [mood, setMood] = useState(searchParams.get("mood") ?? "happy");
  const [theme, setTheme] = useState("");
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function generateSong() {
    setLoading(true);
    setError(null);
    setSong(null);
    setIsPlaying(false);

    try {
      const res = await fetch("/api/lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setSong(data.song);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Auto-generate if mood is provided from mood detection
  useEffect(() => {
    const moodParam = searchParams.get("mood");
    if (moodParam) {
      setMood(moodParam);
    }
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🎵</div>
        <h1 className="text-4xl font-black text-white mb-4">
          AI Songwriting &amp; Singing
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Our AI composes original lyrics and melodies tailored to your mood.
          Every song is unique — crafted just for this moment in time.
        </p>
      </div>

      {/* Controls */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
            >
              {MOOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-gray-900">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme / Topic{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. summer, friendship, stars…"
              maxLength={100}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
            />
          </div>
        </div>
        <button
          onClick={generateSong}
          disabled={loading}
          className="w-full py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.01]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Composing your song…
            </span>
          ) : (
            "✨ Generate Song"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {/* Song Result */}
      {song && (
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600/30 to-violet-600/30 p-6 border-b border-white/10">
            <h2 className="text-2xl font-black text-white mb-2">
              &ldquo;{song.title}&rdquo;
            </h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                🎸 {song.genre}
              </span>
              <span className="flex items-center gap-1">
                🥁 {song.tempo}
              </span>
            </div>

            {/* Chord Progression */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-400 self-center">Chords:</span>
              {song.chords.map((chord) => (
                <span
                  key={chord}
                  className="px-3 py-1 bg-white/10 rounded-lg text-sm font-mono text-white"
                >
                  {chord}
                </span>
              ))}
            </div>
          </div>

          {/* Playback Controls (UI simulation) */}
          <div className="p-4 border-b border-white/10 flex items-center gap-4">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-12 h-12 rounded-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Waveform */}
            <div className="flex-1 flex items-center gap-0.5 h-8">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-200 ${
                    isPlaying ? "wave-bar" : ""
                  } ${i < 15 && isPlaying ? "bg-pink-400" : "bg-white/20"}`}
                  style={{
                    height: `${15 + Math.sin(i * 0.5) * 12}px`,
                    animationDelay: isPlaying ? `${i * 0.04}s` : "0s",
                  }}
                />
              ))}
            </div>

            <span className="text-sm text-gray-400 font-mono">
              {isPlaying ? "▶ Playing" : "3:24"}
            </span>
          </div>

          {/* Lyrics */}
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
              Lyrics
            </h3>
            <pre className="whitespace-pre-wrap font-sans text-gray-200 leading-relaxed text-sm">
              {song.lyrics}
            </pre>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-white/10 flex flex-wrap gap-3">
            <button
              onClick={generateSong}
              className="px-4 py-2 glass-card hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors"
            >
              🔄 Regenerate
            </button>
            <a
              href="/live-duets"
              className="px-4 py-2 bg-amber-600/80 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              🎤 Perform in Live Duet
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AISongwritingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32 text-gray-400">
          <span className="w-6 h-6 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin mr-3" />
          Loading…
        </div>
      }
    >
      <SongwritingContent />
    </Suspense>
  );
}
