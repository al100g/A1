"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  energy: number;
};

type Playlist = {
  name: string;
  mood: string;
  trackCount: number;
  tracks: Track[];
};

const MOOD_OPTIONS = [
  { value: "happy", label: "Happy", emoji: "😊", gradient: "from-yellow-500 to-amber-500" },
  { value: "sad", label: "Sad", emoji: "😢", gradient: "from-blue-500 to-indigo-500" },
  { value: "energetic", label: "Energetic", emoji: "⚡", gradient: "from-red-500 to-orange-500" },
  { value: "calm", label: "Calm", emoji: "🌿", gradient: "from-emerald-500 to-teal-500" },
  { value: "romantic", label: "Romantic", emoji: "💕", gradient: "from-pink-500 to-rose-500" },
  { value: "melancholic", label: "Melancholic", emoji: "🌧️", gradient: "from-purple-500 to-indigo-600" },
];

function PlaylistContent() {
  const searchParams = useSearchParams();
  const [activeMood, setActiveMood] = useState(searchParams.get("mood") ?? "happy");
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function fetchPlaylist(mood: string) {
    setLoading(true);
    setCurrentTrack(null);
    setIsPlaying(false);
    try {
      const res = await fetch(`/api/playlist?mood=${encodeURIComponent(mood)}`);
      const data = await res.json();
      setPlaylist(data.playlist);
    } catch {
      // fallback: playlist stays null
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlaylist(activeMood);
  }, [activeMood]);

  useEffect(() => {
    const moodParam = searchParams.get("mood");
    if (moodParam) setActiveMood(moodParam);
  }, [searchParams]);

  function playTrack(track: Track) {
    if (currentTrack?.id === track.id) {
      setIsPlaying((p) => !p);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }

  const activeMoodOption = MOOD_OPTIONS.find((m) => m.value === activeMood);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🎧</div>
        <h1 className="text-4xl font-black text-white mb-4">Mood Playlists</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Discover AI-curated tracks that resonate with your emotional state.
          Our playlists evolve with your mood throughout the day.
        </p>
      </div>

      {/* Mood Selector */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
        {MOOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveMood(opt.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-105 ${
              activeMood === opt.value
                ? `bg-gradient-to-br ${opt.gradient} shadow-lg`
                : "glass-card hover:bg-white/10"
            }`}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-xs font-medium text-white">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Playlist */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-gray-400">
          <span className="w-6 h-6 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin mr-3" />
          Curating your playlist…
        </div>
      ) : playlist ? (
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Playlist Header */}
          <div
            className={`bg-gradient-to-r ${activeMoodOption?.gradient ?? "from-violet-600 to-pink-600"}/30 p-6 border-b border-white/10`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeMoodOption?.gradient} flex items-center justify-center text-4xl shadow-xl`}
              >
                {activeMoodOption?.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{playlist.name}</h2>
                <p className="text-gray-400 mt-1">
                  {playlist.trackCount} tracks · AI-curated for your mood
                </p>
              </div>
            </div>

            {/* Shuffle / Play All controls */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  if (playlist.tracks.length > 0) {
                    setCurrentTrack(playlist.tracks[0]);
                    setIsPlaying(true);
                  }
                }}
                className="px-5 py-2.5 bg-white text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                ▶ Play All
              </button>
              <button
                onClick={() => {
                  const random = playlist.tracks[Math.floor(Math.random() * playlist.tracks.length)];
                  setCurrentTrack(random);
                  setIsPlaying(true);
                }}
                className="px-5 py-2.5 glass-card hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition-colors flex items-center gap-2"
              >
                🔀 Shuffle
              </button>
            </div>
          </div>

          {/* Track List */}
          <div>
            {playlist.tracks.map((track, idx) => (
              <div
                key={track.id}
                className={`flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer group ${
                  currentTrack?.id === track.id ? "bg-white/5" : ""
                }`}
                onClick={() => playTrack(track)}
              >
                {/* Track Number / Play Icon */}
                <div className="w-8 text-center">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <div className="flex items-center justify-center gap-0.5 h-5">
                      {[1, 2, 3].map((b) => (
                        <div
                          key={b}
                          className="w-0.5 bg-green-400 wave-bar rounded-full"
                          style={{ height: "14px", animationDelay: `${b * 0.1}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-500 text-sm group-hover:hidden">
                        {idx + 1}
                      </span>
                      <span className="text-white text-sm hidden group-hover:block">
                        ▶
                      </span>
                    </>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium truncate ${
                      currentTrack?.id === track.id
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {track.title}
                  </p>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                </div>

                {/* Genre */}
                <div className="hidden md:block text-sm text-gray-500 truncate max-w-32">
                  {track.genre}
                </div>

                {/* Energy Bar */}
                <div className="hidden md:flex items-center gap-2 w-24">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${activeMoodOption?.gradient} rounded-full`}
                      style={{ width: `${track.energy}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{track.energy}</span>
                </div>

                {/* Duration */}
                <div className="text-sm text-gray-400 w-10 text-right">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeMoodOption?.gradient} flex items-center justify-center text-lg flex-shrink-0`}
            >
              {activeMoodOption?.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white text-sm truncate">
                {currentTrack.title}
              </p>
              <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
            </div>

            {/* Playback controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const idx = playlist?.tracks.findIndex((t) => t.id === currentTrack.id) ?? 0;
                  const prev = playlist?.tracks[Math.max(0, idx - 1)];
                  if (prev) setCurrentTrack(prev);
                }}
                className="text-gray-400 hover:text-white transition-colors text-lg"
                aria-label="Previous track"
              >
                ⏮
              </button>
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center text-sm font-bold hover:bg-gray-100 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                onClick={() => {
                  const idx = playlist?.tracks.findIndex((t) => t.id === currentTrack.id) ?? 0;
                  const next = playlist?.tracks[Math.min((playlist?.tracks.length ?? 1) - 1, idx + 1)];
                  if (next) setCurrentTrack(next);
                }}
                className="text-gray-400 hover:text-white transition-colors text-lg"
                aria-label="Next track"
              >
                ⏭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MoodPlaylistsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32 text-gray-400">
          <span className="w-6 h-6 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin mr-3" />
          Loading…
        </div>
      }
    >
      <PlaylistContent />
    </Suspense>
  );
}
