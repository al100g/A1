import { MoodDetector } from '@/components/MoodDetector';
import Link from 'next/link';

export default function MoodPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Mood Detection
          </h1>
          <p className="text-purple-300 text-lg">
            Tell us how you&apos;re feeling and our AI will analyze your mood to provide personalized music recommendations.
          </p>
        </div>
        <MoodDetector />
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/songs"
            className="text-center bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 px-6 py-3 rounded-xl transition-all"
          >
            Generate Songs Based on Mood
          </Link>
          <Link
            href="/playlists"
            className="text-center bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-xl transition-all"
          >
            Browse Mood Playlists
          </Link>
        </div>
      </div>
    </div>
  );
}
