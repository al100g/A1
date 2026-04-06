import Link from "next/link";

const PLAYLISTS = [
  {
    id: "morning-energy",
    emoji: "☀️",
    title: "Morning Energy",
    mood: "Energetic",
    color: "from-amber-500 to-orange-600",
    description: "Start your day right with high-energy anthems that fuel your fire.",
    songs: [
      { title: "Rise & Grind", artist: "A1 AI", duration: "3:24" },
      { title: "Power Move", artist: "A1 AI", duration: "2:58" },
      { title: "New Day, New Win", artist: "A1 AI", duration: "3:41" },
      { title: "On Fire", artist: "A1 AI", duration: "3:15" },
      { title: "Unstoppable", artist: "A1 AI", duration: "4:02" },
    ],
  },
  {
    id: "late-night-feels",
    emoji: "🌙",
    title: "Late Night Feels",
    mood: "Calm",
    color: "from-indigo-500 to-purple-700",
    description: "Slow down and drift into the night with soothing, introspective sounds.",
    songs: [
      { title: "3am Thoughts", artist: "A1 AI", duration: "4:12" },
      { title: "Quiet Storm", artist: "A1 AI", duration: "3:50" },
      { title: "Starlight", artist: "A1 AI", duration: "3:27" },
      { title: "Night Drift", artist: "A1 AI", duration: "5:03" },
      { title: "Whisper", artist: "A1 AI", duration: "3:44" },
    ],
  },
  {
    id: "healing-vibes",
    emoji: "💜",
    title: "Healing Vibes",
    mood: "Hopeful",
    color: "from-purple-500 to-pink-600",
    description: "Songs that hold space for your pain and guide you toward the light.",
    songs: [
      { title: "Through the Rain", artist: "A1 AI", duration: "4:05" },
      { title: "Almost There", artist: "A1 AI", duration: "3:33" },
      { title: "New Horizons", artist: "A1 AI", duration: "3:18" },
      { title: "Breathe Again", artist: "A1 AI", duration: "4:47" },
      { title: "Better Days", artist: "A1 AI", duration: "3:55" },
    ],
  },
  {
    id: "heartbreak-anthology",
    emoji: "💔",
    title: "Heartbreak Anthology",
    mood: "Sad",
    color: "from-blue-500 to-slate-700",
    description: "Sometimes you just need music that understands the ache.",
    songs: [
      { title: "Empty Rooms", artist: "A1 AI", duration: "4:22" },
      { title: "Missing You", artist: "A1 AI", duration: "3:48" },
      { title: "What Was Ours", artist: "A1 AI", duration: "3:59" },
      { title: "Letting Go", artist: "A1 AI", duration: "4:11" },
      { title: "One Last Time", artist: "A1 AI", duration: "3:35" },
    ],
  },
  {
    id: "focus-flow",
    emoji: "🎯",
    title: "Focus Flow",
    mood: "Calm",
    color: "from-teal-500 to-cyan-600",
    description: "Instrumental-style tracks to help you lock in and get things done.",
    songs: [
      { title: "Deep Work", artist: "A1 AI", duration: "6:02" },
      { title: "Flow State", artist: "A1 AI", duration: "5:44" },
      { title: "In the Zone", artist: "A1 AI", duration: "4:58" },
      { title: "Clear Mind", artist: "A1 AI", duration: "5:21" },
      { title: "Laser Focus", artist: "A1 AI", duration: "4:33" },
    ],
  },
  {
    id: "confidence-boost",
    emoji: "👑",
    title: "Confidence Boost",
    mood: "Energetic",
    color: "from-rose-500 to-red-600",
    description: "Walk into any room like you own it. These tracks make it happen.",
    songs: [
      { title: "Royalty", artist: "A1 AI", duration: "3:28" },
      { title: "Main Character", artist: "A1 AI", duration: "3:14" },
      { title: "I Am That", artist: "A1 AI", duration: "2:57" },
      { title: "Level Up", artist: "A1 AI", duration: "3:42" },
      { title: "Boss Mode", artist: "A1 AI", duration: "3:19" },
    ],
  },
];

export default function PlaylistsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black text-white">🎵 Mood Playlists</h1>
        <p className="text-white/60">
          Handcrafted playlists for every emotional state. Let A1 set the vibe.
        </p>
      </div>

      {/* Playlist grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLAYLISTS.map((pl) => (
          <div
            key={pl.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20"
          >
            {/* Header */}
            <div
              className={`flex items-center gap-4 bg-gradient-to-r ${pl.color} p-5`}
            >
              <span className="text-4xl">{pl.emoji}</span>
              <div>
                <h2 className="text-lg font-black text-white">{pl.title}</h2>
                <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs font-medium text-white/80">
                  {pl.mood}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="px-5 py-4">
              <p className="mb-4 text-sm text-white/50">{pl.description}</p>

              {/* Track list */}
              <div className="flex flex-col gap-2">
                {pl.songs.map((song, i) => (
                  <div
                    key={song.title}
                    className="flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-4 text-xs text-white/30">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {song.title}
                        </p>
                        <p className="text-xs text-white/40">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-xs text-white/30">{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-white/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">
                  {pl.songs.length} songs
                </span>
                <Link
                  href="/create"
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  Create Similar →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-purple-500/20 bg-purple-900/20 p-10 text-center">
        <h2 className="mb-3 text-2xl font-black text-white">
          Want a playlist just for your mood?
        </h2>
        <p className="mb-6 text-white/60">
          Tell A1 how you&apos;re feeling and it will create a personalized tracklist.
        </p>
        <Link
          href="/mood"
          className="inline-block rounded-xl bg-purple-600 px-8 py-3 font-bold text-white transition hover:bg-purple-500"
        >
          Detect My Mood →
        </Link>
      </div>
    </div>
  );
}
