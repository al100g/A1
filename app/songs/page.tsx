import { SongWriter } from '@/components/SongWriter';

export default function SongsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Songwriting
          </h1>
          <p className="text-purple-300 text-lg">
            Generate unique song lyrics tailored to your mood and preferred genre using advanced AI.
          </p>
        </div>
        <SongWriter />
      </div>
    </div>
  );
}
