'use client';

import { useState } from 'react';
import { getMood, MOODS } from '@/lib/moods';

interface MoodResult {
  mood: string;
  confidence: number;
  suggestions: string[];
}

export function MoodDetector() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MoodResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/mood/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to analyze mood');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const mood = result ? getMood(result.mood) : null;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-3">How are you feeling today?</h2>
        <p className="text-purple-300 mb-4">
          Describe your current mood in a few sentences and our AI will analyze your emotional state.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[120px] rounded-xl border border-purple-700/50 bg-purple-950/70 px-4 py-3 text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          placeholder="I feel..."
        />
        <button
          type="button"
          onClick={analyze}
          disabled={loading || !text.trim()}
          className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing…' : 'Analyze Mood'}
        </button>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </div>

      {result && mood && (
        <div className={`rounded-2xl border p-6 ${mood.bgColor} border-purple-500/30`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{mood.emoji}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{mood.name}</h3>
              <p className="text-purple-300 text-sm">{mood.description}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-purple-300 text-sm">Confidence</p>
              <p className="text-white font-bold">{Math.round(result.confidence * 100)}%</p>
            </div>
          </div>
          <div className="w-full bg-purple-900/50 rounded-full h-2 mb-4">
            <div
              className="bg-violet-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
          {result.suggestions.length > 0 && (
            <div>
              <p className="text-purple-300 text-sm font-medium mb-2">Suggestions:</p>
              <ul className="space-y-1">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-purple-200 text-sm flex items-start gap-2">
                    <span className="text-violet-400 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-4">
        <p className="text-purple-400 text-sm font-medium mb-3">Detectable moods:</p>
        <div className="flex flex-wrap gap-2">
          {Object.values(MOODS).map((m) => (
            <span
              key={m.name}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${m.bgColor} ${m.color}`}
            >
              {m.emoji} {m.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
