"use client";

import { useState } from "react";

const moodCategories = [
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "💪", label: "Motivated", value: "motivated" },
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😌", label: "Calm", value: "calm" },
  { emoji: "😰", label: "Anxious", value: "anxious" },
  { emoji: "🌟", label: "Hopeful", value: "hopeful" },
  { emoji: "🥰", label: "Romantic", value: "romantic" },
  { emoji: "😤", label: "Frustrated", value: "frustrated" },
];

const playlists: Record<string, { title: string; artist: string; duration: string; vibe: string }[]> = {
  sad: [
    { title: "The Night Will Always Win", artist: "Manchester Orchestra", duration: "4:12", vibe: "Reflective" },
    { title: "Skinny Love", artist: "Bon Iver", duration: "3:58", vibe: "Raw emotion" },
    { title: "Holocene", artist: "Bon Iver", duration: "5:37", vibe: "Bittersweet" },
    { title: "River", artist: "Joni Mitchell", duration: "4:01", vibe: "Longing" },
    { title: "Motion Picture Soundtrack", artist: "Radiohead", duration: "7:00", vibe: "Tender" },
  ],
  motivated: [
    { title: "Lose Yourself", artist: "Eminem", duration: "5:20", vibe: "Unstoppable" },
    { title: "POWER", artist: "Kanye West", duration: "4:52", vibe: "Epic" },
    { title: "Eye of the Tiger", artist: "Survivor", duration: "4:05", vibe: "Classic fire" },
    { title: "Thunder", artist: "Imagine Dragons", duration: "3:07", vibe: "High energy" },
    { title: "Stronger", artist: "Kanye West", duration: "5:11", vibe: "Triumphant" },
  ],
  happy: [
    { title: "Happy", artist: "Pharrell Williams", duration: "3:53", vibe: "Pure joy" },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "3:56", vibe: "Dance" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", vibe: "Groove" },
    { title: "Good as Hell", artist: "Lizzo", duration: "2:39", vibe: "Self-love" },
    { title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:59", vibe: "Bright" },
  ],
  calm: [
    { title: "Experience", artist: "Ludovico Einaudi", duration: "5:14", vibe: "Peaceful" },
    { title: "Breathe", artist: "Pink Floyd", duration: "2:50", vibe: "Meditative" },
    { title: "Gymnopédie No.1", artist: "Erik Satie", duration: "3:04", vibe: "Gentle" },
    { title: "The Night We Met", artist: "Lord Huron", duration: "3:28", vibe: "Nostalgic" },
    { title: "Weightless", artist: "Marconi Union", duration: "8:09", vibe: "Deep calm" },
  ],
  anxious: [
    { title: "Breathe (2 AM)", artist: "Anna Nalick", duration: "3:55", vibe: "Soothing" },
    { title: "3 AM", artist: "Matchbox Twenty", duration: "4:17", vibe: "Relatable" },
    { title: "Unwell", artist: "Matchbox Twenty", duration: "3:42", vibe: "Understood" },
    { title: "Slow Motion", artist: "Trey Songz", duration: "4:12", vibe: "Grounding" },
    { title: "Breathe Me", artist: "Sia", duration: "4:33", vibe: "Vulnerable" },
  ],
  hopeful: [
    { title: "Fix You", artist: "Coldplay", duration: "4:55", vibe: "Healing" },
    { title: "Rise Up", artist: "Andra Day", duration: "4:12", vibe: "Empowering" },
    { title: "A Sky Full of Stars", artist: "Coldplay", duration: "4:28", vibe: "Bright hope" },
    { title: "Here Comes the Sun", artist: "The Beatles", duration: "3:05", vibe: "Warm" },
    { title: "Keep Your Head Up", artist: "Ben Howard", duration: "4:36", vibe: "Encouraging" },
  ],
  romantic: [
    { title: "Perfect", artist: "Ed Sheeran", duration: "4:23", vibe: "Tender love" },
    { title: "All of Me", artist: "John Legend", duration: "4:29", vibe: "Devotion" },
    { title: "Make You Feel My Love", artist: "Adele", duration: "3:32", vibe: "Heartfelt" },
    { title: "Can't Help Falling in Love", artist: "Elvis Presley", duration: "3:00", vibe: "Classic" },
    { title: "Lover", artist: "Taylor Swift", duration: "3:41", vibe: "Sweet" },
  ],
  frustrated: [
    { title: "Break Stuff", artist: "Limp Bizkit", duration: "2:46", vibe: "Release" },
    { title: "Given Up", artist: "Linkin Park", duration: "3:09", vibe: "Cathartic" },
    { title: "Sabotage", artist: "Beastie Boys", duration: "2:59", vibe: "Raw energy" },
    { title: "Killing in the Name", artist: "Rage Against the Machine", duration: "5:14", vibe: "Fierce" },
    { title: "99 Problems", artist: "Jay-Z", duration: "3:44", vibe: "Power" },
  ],
};

const journeys = [
  {
    from: "😔 Sad",
    to: "💪 Strong",
    description: "A guided journey from sadness to strength",
    steps: ["Acknowledge", "Release", "Rise"],
    color: "from-blue-600/20 to-purple-600/20",
  },
  {
    from: "😰 Anxious",
    to: "😌 Calm",
    description: "Breathe easy with this calming progression",
    steps: ["Ground", "Breathe", "Flow"],
    color: "from-red-600/20 to-cyan-600/20",
  },
  {
    from: "😔 Sad",
    to: "🌟 Hopeful",
    description: "From darkness toward the light",
    steps: ["Feel", "Reflect", "Hope"],
    color: "from-gray-600/20 to-yellow-600/20",
  },
  {
    from: "😤 Frustrated",
    to: "😌 Peaceful",
    description: "Channel frustration into tranquility",
    steps: ["Release", "Shift", "Settle"],
    color: "from-orange-600/20 to-green-600/20",
  },
];

export default function RecommendationsPage() {
  const [selectedMood, setSelectedMood] = useState("happy");

  const tracks = playlists[selectedMood] || [];
  const selectedCategory = moodCategories.find((m) => m.value === selectedMood);

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-20">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎵</div>
          <h1 className="text-4xl font-black gradient-text mb-3">Discover Music</h1>
          <p className="text-purple-200/70">
            Curated tracks and mood journeys to match where you are right now
          </p>
        </div>

        {/* Mood selector */}
        <div className="mb-8">
          <p className="text-xs text-purple-400 uppercase tracking-widest mb-3">
            Your mood right now
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {moodCategories.map(({ emoji, label, value }) => (
              <button
                key={value}
                onClick={() => setSelectedMood(value)}
                className={`glass-card rounded-xl p-3 text-center transition-all hover:-translate-y-0.5 ${
                  selectedMood === value
                    ? "border-purple-500/60 bg-purple-600/20 -translate-y-0.5"
                    : "hover:border-purple-500/40"
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs text-purple-300">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Playlist */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-100">
              {selectedCategory?.emoji} {selectedCategory?.label} Playlist
            </h2>
            <span className="text-xs text-purple-500">{tracks.length} tracks</span>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            {tracks.map((track, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 hover:bg-purple-600/10 transition-colors border-b border-purple-900/20 last:border-0 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 text-sm font-mono group-hover:bg-purple-600/40 transition-colors flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-purple-100 text-sm truncate">{track.title}</p>
                  <p className="text-xs text-purple-400 truncate">{track.artist}</p>
                </div>
                <span className="text-xs text-purple-500 bg-purple-900/30 px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline">
                  {track.vibe}
                </span>
                <span className="text-xs text-purple-500 flex-shrink-0">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Journeys */}
        <div>
          <h2 className="text-2xl font-black gradient-text mb-2">Mood Journeys</h2>
          <p className="text-purple-300/70 text-sm mb-6">
            Let A1 guide you from one emotional space to another
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {journeys.map(({ from, to, description, steps, color }) => (
              <div
                key={`${from}-${to}`}
                className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${color} hover:-translate-y-1 transition-all cursor-pointer hover:border-purple-500/40`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-purple-300">{from}</span>
                  <span className="text-purple-500">→</span>
                  <span className="text-sm font-medium text-purple-300">{to}</span>
                </div>
                <p className="text-xs text-purple-300/70 mb-4">{description}</p>
                <div className="flex gap-2">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded-full">
                        {step}
                      </span>
                      {i < steps.length - 1 && (
                        <span className="text-purple-600/50 text-xs">·</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
