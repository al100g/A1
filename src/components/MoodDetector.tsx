'use client';

import { useState } from 'react';

type Mood = 'Happy' | 'Sad' | 'Calm' | 'Excited' | 'Hopeful' | 'Angry';

interface MoodResult {
  primary: Mood;
  scores: Record<Mood, number>;
}

const moodColors: Record<Mood, string> = {
  Happy: 'from-yellow-400 to-orange-400',
  Sad: 'from-blue-400 to-indigo-500',
  Calm: 'from-teal-400 to-cyan-400',
  Excited: 'from-orange-400 to-pink-500',
  Hopeful: 'from-purple-400 to-blue-400',
  Angry: 'from-red-500 to-orange-600',
};

const moodEmojis: Record<Mood, string> = {
  Happy: '😊',
  Sad: '😢',
  Calm: '😌',
  Excited: '🤩',
  Hopeful: '🌟',
  Angry: '😤',
};

const moodBars: Record<Mood, string> = {
  Happy: 'bg-gradient-to-r from-yellow-400 to-orange-400',
  Sad: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  Calm: 'bg-gradient-to-r from-teal-400 to-cyan-400',
  Excited: 'bg-gradient-to-r from-orange-400 to-pink-500',
  Hopeful: 'bg-gradient-to-r from-purple-400 to-blue-400',
  Angry: 'bg-gradient-to-r from-red-500 to-orange-600',
};

const MOODS: Mood[] = ['Happy', 'Sad', 'Calm', 'Excited', 'Hopeful', 'Angry'];

function analyzeMood(text: string): MoodResult {
  const lower = text.toLowerCase();

  const keywords: Record<Mood, string[]> = {
    Happy: ['happy', 'joy', 'great', 'awesome', 'wonderful', 'amazing', 'good', 'love', 'excited', 'fun', 'laugh', 'smile', 'cheer', 'delight', 'bliss', 'ecstatic', 'fantastic', 'beautiful'],
    Sad: ['sad', 'depressed', 'unhappy', 'cry', 'tears', 'grief', 'sorrow', 'lonely', 'heartbroken', 'miss', 'pain', 'hurt', 'lost', 'alone', 'hopeless', 'empty', 'down', 'blue'],
    Calm: ['calm', 'peaceful', 'relax', 'serene', 'tranquil', 'quiet', 'gentle', 'still', 'zen', 'meditat', 'breathe', 'slow', 'easy', 'mellow', 'chill', 'rest', 'comfortable'],
    Excited: ['excited', 'thrilled', 'pumped', 'energy', 'hype', 'celebrate', 'party', 'wow', 'can\'t wait', 'amazing', 'incredible', 'electric', 'rush', 'buzz', 'fire', 'lit', 'hyped'],
    Hopeful: ['hope', 'hopeful', 'optimistic', 'future', 'better', 'believe', 'dream', 'inspire', 'possible', 'forward', 'progress', 'grow', 'new', 'begin', 'chance', 'faith', 'trust'],
    Angry: ['angry', 'mad', 'furious', 'rage', 'frustrated', 'hate', 'annoyed', 'irritated', 'upset', 'outrage', 'livid', 'infuriate', 'boiling', 'fed up', 'bitter', 'resent', 'unfair'],
  };

  const rawScores: Record<Mood, number> = {
    Happy: 10,
    Sad: 10,
    Calm: 10,
    Excited: 10,
    Hopeful: 10,
    Angry: 10,
  };

  MOODS.forEach((mood) => {
    keywords[mood].forEach((kw) => {
      if (lower.includes(kw)) {
        rawScores[mood] += 20 + Math.random() * 15;
      }
    });
    // Add small random noise
    rawScores[mood] += Math.random() * 8;
  });

  const total = Object.values(rawScores).reduce((a, b) => a + b, 0);
  const scores = {} as Record<Mood, number>;
  MOODS.forEach((mood) => {
    scores[mood] = Math.round((rawScores[mood] / total) * 100);
  });

  // Ensure sums to 100
  const diff = 100 - Object.values(scores).reduce((a, b) => a + b, 0);
  scores[MOODS[0]] += diff;

  const primary = MOODS.reduce((a, b) => (scores[a] > scores[b] ? a : b));

  return { primary, scores };
}

export default function MoodDetector() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MoodResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResult(analyzeMood(text));
    setLoading(false);
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Input Area */}
      <div className="card-glass p-6">
        <label htmlFor="mood-input" className="block text-sm font-medium text-gray-300 mb-3">
          How are you feeling right now?
        </label>
        <textarea
          id="mood-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 resize-none transition-colors"
          placeholder='Try "I feel a bit uncertain but hopeful for the future..." or just describe how you feel.'
          disabled={loading}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
          <button
            type="button"
            title="Voice input – coming soon"
            className="flex items-center gap-2 text-sm text-gray-500 border border-white/10 rounded-lg px-3 py-2 cursor-not-allowed"
            disabled
            aria-label="Voice input (coming soon)"
          >
            <span>🎙️</span>
            <span>Voice Input</span>
            <span className="text-xs bg-purple-900/50 text-purple-400 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </button>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 sm:flex-none btn-secondary text-sm py-2 px-4"
              disabled={loading}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!text.trim() || loading}
              className="flex-1 sm:flex-none btn-primary text-sm py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Analyzing...' : 'Detect Mood'}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card-glass p-8 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
          </div>
          <p className="text-gray-300 font-medium">Analyzing your emotional state...</p>
          <p className="text-sm text-gray-500">Our NLP engine is processing your input</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="card-glass p-6 space-y-6">
          {/* Primary Mood */}
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Primary detected mood</p>
            <div className="inline-flex items-center gap-3 bg-white/5 rounded-2xl px-6 py-3">
              <span className="text-4xl">{moodEmojis[result.primary]}</span>
              <span
                className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${moodColors[result.primary]}`}
              >
                {result.primary}
              </span>
            </div>
          </div>

          {/* Emotion Breakdown */}
          <div>
            <p className="text-sm font-medium text-gray-300 mb-4">Emotion breakdown</p>
            <div className="space-y-3">
              {MOODS.sort((a, b) => result.scores[b] - result.scores[a]).map((mood) => (
                <div key={mood} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{moodEmojis[mood]}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">{mood}</span>
                      <span className="text-gray-400">{result.scores[mood]}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${moodBars[mood]} transition-all duration-700`}
                        style={{ width: `${result.scores[mood]}%` }}
                        role="progressbar"
                        aria-valuenow={result.scores[mood]}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
