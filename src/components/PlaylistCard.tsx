"use client";

import { useState } from "react";
import { Mood, moodColors, moodEmoji } from "@/data/songs";

interface PlaylistCardProps {
  id: number;
  name: string;
  mood: Mood;
  tracks: number;
  duration: string;
  gradient: string;
  description: string;
}

export default function PlaylistCard({
  name,
  mood,
  tracks,
  duration,
  gradient,
  description,
}: PlaylistCardProps) {
  const [playing, setPlaying] = useState(false);
  const colors = moodColors[mood];

  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1">
      {/* Cover Art */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-8 -left-8" />
        <div className="absolute w-24 h-24 rounded-full bg-white/10 -bottom-6 -right-6" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Vinyl-like design */}
          <div className="w-20 h-20 rounded-full bg-black/30 flex items-center justify-center border-2 border-white/20 shadow-2xl">
            <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black/50" />
            </div>
          </div>
        </div>

        {/* Play button overlay */}
        <button
          onClick={() => setPlaying(!playing)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            {playing ? (
              <span className="flex gap-0.5">
                <span className="w-1 h-4 bg-gray-900 rounded-full" />
                <span className="w-1 h-4 bg-gray-900 rounded-full" />
              </span>
            ) : (
              <span className="text-gray-900 text-lg ml-0.5">▶</span>
            )}
          </div>
        </button>

        {/* Mood badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1 ${colors.bg} border ${colors.border} px-2 py-1 rounded-full`}>
          <span className="text-xs">{moodEmoji[mood]}</span>
          <span className={`text-xs font-medium ${colors.text}`}>{mood}</span>
        </div>

        {/* Playing indicator */}
        {playing && (
          <div className="absolute top-3 right-3 flex items-end gap-0.5 h-5">
            {[3, 5, 4, 6, 3].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-white rounded-full animate-bounce"
                style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-white font-bold text-base leading-tight">{name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-gray-500 text-xs">{tracks} tracks</span>
          <span className="text-gray-500 text-xs">{duration}</span>
        </div>
      </div>
    </div>
  );
}
