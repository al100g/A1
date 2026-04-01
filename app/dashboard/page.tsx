import Link from 'next/link';
import { Music, Brain, Users, ListMusic } from 'lucide-react';

const stats = [
  { label: 'Songs Generated', value: '0', icon: Music },
  { label: 'Mood Entries', value: '0', icon: Brain },
  { label: 'Duet Rooms', value: '0', icon: Users },
  { label: 'Playlists', value: '0', icon: ListMusic },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-purple-300">Your personal A1 music journey at a glance.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="card-gradient border border-purple-500/20 rounded-2xl p-6 text-center"
            >
              <Icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-purple-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-gradient border border-purple-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/mood"
                className="flex items-center gap-3 bg-purple-800/30 hover:bg-purple-800/50 rounded-xl p-4 transition-all group"
              >
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-purple-200 group-hover:text-white transition-colors">Detect Your Mood</span>
              </Link>
              <Link
                href="/songs"
                className="flex items-center gap-3 bg-violet-800/30 hover:bg-violet-800/50 rounded-xl p-4 transition-all group"
              >
                <Music className="w-5 h-5 text-violet-400" />
                <span className="text-purple-200 group-hover:text-white transition-colors">Generate a Song</span>
              </Link>
              <Link
                href="/duets"
                className="flex items-center gap-3 bg-fuchsia-800/30 hover:bg-fuchsia-800/50 rounded-xl p-4 transition-all group"
              >
                <Users className="w-5 h-5 text-fuchsia-400" />
                <span className="text-purple-200 group-hover:text-white transition-colors">Start a Live Duet</span>
              </Link>
              <Link
                href="/playlists"
                className="flex items-center gap-3 bg-indigo-800/30 hover:bg-indigo-800/50 rounded-xl p-4 transition-all group"
              >
                <ListMusic className="w-5 h-5 text-indigo-400" />
                <span className="text-purple-200 group-hover:text-white transition-colors">Browse Playlists</span>
              </Link>
            </div>
          </div>

          <div className="card-gradient border border-purple-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-purple-400 text-sm">No activity yet.</p>
              <p className="text-purple-500 text-xs mt-1">Start by detecting your mood!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
