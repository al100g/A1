import type { Metadata } from 'next';
import MoodDetector from '@/components/MoodDetector';

export const metadata: Metadata = {
  title: 'Mood Detection – A1',
  description:
    'Describe how you feel and let A1\'s AI analyze your emotional state across six mood dimensions.',
};

export default function MoodDetectionPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300 mb-6">
          🎭 AI Mood Analysis
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          How are you{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">
            feeling?
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Describe your current emotional state in your own words. Our NLP engine will
          analyze your text and identify your mood across six emotional dimensions.
        </p>
      </div>

      <MoodDetector />
    </div>
  );
}
