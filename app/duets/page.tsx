'use client';

import { useState } from 'react';
import { Users, Plus, LogIn, Music } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Alex M.', status: 'singing' },
  { id: '2', name: 'Jordan K.', status: 'listening' },
  { id: '3', name: 'Sam R.', status: 'writing' },
];

const mockMessages = [
  { id: '1', user: 'Alex M.', text: 'Just added a new verse to the chorus!', time: '2:34 PM' },
  { id: '2', user: 'Jordan K.', text: 'Love the bridge you wrote', time: '2:35 PM' },
  { id: '3', user: 'Sam R.', text: 'Should we try a key change?', time: '2:36 PM' },
];

export default function DuetsPage() {
  const [roomCode, setRoomCode] = useState('');
  const [joined, setJoined] = useState(false);
  const [activeRoom, setActiveRoom] = useState('');

  const handleCreate = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setActiveRoom(code);
    setJoined(true);
  };

  const handleJoin = () => {
    if (roomCode.trim()) {
      setActiveRoom(roomCode.toUpperCase());
      setJoined(true);
    }
  };

  if (joined) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Live Duet Room</h1>
              <p className="text-purple-300">Room Code: <span className="font-mono font-bold text-violet-400">{activeRoom}</span></p>
            </div>
            <button
              onClick={() => setJoined(false)}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl transition-all"
            >
              Leave Room
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card-gradient border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Participants ({mockUsers.length})
              </h2>
              <div className="space-y-3">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-purple-400 text-xs">{user.status}</p>
                    </div>
                    <span className="ml-auto w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 card-gradient border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-400" />
                Collaborative Lyrics
              </h2>
              <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                {mockMessages.map((msg) => (
                  <div key={msg.id} className="bg-purple-900/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-violet-400 text-sm font-medium">{msg.user}</span>
                      <span className="text-purple-500 text-xs">{msg.time}</span>
                    </div>
                    <p className="text-purple-100">{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Add a lyric or message..."
                  className="flex-1 bg-purple-900/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:border-violet-500"
                />
                <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition-all">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">Live Duets</h1>
          <p className="text-purple-300 text-lg">
            Collaborate in real-time with other musicians. Create a room or join an existing one.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-gradient border border-purple-500/20 rounded-2xl p-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-violet-500/20 mb-4">
              <Plus className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Create Room</h2>
            <p className="text-purple-300 mb-6">Start a new collaborative session and invite others to join.</p>
            <button
              onClick={handleCreate}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-semibold transition-all"
            >
              Create New Room
            </button>
          </div>
          <div className="card-gradient border border-purple-500/20 rounded-2xl p-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-purple-500/20 mb-4">
              <LogIn className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Join Room</h2>
            <p className="text-purple-300 mb-4">Enter a room code to join an existing session.</p>
            <input
              type="text"
              placeholder="Enter room code..."
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full bg-purple-900/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:border-violet-500 mb-3 uppercase"
            />
            <button
              onClick={handleJoin}
              className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
