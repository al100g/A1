'use client';

import { useState, useEffect } from 'react';

type Instrument = 'Piano' | 'Guitar' | 'Drums' | 'Violin' | 'Trumpet';

const instruments: { name: Instrument; emoji: string }[] = [
  { name: 'Piano', emoji: '🎹' },
  { name: 'Guitar', emoji: '🎸' },
  { name: 'Drums', emoji: '🥁' },
  { name: 'Violin', emoji: '🎻' },
  { name: 'Trumpet', emoji: '🎺' },
];

const publicRooms = [
  { code: 'A1-JAZZ', host: 'MelodyMaker', instrument: 'Piano', participants: 2, mood: 'Calm' },
  { code: 'A1-ROCK', host: 'GuitarHero99', instrument: 'Guitar', participants: 3, mood: 'Excited' },
  { code: 'A1-SOUL', host: 'SoulSinger', instrument: 'Violin', participants: 1, mood: 'Hopeful' },
  { code: 'A1-BEAT', host: 'DrummerBoy', instrument: 'Drums', participants: 4, mood: 'Happy' },
];

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return (
    'A1-' +
    Array.from({ length: 4 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('')
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export default function DuetRoom() {
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const [inRoom, setInRoom] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (recording) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const handleCreate = () => {
    if (!instrument) return;
    setRoomCode(generateRoomCode());
    setInRoom(true);
  };

  const handleJoin = () => {
    if (!joinCode.trim() || !instrument) return;
    setRoomCode(joinCode.toUpperCase());
    setInRoom(true);
  };

  const handleLeave = () => {
    setInRoom(false);
    setRecording(false);
    setTimer(0);
    setRoomCode('');
    setJoinCode('');
    setInstrument(null);
  };

  if (inRoom) {
    return (
      <div className="space-y-6">
        {/* Room Header */}
        <div className="card-glass p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Room Code</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold font-mono text-purple-300">{roomCode}</span>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(roomCode)}
                className="text-xs text-gray-400 hover:text-white border border-white/10 px-2 py-1 rounded transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Share this code to invite others</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-900/30 border border-green-500/30 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
            <span className="text-gray-300 text-sm">
              {instruments.find((i) => i.name === instrument)?.emoji} {instrument}
            </span>
            <button type="button" onClick={handleLeave} className="btn-secondary text-xs py-1.5 px-3">
              Leave Room
            </button>
          </div>
        </div>

        {/* Waveform Visualiser */}
        <div className="card-glass p-6">
          <p className="text-sm text-gray-400 mb-4">🎵 Live Waveform</p>
          <div className="flex items-end gap-1 h-20 bg-black/20 rounded-xl px-4 py-3">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-200 ${
                  recording ? 'bg-purple-400/70 waveform-bar' : 'bg-white/10'
                }`}
                style={{
                  height: recording
                    ? `${20 + Math.abs(Math.sin((i + timer) * 0.4)) * 80}%`
                    : `${10 + Math.sin(i * 0.5) * 8}%`,
                  animationDelay: `${i * 0.04}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="card-glass p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setRecording(!recording)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  recording
                    ? 'bg-red-600 hover:bg-red-500 shadow-red-900/50 scale-110'
                    : 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/50'
                }`}
                aria-label={recording ? 'Stop recording' : 'Start recording'}
              >
                {recording ? (
                  <span className="w-4 h-4 bg-white rounded-sm" />
                ) : (
                  <span className="w-4 h-4 bg-white rounded-full" />
                )}
              </button>
              <div>
                <p className="text-sm font-medium text-gray-200">
                  {recording ? 'Recording...' : 'Start Recording'}
                </p>
                {recording && (
                  <p className="text-lg font-mono text-red-400 font-bold">{formatTime(timer)}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                className="btn-secondary text-sm py-2 px-4 opacity-50 cursor-not-allowed"
                disabled
              >
                🎚️ Effects
              </button>
              <button
                type="button"
                className="btn-secondary text-sm py-2 px-4 opacity-50 cursor-not-allowed"
                disabled
              >
                💾 Save
              </button>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="card-glass p-6">
          <p className="text-sm text-gray-400 mb-4">👥 Participants (1)</p>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
              Y
            </div>
            <div>
              <p className="text-sm text-white font-medium">You</p>
              <p className="text-xs text-gray-400">
                {instruments.find((i) => i.name === instrument)?.emoji} {instrument}
              </p>
            </div>
            <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex rounded-xl overflow-hidden border border-white/10 max-w-xs">
        {(['create', 'join'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
              tab === t ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {t === 'create' ? '➕ Create Room' : '🚪 Join Room'}
          </button>
        ))}
      </div>

      {/* Create / Join Form */}
      <div className="card-glass p-6 max-w-md">
        {tab === 'create' ? (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-200">Create a New Duet Room</h2>
            <p className="text-sm text-gray-400">
              A unique room code will be generated. Share it with friends to collaborate.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-200">Join an Existing Room</h2>
            <div>
              <label htmlFor="join-code" className="block text-sm text-gray-400 mb-2">
                Room Code
              </label>
              <input
                id="join-code"
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="e.g. A1-JAZZ"
                maxLength={8}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 font-mono uppercase"
              />
            </div>
          </div>
        )}

        {/* Instrument Selector */}
        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-3">Select your instrument</p>
          <div className="grid grid-cols-5 gap-2">
            {instruments.map((inst) => (
              <button
                key={inst.name}
                type="button"
                onClick={() => setInstrument(inst.name)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all text-center ${
                  instrument === inst.name
                    ? 'bg-purple-600/30 border-purple-400/60 scale-105'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                aria-pressed={instrument === inst.name}
              >
                <span className="text-xl">{inst.emoji}</span>
                <span className="text-xs text-gray-300">{inst.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={tab === 'create' ? handleCreate : handleJoin}
          disabled={!instrument || (tab === 'join' && !joinCode.trim())}
          className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {tab === 'create' ? 'Create Room' : 'Join Room'}
        </button>
      </div>

      {/* Public Rooms */}
      <div>
        <h2 className="text-lg font-semibold mb-4">🌐 Active Public Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {publicRooms.map((room) => (
            <div key={room.code} className="card-glass p-5 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-purple-300 font-bold">{room.code}</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                <p className="text-sm text-gray-300">
                  {instruments.find((i) => i.name === room.instrument)?.emoji} {room.host}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {room.participants} participant{room.participants !== 1 ? 's' : ''} · {room.mood} mood
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTab('join');
                  setJoinCode(room.code);
                }}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
