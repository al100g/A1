'use client';

import { useState } from 'react';
import type { Playlist } from '@/data/songs';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-glass overflow-hidden group hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
      {/* Album Art */}
      <div
        className="h-40 relative flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${playlist.gradientFrom}, ${playlist.gradientTo})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <span className="relative text-5xl">🎵</span>
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all shadow-lg opacity-0 group-hover:opacity-100"
          aria-label={playing ? 'Pause playlist' : 'Play playlist'}
        >
          {playing ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        {playing && (
          <div className="absolute bottom-3 left-3 flex items-end gap-0.5 h-5">
            {[1, 2, 3, 4].map((b) => (
              <div
                key={b}
                className="w-1 bg-white rounded-full waveform-bar"
                style={{ animationDelay: `${b * 0.1}s`, height: '100%' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-white leading-tight">{playlist.name}</h3>
          <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded-full whitespace-nowrap">
            {playlist.mood}
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-3 line-clamp-2">{playlist.description}</p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>🎵 {playlist.trackCount} tracks</span>
          <span>⏱ {playlist.duration}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {playlist.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Track List Toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors w-full text-left"
        >
          {expanded ? '▲ Hide tracks' : '▾ Show tracks'}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {playlist.tracks.map((track, index) => (
              <div
                key={track.title}
                className="flex items-center gap-3 text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-2"
              >
                <span className="text-gray-600 w-4">{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-200 font-medium truncate">{track.title}</p>
                  <p className="text-gray-500 truncate">{track.artist}</p>
                </div>
                <span className="text-gray-500 font-mono">{track.duration}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
