"use client";

import { useState, useRef, useEffect } from "react";

type Instrument = "Piano" | "Guitar" | "Drums" | "Synth" | "Violin";

const instruments: { name: Instrument; icon: string }[] = [
  { name: "Piano", icon: "🎹" },
  { name: "Guitar", icon: "🎸" },
  { name: "Drums", icon: "🥁" },
  { name: "Synth", icon: "🎛️" },
  { name: "Violin", icon: "🎻" },
];

const mockParticipants = [
  { id: 1, name: "Alex Rivera", instrument: "Piano", avatar: "AR", color: "from-violet-500 to-purple-600", status: "playing" },
  { id: 2, name: "Jordan Lee", instrument: "Guitar", avatar: "JL", color: "from-pink-500 to-rose-600", status: "listening" },
];

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function DuetRoom() {
  const [mode, setMode] = useState<"choose" | "room">("choose");
  const [joinCode, setJoinCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>("Piano");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleCreateRoom = () => {
    setRoomCode(generateRoomCode());
    setMode("room");
  };

  const handleJoinRoom = () => {
    if (joinCode.length < 4) return;
    setRoomCode(joinCode.toUpperCase());
    setMode("room");
  };

  const handleRecord = () => {
    if (isRecording) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRecording(false);
      setHasRecording(true);
    } else {
      setIsRecording(true);
      setIsPlaying(false);
      setRecordingTime(0);
      intervalRef.current = setInterval(() => {
        setRecordingTime((t) => {
          if (t >= 30) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsRecording(false);
            setHasRecording(true);
            return t;
          }
          return t + 1;
        });
      }, 1000);
    }
  };

  const handlePlay = () => {
    if (!hasRecording) return;
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsRecording(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (mode === "choose") {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Room */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 hover:border-violet-500/30 transition-colors duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            🎸
          </div>
          <h3 className="text-white text-xl font-bold">Create a Room</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Start a new live duet session and invite others to join with your unique room code.
          </p>
          <button
            onClick={handleCreateRoom}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25"
          >
            Create Room
          </button>
        </div>

        {/* Join Room */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 hover:border-pink-500/30 transition-colors duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-2xl shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-shadow">
            🎵
          </div>
          <h3 className="text-white text-xl font-bold">Join a Room</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Enter a room code to join a friend&apos;s live duet session and create music together.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter room code (e.g. ABC123)"
              maxLength={8}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-200 text-sm font-mono tracking-widest text-center uppercase"
            />
            <button
              onClick={handleJoinRoom}
              disabled={joinCode.length < 4}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Room Header */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Live Room</span>
          <span className="font-mono font-bold text-white tracking-widest bg-white/10 px-3 py-1 rounded-lg text-sm">
            {roomCode}
          </span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(roomCode);
          }}
          className="text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg transition-all duration-200 font-medium"
        >
          Copy Code
        </button>
      </div>

      {/* Participants */}
      <div className="space-y-3">
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
          Participants ({mockParticipants.length + 1})
        </h3>
        <div className="space-y-2">
          {/* You */}
          <div className="flex items-center justify-between bg-violet-600/10 border border-violet-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                You
              </div>
              <div>
                <p className="text-white font-medium text-sm">You</p>
                <p className="text-gray-400 text-xs">{selectedInstrument}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isRecording && (
                <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  REC {formatTime(recordingTime)}
                </span>
              )}
              <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">Host</span>
            </div>
          </div>

          {mockParticipants.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-xs`}>
                  {p.avatar}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{p.name}</p>
                  <p className="text-gray-400 text-xs">{p.instrument}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                p.status === "playing"
                  ? "text-green-400 bg-green-500/10"
                  : "text-gray-500 bg-white/5"
              }`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Instrument Selector */}
      <div className="space-y-3">
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Your Instrument</h3>
        <div className="flex gap-2 flex-wrap">
          {instruments.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setSelectedInstrument(name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                selectedInstrument === name
                  ? "bg-violet-600/20 border-violet-500/40 text-violet-300"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Waveform */}
      <div className="bg-black/30 border border-white/10 rounded-xl p-4 flex items-center justify-center h-24">
        <div className="flex items-end gap-1 w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-200 ${
                isRecording ? "bg-red-500" : isPlaying ? "bg-violet-500" : "bg-white/20"
              }`}
              style={{
                height: isRecording || isPlaying
                  ? `${Math.sin(i * 0.5 + Date.now() * 0.001) * 30 + 40}%`
                  : `${Math.sin(i * 0.8) * 10 + 15}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleRecord}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isRecording
              ? "bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30"
              : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/25"
          }`}
        >
          {isRecording ? (
            <>
              <span className="w-3 h-3 bg-red-400 rounded-sm" />
              Stop Recording
            </>
          ) : (
            <>
              <span className="w-3 h-3 bg-white rounded-full" />
              Record
            </>
          )}
        </button>

        <button
          onClick={handlePlay}
          disabled={!hasRecording}
          className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <button
          onClick={handleStop}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-semibold text-sm rounded-xl transition-all duration-200"
        >
          ⏹ Stop
        </button>
      </div>

      <button
        onClick={() => setMode("choose")}
        className="text-gray-500 hover:text-gray-400 text-sm underline mx-auto block transition-colors"
      >
        Leave Room
      </button>
    </div>
  );
}
