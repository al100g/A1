'use client';

import { useState } from 'react';
import { MOOD_NAMES, GENRES, getMood } from '@/lib/moods';

interface Lyrics {
  verse1: string;
  chorus: string;
  verse2: string;
  bridge: string;
}

interface SongResult {
  title: string;
  lyrics: Lyrics;
}

export function SongWriter() {
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SongResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!mood || !genre) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/songs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, genre, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to generate song');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const moodInfo = mood ? getMood(mood) : null;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">Generate Your Song</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full bg-purple-950/70 border border-purple-700/50 rounded-xl px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select a mood…</option>
              {MOOD_NAMES.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-purple-950/70 border border-purple-700/50 rounded-xl px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select a genre…</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-purple-300 text-sm font-medium mb-2">
            Theme <span className="text-purple-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g. rainy day, new beginnings…"
            className="w-full bg-purple-950/70 border border-purple-700/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={loading || !mood || !genre}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating…' : 'Generate Lyrics'}
        </button>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="bg-slate-900/60 border border-violet-500/30 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            {moodInfo && <span className="text-3xl">{moodInfo.emoji}</span>}
            <div>
              <h3 className="text-xl font-bold text-white">{result.title}</h3>
              <p className="text-purple-400 text-sm capitalize">{mood} · {genre}</p>
            </div>
          </div>
          {(['verse1', 'chorus', 'verse2', 'bridge'] as const).map((section) => (
            <div key={section} className="mb-5">
              <h4 className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-2">
                {section === 'verse1' ? 'Verse 1' : section === 'verse2' ? 'Verse 2' : section.charAt(0).toUpperCase() + section.slice(1)}
              </h4>
              <p className="text-purple-100 leading-relaxed whitespace-pre-line">{result.lyrics[section]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
