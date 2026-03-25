'use client';

import { useState } from 'react';
import { playlists, type Mood } from '@/data/songs';
import PlaylistCard from './PlaylistCard';

const MOODS: Mood[] = ['Happy', 'Sad', 'Calm', 'Excited', 'Hopeful', 'Angry'];

const moodEmojis: Record<Mood, string> = {
  Happy: '😊',
  Sad: '😢',
  Calm: '😌',
  Excited: '🤩',
  Hopeful: '🌟',
  Angry: '😤',
};

export default function MoodPlaylist() {
  const [filter, setFilter] = useState<Mood | 'All'>('All');

  const filtered = filter === 'All' ? playlists : playlists.filter((p) => p.mood === filter);

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            filter === 'All'
              ? 'bg-purple-600 border-purple-500 text-white'
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          🎵 All ({playlists.length})
        </button>
        {MOODS.map((mood) => {
          const count = playlists.filter((p) => p.mood === mood).length;
          return (
            <button
              key={mood}
              type="button"
              onClick={() => setFilter(mood)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === mood
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {moodEmojis[mood]} {mood} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🎵</p>
          <p>No playlists found for this mood.</p>
        </div>
      )}
    </div>
  );
}
