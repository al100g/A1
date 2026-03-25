"use client";

import { useState } from "react";
import { Mood, moodColors, moodEmoji, playlists } from "@/data/songs";
import PlaylistCard from "@/components/PlaylistCard";

type Filter = "All" | Mood;
const filters: Filter[] = ["All", "Happy", "Sad", "Energetic", "Calm", "Romantic", "Anxious"];

export default function MoodPlaylist() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = activeFilter === "All"
    ? playlists
    : playlists.filter((p) => p.mood === activeFilter);

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          const colors = filter !== "All" ? moodColors[filter as Mood] : null;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                isActive
                  ? colors
                    ? `${colors.bg} ${colors.border} ${colors.text}`
                    : "bg-violet-600/20 border-violet-500/40 text-violet-300"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {filter !== "All" && <span>{moodEmoji[filter as Mood]}</span>}
              {filter}
            </button>
          );
        })}
      </div>

      {/* Playlist Count */}
      <p className="text-gray-500 text-sm">
        {filtered.length} playlist{filtered.length !== 1 ? "s" : ""}
        {activeFilter !== "All" && ` for ${activeFilter} mood`}
      </p>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((playlist) => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </div>
    </div>
  );
}
