import Link from 'next/link';
import { MOODS } from '@/lib/moods';

const playlists = Object.entries(MOODS).map(([key, mood]) => ({
  id: key,
  mood: key,
  name: `${mood.emoji} ${mood.name} Vibes`,
  description: mood.description,
  trackCount: Math.floor(Math.random() * 15) + 8,
  color: mood.color,
  bgColor: mood.bgColor,
}));

export default function PlaylistsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">Mood Playlists</h1>
          <p className="text-purple-300 text-lg">
            Curated playlists that match your current mood. Discover music that resonates with how you feel.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`card-gradient border border-purple-500/20 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
            >
              <div className={`inline-flex p-3 rounded-xl ${playlist.bgColor} mb-4`}>
                <span className="text-2xl">{playlist.name.split(' ')[0]}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{playlist.name}</h3>
              <p className="text-purple-300 text-sm mb-4">{playlist.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 text-xs">{playlist.trackCount} tracks</span>
                <Link
                  href={`/mood`}
                  className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
                >
                  Detect My Mood →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-purple-400 mb-4">Not sure of your mood?</p>
          <Link
            href="/mood"
            className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
          >
            Detect My Mood
          </Link>
        </div>
      </div>
    </div>
  );
}
