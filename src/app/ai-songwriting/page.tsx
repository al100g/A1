import type { Metadata } from 'next';
import SongGenerator from '@/components/SongGenerator';

export const metadata: Metadata = {
  title: 'AI Songwriting – A1',
  description:
    'Select your mood and genre, and A1\'s AI will compose a unique song with full lyrics, melody description, tempo, and key.',
};

export default function AISongwritingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300 mb-6">
          ✍️ AI Songwriting Studio
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Generate your{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">
            perfect song
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Choose a mood and genre, then let A1 compose a complete song with original lyrics,
          melody description, tempo, and musical key — personalized just for you.
        </p>
      </div>

      <SongGenerator />
    </div>
  );
}
