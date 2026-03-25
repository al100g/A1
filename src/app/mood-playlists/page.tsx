import type { Metadata } from 'next';
import MoodPlaylist from '@/components/MoodPlaylist';

export const metadata: Metadata = {
  title: 'Mood Playlists – A1',
  description:
    'Browse 12 curated mood-based playlists. Filter by emotion and discover music that perfectly matches how you feel.',
};

export default function MoodPlaylistsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300 mb-6">
          🎵 Curated Playlists
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Music for every{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">
            mood
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          12 hand-crafted playlists tailored to every emotional state. Filter by mood and
          find the perfect soundtrack for your moment.
        </p>
      </div>

      <MoodPlaylist />
    </div>
  );
}
