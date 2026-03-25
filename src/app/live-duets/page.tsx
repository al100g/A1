import DuetRoom from "@/components/DuetRoom";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Duets | A1",
  description: "Connect with musicians worldwide for real-time collaborative music creation",
};

export default function LiveDuetsPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-sm text-orange-300 font-medium">
          <span className="text-lg">🎸</span>
          Live Duets
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Make Music{" "}
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Together
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
          Create a room or join an existing session to collaborate with musicians in real-time.
          Choose your instrument and start creating unforgettable music together.
        </p>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: "⚡", title: "Real-Time", desc: "Low-latency collaboration with musicians worldwide" },
          { icon: "🎹", title: "5 Instruments", desc: "Piano, Guitar, Drums, Synth, and Violin" },
          { icon: "��", title: "Record & Play", desc: "Record your sessions and replay them anytime" },
        ].map((item) => (
          <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-white font-semibold text-sm">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Duet Room */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <DuetRoom />
      </div>

      {/* Active rooms */}
      <div className="space-y-4">
        <h3 className="text-white font-bold text-lg">Active Public Rooms</h3>
        <div className="space-y-3">
          {[
            { code: "JAZZ42", participants: 2, genre: "Jazz", mood: "Calm", instruments: ["Piano", "Violin"] },
            { code: "ROCK99", participants: 1, genre: "Rock", mood: "Energetic", instruments: ["Guitar"] },
            { code: "SOUL11", participants: 2, genre: "R&B", mood: "Romantic", instruments: ["Piano", "Guitar"] },
          ].map((room) => (
            <div key={room.code} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                  <span className="text-white font-mono text-xs font-bold">{room.code.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white font-bold text-sm">{room.code}</span>
                    <span className="text-xs text-gray-500">· {room.genre} · {room.mood}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{room.instruments.join(", ")} · {room.participants}/4 players</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: room.participants }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-green-400 rounded-full" />
                  ))}
                  {Array.from({ length: 4 - room.participants }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/10 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
