"use client";

import { useState } from "react";

const MOOD_OPTIONS = [
  { emoji: "😢", label: "Sad", color: "border-blue-500 bg-blue-500/10 text-blue-300" },
  { emoji: "😰", label: "Anxious", color: "border-yellow-500 bg-yellow-500/10 text-yellow-300" },
  { emoji: "😌", label: "Calm", color: "border-green-500 bg-green-500/10 text-green-300" },
  { emoji: "😊", label: "Happy", color: "border-amber-500 bg-amber-500/10 text-amber-300" },
  { emoji: "🔥", label: "Energetic", color: "border-orange-500 bg-orange-500/10 text-orange-300" },
  { emoji: "💜", label: "Hopeful", color: "border-purple-500 bg-purple-500/10 text-purple-300" },
  { emoji: "😤", label: "Frustrated", color: "border-red-500 bg-red-500/10 text-red-300" },
  { emoji: "😴", label: "Tired", color: "border-slate-500 bg-slate-500/10 text-slate-300" },
];

const MOOD_SONGS: Record<string, { title: string; artist: string; snippet: string }[]> = {
  Sad: [
    { title: "Through the Rain", artist: "A1 AI", snippet: "Every cloud above me holds a silver line / I'll find my way back to the sunshine..." },
    { title: "Empty Rooms", artist: "A1 AI", snippet: "These walls remember all the words unsaid / The echoes living in my head..." },
  ],
  Anxious: [
    { title: "Breathe With Me", artist: "A1 AI", snippet: "One breath in, let the worry fade / One breath out, watch the shadows wade..." },
    { title: "Still Waters", artist: "A1 AI", snippet: "Beneath the storm there's peace below / A quiet place where worries go..." },
  ],
  Calm: [
    { title: "Golden Hour", artist: "A1 AI", snippet: "The world slows down in the golden light / Everything's right, everything's right..." },
    { title: "Morning Drift", artist: "A1 AI", snippet: "Soft like the morning mist on the lake / Peaceful in every breath I take..." },
  ],
  Happy: [
    { title: "On Top of It", artist: "A1 AI", snippet: "I'm dancing on rooftops, singing in the rain / Life is a party, catch me in the lane..." },
    { title: "Sunshine Days", artist: "A1 AI", snippet: "Every color's brighter, every song is right / Nothing can bring me down today..." },
  ],
  Energetic: [
    { title: "Fire Up", artist: "A1 AI", snippet: "We're burning bright like a thousand suns / Can't stop now, we've only just begun..." },
    { title: "Move It", artist: "A1 AI", snippet: "Feel the rhythm in your bones / Every beat takes you home..." },
  ],
  Hopeful: [
    { title: "New Horizons", artist: "A1 AI", snippet: "I can see the light beyond the hill / Tomorrow's waiting, and I feel the thrill..." },
    { title: "Almost There", artist: "A1 AI", snippet: "Every step I take is leading somewhere bright / The dawn is breaking through the night..." },
  ],
  Frustrated: [
    { title: "Let It Out", artist: "A1 AI", snippet: "I've swallowed all these words too long / Time to turn my fury into song..." },
    { title: "Rise Above", artist: "A1 AI", snippet: "I won't let them keep me down / Watch me turn this whole thing around..." },
  ],
  Tired: [
    { title: "Rest Now", artist: "A1 AI", snippet: "Lay your head down, close your eyes / Let the stars be your lullabies..." },
    { title: "Slow Down", artist: "A1 AI", snippet: "The world can wait a little while / You've earned this rest, you've walked the miles..." },
  ],
};

export default function MoodPage() {
  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function detectMoodFromText(input: string): string {
    const lower = input.toLowerCase();
    if (/sad|cry|crying|depressed|lonely|miss|grief/.test(lower)) return "Sad";
    if (/anxious|worried|nervous|scared|stress|panic/.test(lower)) return "Anxious";
    if (/happy|joy|great|amazing|wonderful|excited|love/.test(lower)) return "Happy";
    if (/calm|peace|relax|quiet|serene|content/.test(lower)) return "Calm";
    if (/tired|exhaust|sleep|worn|fatigue/.test(lower)) return "Tired";
    if (/angry|frustrat|mad|annoyed|furious/.test(lower)) return "Frustrated";
    if (/hope|optimist|better|forward|look/.test(lower)) return "Hopeful";
    if (/energe|pump|power|strong|ready|fire/.test(lower)) return "Energetic";
    return "Calm";
  }

  function handleAnalyze() {
    if (!text.trim() && !selectedMood) return;
    setLoading(true);
    setTimeout(() => {
      const mood = selectedMood ?? detectMoodFromText(text);
      setDetectedMood(mood);
      setLoading(false);
    }, 1200);
  }

  const songs = detectedMood ? MOOD_SONGS[detectedMood] ?? [] : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black text-white">
          🎭 Mood Detector
        </h1>
        <p className="text-white/60">
          Tell A1 how you&apos;re feeling and get music perfectly matched to your mood.
        </p>
      </div>

      {/* Text input */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <label className="mb-3 block text-sm font-semibold text-white/70">
          Describe how you feel right now
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I feel a bit uncertain but also hopeful for the future..."
          rows={3}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      </div>

      {/* Quick mood selector */}
      <div className="mb-8">
        <p className="mb-4 text-sm font-semibold text-white/70">
          Or quickly pick your mood:
        </p>
        <div className="grid grid-cols-4 gap-3">
          {MOOD_OPTIONS.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(selectedMood === m.label ? null : m.label)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center text-xs font-semibold transition ${
                selectedMood === m.label
                  ? m.color
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={loading || (!text.trim() && !selectedMood)}
        className="mb-10 w-full rounded-xl bg-purple-600 py-4 text-base font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
      >
        {loading ? "Analyzing your mood…" : "Detect My Mood & Get Songs →"}
      </button>

      {/* Results */}
      {detectedMood && !loading && (
        <div>
          <div className="mb-6 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 text-center">
            <p className="text-sm text-white/60">A1 detected your mood as</p>
            <p className="text-2xl font-black text-purple-300">
              {MOOD_OPTIONS.find((m) => m.label === detectedMood)?.emoji}{" "}
              {detectedMood}
            </p>
          </div>

          <h2 className="mb-4 text-lg font-bold text-white">
            Songs curated for you
          </h2>
          <div className="flex flex-col gap-4">
            {songs.map((song) => (
              <div
                key={song.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-lg">
                    🎵
                  </div>
                  <div>
                    <p className="font-bold text-white">{song.title}</p>
                    <p className="text-xs text-white/50">{song.artist}</p>
                  </div>
                </div>
                <p className="text-sm italic text-white/60">&quot;{song.snippet}&quot;</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/create"
              className="inline-block rounded-xl bg-pink-600 px-8 py-3 font-bold text-white transition hover:bg-pink-500"
            >
              Create a Custom Song for This Mood →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
