"use client";

import { useState } from "react";
import { Mood, moodColors, moodEmoji } from "@/data/songs";

const moods: Mood[] = ["Happy", "Sad", "Energetic", "Calm", "Anxious", "Romantic"];

const moodKeywords: Record<Mood, string[]> = {
  Happy: ["happy", "joy", "great", "wonderful", "excited", "love", "amazing", "fantastic", "good", "smile", "laugh"],
  Sad: ["sad", "depressed", "cry", "miss", "lonely", "hurt", "pain", "broken", "lost", "grief", "tears"],
  Energetic: ["energy", "pump", "hype", "workout", "run", "power", "strong", "fire", "intense", "motivated", "active"],
  Calm: ["calm", "peace", "relax", "quiet", "serene", "gentle", "breathe", "still", "soft", "rest", "meditate"],
  Anxious: ["anxious", "worry", "stress", "nervous", "panic", "overwhelmed", "fear", "tense", "uneasy", "restless"],
  Romantic: ["love", "romance", "crush", "heart", "beautiful", "sweet", "tender", "together", "kiss", "desire"],
};

function detectMoodFromText(text: string): { mood: Mood; scores: Record<Mood, number> } {
  const lower = text.toLowerCase();
  const scores = {} as Record<Mood, number>;
  moods.forEach((mood) => {
    scores[mood] = moodKeywords[mood].filter((kw) => lower.includes(kw)).length;
  });
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    const rand = moods[Math.floor(Math.random() * moods.length)];
    scores[rand] = 1;
    return { mood: rand, scores };
  }
  const detected = (Object.entries(scores) as [Mood, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
  return { mood: detected, scores };
}

function normalizeScores(scores: Record<Mood, number>): Record<Mood, number> {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const base: Record<string, number> = {};
  moods.forEach((m, i) => {
    base[m] = Math.max(5, Math.round(((scores[m] + (i % 3) * 0.5) / (total + 2)) * 100));
  });
  const sum = Object.values(base).reduce((a, b) => a + b, 0);
  const scale = 100 / sum;
  moods.forEach((m) => { base[m] = Math.round(base[m] * scale); });
  return base as Record<Mood, number>;
}

export default function MoodDetector() {
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ mood: Mood; scores: Record<Mood, number> } | null>(null);

  const handleDetect = () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const detection = detectMoodFromText(text);
      detection.scores = normalizeScores(detection.scores);
      setResult(detection);
      setAnalyzing(false);
    }, 1500);
  };

  const colors = result ? moodColors[result.mood] : null;

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe how you're feeling right now... (e.g. 'I feel so energetic and ready to take on the world!' or 'I've been feeling really anxious about work lately')"
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 text-sm leading-relaxed"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-600">
            {text.length} chars
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleDetect}
            disabled={analyzing || !text.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
          >
            {analyzing ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <span>🎭</span>
                Detect My Mood
              </>
            )}
          </button>

          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-500 font-semibold rounded-xl cursor-not-allowed relative group"
          >
            <span>🎙️</span>
            Voice Input
            <span className="ml-1 text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">
              Soon
            </span>
          </button>
        </div>
      </div>

      {/* Analyzing animation */}
      {analyzing && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center space-y-4">
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 rounded-full bg-violet-500 animate-bounce"
                style={{ height: `${20 + i * 8}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm">AI is analyzing your emotional state...</p>
        </div>
      )}

      {/* Result */}
      {result && colors && (
        <div className={`border ${colors.border} ${colors.bg} rounded-xl p-6 space-y-5 animate-in fade-in duration-500`}>
          {/* Main Mood */}
          <div className="flex items-center gap-4">
            <div className="text-5xl">{moodEmoji[result.mood]}</div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Detected Mood</p>
              <p className={`text-3xl font-black ${colors.text}`}>{result.mood}</p>
            </div>
          </div>

          {/* Percentage Breakdown */}
          <div className="space-y-3">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Emotion Breakdown</p>
            {(Object.entries(result.scores) as [Mood, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([mood, score]) => {
                const mc = moodColors[mood];
                return (
                  <div key={mood} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300 flex items-center gap-1.5">
                        <span>{moodEmoji[mood]}</span> {mood}
                      </span>
                      <span className={`text-sm font-bold ${mc.text}`}>{score}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${mc.gradient} rounded-full transition-all duration-700`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="pt-2 border-t border-white/10">
            <p className="text-gray-500 text-xs">
              Based on your input, A1&apos;s AI detected a primarily{" "}
              <span className={colors.text}>{result.mood}</span> emotional state.
              Try our{" "}
              <a href="/ai-songwriting" className="text-violet-400 hover:text-violet-300 underline">
                AI Songwriting
              </a>{" "}
              or{" "}
              <a href="/mood-playlists" className="text-violet-400 hover:text-violet-300 underline">
                Mood Playlists
              </a>{" "}
              for this mood.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
