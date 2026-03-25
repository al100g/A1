import type { Metadata } from 'next';
import DuetRoom from '@/components/DuetRoom';

export const metadata: Metadata = {
  title: 'Live Duets – A1',
  description:
    'Create or join live music rooms. Choose your instrument, record, and collaborate with others in real time.',
};

export default function LiveDuetsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300 mb-6">
          🎤 Live Collaboration
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Play{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">
            together
          </span>{' '}
          in real time
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Create a private room or join a public session. Select your instrument, hit record,
          and collaborate with musicians around the world.
        </p>
      </div>

      <DuetRoom />
    </div>
  );
}
