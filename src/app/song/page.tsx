"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SongData {
  title: string;
  mood: string;
  emotion: string;
  genre: string;
  lyrics: {
    verse1: string;
    chorus: string;
    verse2: string;
    bridge: string;
  };
  theme: string;
}

function SongContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [song, setSong] = useState<SongData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSinging, setIsSinging] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const mood = searchParams.get("mood") || "";
  const emotion = searchParams.get("emotion") || "";
  const intensity = searchParams.get("intensity") || "";
  const input = searchParams.get("input") || "";

  const generateSong = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, emotion, intensity, input }),
      });
      if (!res.ok) throw new Error("Failed to generate song");
      const data = await res.json();
      setSong(data);
    } catch {
      setError("Couldn't create your song right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [mood, emotion, intensity, input]);

  useEffect(() => {
    if (!input) {
      router.push("/mood");
      return;
    }
    generateSong();
  }, [input, router, generateSong]);

  const handleSing = async () => {
    if (!song) return;
    setIsSinging(true);
    setError("");
    try {
      const lyricsText = [
        `[Verse 1]\n${song.lyrics.verse1}`,
        `[Chorus]\n${song.lyrics.chorus}`,
        `[Verse 2]\n${song.lyrics.verse2}`,
        `[Bridge]\n${song.lyrics.bridge}`,
        `[Chorus]\n${song.lyrics.chorus}`,
      ].join("\n\n");

      const res = await fetch("/api/sing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lyrics: lyricsText, mood }),
      });
      if (!res.ok) throw new Error("Failed to generate audio");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      const audio = new Audio(url);
      audio.onended = () => setIsPlaying(false);
      setAudioElement(audio);
      audio.play();
      setIsPlaying(true);
    } catch {
      setError("Couldn't generate audio right now. Please try again.");
    } finally {
      setIsSinging(false);
    }
  };

  const togglePlayback = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const copyLyrics = () => {
    if (!song) return;
    const text = [
      `${song.title}\n`,
      `[Verse 1]\n${song.lyrics.verse1}`,
      `[Chorus]\n${song.lyrics.chorus}`,
      `[Verse 2]\n${song.lyrics.verse2}`,
      `[Bridge]\n${song.lyrics.bridge}`,
      `[Chorus]\n${song.lyrics.chorus}`,
    ].join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-float mb-6">🎼</div>
          <h2 className="text-2xl font-bold gradient-text mb-2">
            Composing Your Song…
          </h2>
          <p className="text-purple-300/70 mb-6">
            A1 is crafting lyrics just for you
          </p>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && !song) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center glass-card rounded-2xl p-10 max-w-md">
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-xl font-bold text-purple-100 mb-2">
            Something went wrong
          </h2>
          <p className="text-purple-300/70 mb-6">{error}</p>
          <button onClick={generateSong} className="btn-primary px-6 py-3 rounded-xl text-white font-bold">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 pt-10 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-float">🎵</div>
          {song && (
            <>
              <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-2">
                {song.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                <span className="glass-card px-3 py-1 rounded-full text-xs text-purple-300">
                  {song.mood}
                </span>
                <span className="glass-card px-3 py-1 rounded-full text-xs text-purple-300">
                  {song.emotion}
                </span>
                <span className="glass-card px-3 py-1 rounded-full text-xs text-purple-300">
                  {song.genre}
                </span>
              </div>
              <p className="text-purple-300/60 text-sm italic">&ldquo;{song.theme}&rdquo;</p>
            </>
          )}
        </div>

        {/* Lyrics */}
        {song && (
          <div className="glass-card rounded-2xl p-6 mb-6 space-y-6">
            {[
              { label: "Verse 1", text: song.lyrics.verse1 },
              { label: "Chorus", text: song.lyrics.chorus },
              { label: "Verse 2", text: song.lyrics.verse2 },
              { label: "Bridge", text: song.lyrics.bridge },
              { label: "Chorus", text: song.lyrics.chorus },
            ].map(({ label, text }, i) => (
              <div key={i}>
                <p className="text-xs font-mono text-purple-500 uppercase tracking-widest mb-2">
                  [{label}]
                </p>
                <p className="text-purple-100 leading-relaxed whitespace-pre-line text-sm">
                  {text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {audioUrl ? (
            <button
              onClick={togglePlayback}
              className="btn-primary flex-1 py-4 rounded-2xl text-white font-bold text-lg"
            >
              {isPlaying ? "⏸ Pause A1" : "▶ Play A1"}
            </button>
          ) : (
            <button
              onClick={handleSing}
              disabled={isSinging}
              className="btn-primary flex-1 py-4 rounded-2xl text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSinging ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  A1 is singing…
                </span>
              ) : (
                "🎤 Have A1 Sing It"
              )}
            </button>
          )}

          <button
            onClick={copyLyrics}
            className="btn-secondary flex-1 py-4 rounded-2xl text-purple-200 font-bold"
          >
            {copied ? "✅ Copied!" : "📋 Copy Lyrics"}
          </button>
        </div>

        {audioUrl && (
          <div className="mb-4 text-center">
            <a
              href={audioUrl}
              download="a1-song.mp3"
              className="text-sm text-purple-400 hover:text-purple-300 underline"
            >
              ⬇ Download Audio
            </a>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/mood"
            className="btn-secondary flex-1 py-3 rounded-xl text-purple-200 font-medium text-center"
          >
            ← New Mood
          </Link>
          <button
            onClick={generateSong}
            className="btn-secondary flex-1 py-3 rounded-xl text-purple-200 font-medium"
          >
            🔄 Regenerate
          </button>
          <Link
            href="/recommendations"
            className="btn-secondary flex-1 py-3 rounded-xl text-purple-200 font-medium text-center"
          >
            Discover Music →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SongPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl animate-float mb-4">🎼</div>
            <p className="gradient-text font-bold">Loading…</p>
          </div>
        </div>
      }
    >
      <SongContent />
    </Suspense>
  );
}
