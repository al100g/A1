"use client";

import { useState } from "react";

type Mood = {
  label: string;
  emoji: string;
  intensity: number;
  keywords: string[];
  color: string;
};

const EXAMPLE_PROMPTS = [
  "I feel absolutely amazing today! Everything is going perfectly.",
  "I'm so sad and lonely, missing the people I care about.",
  "I'm pumped up and ready to conquer the world!",
  "Just want to relax and enjoy some peaceful quiet time.",
  "I'm deeply in love and feeling so romantic tonight.",
  "Feeling nostalgic and a bit wistful about the past.",
];

export default function MoodDetectionPage() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<Mood | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyzeMood() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setMood(null);

    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setMood(data.mood);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🎭</div>
        <h1 className="text-4xl font-black text-white mb-4">Mood Detection</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Tell us how you&apos;re feeling in your own words. Our AI analyzes the
          emotional tone of your text to identify your current mood with
          precision.
        </p>
      </div>

      {/* Input Section */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          How are you feeling right now?
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your mood, thoughts, or feelings… e.g. 'I feel so happy today, everything is going great!'"
          className="w-full h-36 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
          maxLength={2000}
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500">{text.length}/2000</span>
          <button
            onClick={analyzeMood}
            disabled={!text.trim() || loading}
            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing…
              </span>
            ) : (
              "Analyze My Mood"
            )}
          </button>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-3">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setText(prompt)}
              className="text-xs px-3 py-1.5 rounded-full glass-card hover:bg-white/10 text-gray-400 hover:text-white transition-colors truncate max-w-xs"
            >
              &ldquo;{prompt.slice(0, 40)}…&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {/* Result */}
      {mood && (
        <div className="glass-card rounded-2xl p-8 text-center">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${mood.color} text-5xl mb-6 float`}
          >
            {mood.emoji}
          </div>
          <h2 className="text-3xl font-black text-white mb-2">{mood.label}</h2>
          <p className="text-gray-400 mb-6">Detected emotional state</p>

          {/* Intensity Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Intensity</span>
              <span>{mood.intensity}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${mood.color} rounded-full transition-all duration-1000`}
                style={{ width: `${mood.intensity}%` }}
              />
            </div>
          </div>

          {/* Keywords */}
          <div>
            <p className="text-sm text-gray-400 mb-3">Detected signals</p>
            <div className="flex flex-wrap justify-center gap-2">
              {mood.keywords.slice(0, 5).map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full bg-white/10 text-sm text-white"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`/ai-songwriting?mood=${mood.label.toLowerCase()}`}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              🎵 Generate a Song for This Mood
            </a>
            <a
              href={`/mood-playlists?mood=${mood.label.toLowerCase()}`}
              className="px-6 py-3 glass-card hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              🎧 Find Matching Playlist
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
