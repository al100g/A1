'use client';

import { useState } from 'react';
import { songs, type Mood, type Genre, type Song } from '@/data/songs';

const MOODS: Mood[] = ['Happy', 'Sad', 'Calm', 'Excited', 'Hopeful', 'Angry'];
const GENRES: Genre[] = ['Pop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Acoustic'];

const moodEmojis: Record<Mood, string> = {
  Happy: '😊',
  Sad: '😢',
  Calm: '😌',
  Excited: '🤩',
  Hopeful: '🌟',
  Angry: '😤',
};

const genreEmojis: Record<Genre, string> = {
  Pop: '🎤',
  Rock: '🎸',
  Jazz: '🎷',
  Classical: '🎻',
  Electronic: '🎹',
  Acoustic: '🪕',
};

const moodColors: Record<Mood, string> = {
  Happy: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
  Sad: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
  Calm: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
  Excited: 'from-orange-500/20 to-pink-500/20 border-orange-500/30',
  Hopeful: 'from-purple-500/20 to-blue-500/20 border-purple-500/30',
  Angry: 'from-red-500/20 to-orange-600/20 border-red-500/30',
};

export default function SongGenerator() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [generatedSong, setGeneratedSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(false);
  const [lyricsExpanded, setLyricsExpanded] = useState(false);

  const handleGenerate = async () => {
    if (!selectedMood || !selectedGenre) return;
    setLoading(true);
    setGeneratedSong(null);
    setLyricsExpanded(false);
    await new Promise((r) => setTimeout(r, 1200));
    const song = songs.find((s) => s.mood === selectedMood && s.genre === selectedGenre);
    setGeneratedSong(song ?? null);
    setLoading(false);
  };

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Mood Selector */}
      <div className="card-glass p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">1. Select Your Mood</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOODS.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => setSelectedMood(mood)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                selectedMood === mood
                  ? `bg-gradient-to-br ${moodColors[mood]} border-opacity-100 scale-105 shadow-lg`
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              aria-pressed={selectedMood === mood}
            >
              <span className="text-2xl">{moodEmojis[mood]}</span>
              <span className="text-xs font-medium text-gray-200">{mood}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Genre Selector */}
      <div className="card-glass p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">2. Select Genre</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                selectedGenre === genre
                  ? 'bg-gradient-to-br from-purple-600/30 to-violet-600/30 border-purple-400/60 scale-105 shadow-lg shadow-purple-900/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              aria-pressed={selectedGenre === genre}
            >
              <span className="text-2xl">{genreEmojis[genre]}</span>
              <span className="text-xs font-medium text-gray-200">{genre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!selectedMood || !selectedGenre || loading}
          className="btn-primary px-10 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Composing your song...
            </span>
          ) : (
            '✨ Generate Song'
          )}
        </button>
      </div>

      {/* Generated Song Display */}
      {generatedSong && (
        <div className={`card-glass p-6 bg-gradient-to-br ${moodColors[generatedSong.mood]} border`}>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full">
                  {generatedSong.mood}
                </span>
                <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                  {generatedSong.genre}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{generatedSong.title}</h3>
            </div>
            <button
              type="button"
              onClick={() => togglePlay(generatedSong.id)}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors shadow-lg shadow-purple-900/50"
              aria-label={playingId === generatedSong.id ? 'Pause' : 'Play'}
            >
              {playingId === generatedSong.id ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Waveform (visual only when playing) */}
          {playingId === generatedSong.id && (
            <div className="flex items-end gap-1 h-10 mb-6 px-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-purple-400/60 rounded-full waveform-bar"
                  style={{
                    height: `${30 + Math.sin(i * 0.8) * 20}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Song Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Tempo', value: generatedSong.tempo },
              { label: 'Key', value: generatedSong.key },
              { label: 'Genre', value: generatedSong.genre },
              { label: 'Duration', value: generatedSong.duration },
            ].map((meta) => (
              <div key={meta.label} className="bg-black/20 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{meta.label}</p>
                <p className="text-sm font-semibold text-white">{meta.value}</p>
              </div>
            ))}
          </div>

          {/* Melody Description */}
          <div className="bg-black/20 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 mb-1">🎶 Melody Description</p>
            <p className="text-sm text-gray-200">{generatedSong.melodyDescription}</p>
          </div>

          {/* Lyrics */}
          <div className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400">📝 Lyrics</p>
              <button
                type="button"
                onClick={() => setLyricsExpanded(!lyricsExpanded)}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                {lyricsExpanded ? 'Show less' : 'Show all'}
              </button>
            </div>
            <pre
              className={`text-sm text-gray-200 whitespace-pre-wrap font-sans leading-relaxed ${
                !lyricsExpanded ? 'line-clamp-6' : ''
              }`}
            >
              {generatedSong.lyrics}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
