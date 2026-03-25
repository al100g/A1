"use client";

import { useState, useMemo } from "react";
import { Mood, Genre, songSamples, moodColors, moodEmoji } from "@/data/songs";

const moods: Mood[] = ["Happy", "Sad", "Energetic", "Calm", "Anxious", "Romantic"];
const genres: Genre[] = ["Pop", "Rock", "R&B", "Electronic", "Classical", "Hip-Hop"];

export default function SongGenerator() {
  const [selectedMood, setSelectedMood] = useState<Mood>("Happy");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Pop");
  const [customTheme, setCustomTheme] = useState("");
  const [generating, setGenerating] = useState(false);
  const [song, setSong] = useState<(typeof songSamples)[Mood][Genre] | null>(null);
  const [copied, setCopied] = useState(false);

  const barHeights = useMemo(
    () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 40 + 10)),
    []
  );

  const handleGenerate = () => {
    setGenerating(true);
    setSong(null);
    setTimeout(() => {
      setSong(songSamples[selectedMood][selectedGenre]);
      setGenerating(false);
    }, 2000);
  };

  const handleCopyLyrics = () => {
    if (!song) return;
    navigator.clipboard.writeText(song.lyrics.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const colors = moodColors[selectedMood];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood Selector */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Select Mood
          </label>
          <div className="grid grid-cols-3 gap-2">
            {moods.map((mood) => {
              const mc = moodColors[mood];
              const isActive = selectedMood === mood;
              return (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? `${mc.bg} ${mc.border} ${mc.text} border`
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white border"
                  }`}
                >
                  <span className="text-xl">{moodEmoji[mood]}</span>
                  <span className="text-xs">{mood}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Genre Selector */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Select Genre
          </label>
          <div className="grid grid-cols-2 gap-2">
            {genres.map((genre) => {
              const isActive = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? "bg-violet-600/30 border-violet-500/50 text-violet-300"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional Theme */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Custom Theme <span className="text-gray-500 font-normal normal-case">(optional)</span>
        </label>
        <input
          type="text"
          value={customTheme}
          onChange={(e) => setCustomTheme(e.target.value)}
          placeholder="e.g. 'finding yourself', 'city lights', 'new beginnings'..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 text-sm"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
      >
        {generating ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Composing your song...
          </>
        ) : (
          <>
            <span>🎵</span>
            Generate Song
          </>
        )}
      </button>

      {/* Generating Animation */}
      {generating && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center space-y-4">
          <div className="flex justify-center items-end gap-1">
            {barHeights.map((height, i) => (
              <div
                key={i}
                className="w-1.5 bg-violet-500 rounded-full animate-pulse"
                style={{
                  height: `${height}px`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm">A1 AI is composing lyrics and melody...</p>
          <p className="text-gray-600 text-xs">Mood: {selectedMood} · Genre: {selectedGenre}</p>
        </div>
      )}

      {/* Song Output */}
      {song && !generating && (
        <div className={`border ${colors.border} rounded-xl overflow-hidden`}>
          {/* Header */}
          <div className={`bg-gradient-to-r ${colors.gradient} p-6`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Generated Song</p>
                <h3 className="text-white text-2xl font-black">{song.title}</h3>
                <div className="flex gap-3 mt-2">
                  <span className="text-white/80 text-xs bg-black/20 px-2 py-1 rounded-full">
                    {selectedMood} {moodEmoji[selectedMood]}
                  </span>
                  <span className="text-white/80 text-xs bg-black/20 px-2 py-1 rounded-full">
                    {selectedGenre}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCopyLyrics}
                className="text-white/80 hover:text-white bg-black/20 hover:bg-black/30 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              >
                {copied ? "✓ Copied!" : "Copy Lyrics"}
              </button>
            </div>
          </div>

          {/* Song Details */}
          <div className="bg-black/20 p-6 space-y-5">
            {/* Meta */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Tempo</p>
                <p className="text-white font-bold text-sm">{song.tempo}</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Key</p>
                <p className="text-white font-bold text-sm">{song.key}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Genre</p>
                <p className="text-white font-bold text-sm">{selectedGenre}</p>
              </div>
            </div>

            {/* Melody Description */}
            <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Melody Description
              </p>
              <p className="text-gray-200 text-sm leading-relaxed">{song.melodyDescription}</p>
            </div>

            {/* Lyrics */}
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Lyrics</p>
              <div className="bg-white/5 rounded-lg p-5 space-y-1">
                {song.lyrics.map((line, i) => (
                  <p key={i} className="text-gray-200 text-sm leading-7 italic">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                ↺ Regenerate
              </button>
              <button
                disabled
                className="flex-1 py-2.5 bg-white/5 border border-white/10 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <span>🎤</span> Sing This
                <span className="text-xs bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded-full">Soon</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
