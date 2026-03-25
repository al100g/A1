"use client";

import { useState, useEffect } from "react";

type DuetPartner = {
  id: string;
  name: string;
  mood: string;
  emoji: string;
  instrument: string;
  status: "available" | "in-session";
  distance: string;
};

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: "lyric" | "note" | "chat";
};

const MOCK_PARTNERS: DuetPartner[] = [
  { id: "1", name: "Luna M.", mood: "Romantic", emoji: "💕", instrument: "Guitar", status: "available", distance: "2 mi" },
  { id: "2", name: "Kai R.", mood: "Happy", emoji: "😊", instrument: "Piano", status: "available", distance: "5 mi" },
  { id: "3", name: "Sage T.", mood: "Melancholic", emoji: "🌧️", instrument: "Violin", status: "in-session", distance: "1 mi" },
  { id: "4", name: "River J.", mood: "Calm", emoji: "🌿", instrument: "Flute", status: "available", distance: "8 mi" },
  { id: "5", name: "Blaze K.", mood: "Energetic", emoji: "⚡", instrument: "Drums", status: "available", distance: "3 mi" },
  { id: "6", name: "Nova S.", mood: "Sad", emoji: "😢", instrument: "Cello", status: "available", distance: "6 mi" },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "System",
    content: "Welcome to Live Duets! Start creating music together.",
    timestamp: "Now",
    type: "chat",
  },
];

const NOTE_SUGGESTIONS = ["🎵 La la la…", "🎶 Oh oh oh…", "🎸 Yeah yeah…", "🎹 Hmm hmm…"];
const LYRIC_SUGGESTIONS = [
  "Under the stars we sing tonight…",
  "Two voices, one song, infinite light…",
  "Together we rise like the morning sun…",
  "Our melodies echo through the night…",
];

export default function LiveDuetsPage() {
  const [selectedPartner, setSelectedPartner] = useState<DuetPartner | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [messageType, setMessageType] = useState<"lyric" | "note" | "chat">("lyric");
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [filterMood, setFilterMood] = useState("all");

  const moods = ["all", ...Array.from(new Set(MOCK_PARTNERS.map((p) => p.mood.toLowerCase())))];

  const filteredPartners = MOCK_PARTNERS.filter(
    (p) => filterMood === "all" || p.mood.toLowerCase() === filterMood
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (selectedPartner) {
      interval = setInterval(() => setSessionTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [selectedPartner]);

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }

  function sendMessage() {
    if (!inputText.trim()) return;

    const msg: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: messageType,
    };

    setMessages((prev) => [...prev, msg]);
    setInputText("");

    // Simulate partner response
    setTimeout(() => {
      const responses =
        messageType === "lyric" ? LYRIC_SUGGESTIONS : NOTE_SUGGESTIONS;
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedPartner?.name ?? "Partner",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: messageType,
      };
      setMessages((prev) => [...prev, response]);
    }, 1200);
  }

  function joinDuet(partner: DuetPartner) {
    setSelectedPartner(partner);
    setSessionTime(0);
    setMessages([
      {
        id: "join",
        sender: "System",
        content: `You joined a duet with ${partner.name}! Share ${partner.mood.toLowerCase()} vibes through music.`,
        timestamp: "Now",
        type: "chat",
      },
    ]);
  }

  if (selectedPartner) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Session Header */}
        <div className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xl">
              {selectedPartner.emoji}
            </div>
            <div>
              <p className="font-semibold text-white">{selectedPartner.name}</p>
              <p className="text-sm text-gray-400">
                {selectedPartner.instrument} · {selectedPartner.mood}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-green-400">
                {formatTime(sessionTime)}
              </div>
              <div className="text-xs text-gray-500">Session</div>
            </div>
            <button
              onClick={() => {
                setSelectedPartner(null);
                setIsRecording(false);
              }}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              End Duet
            </button>
          </div>
        </div>

        {/* Live Music Visualizer */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Live Music Session</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400">Live</span>
            </div>
          </div>

          {/* Dual waveforms */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 mb-2">You</p>
              <div className="flex items-center gap-0.5 h-10">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${
                      isRecording ? "wave-bar bg-violet-400" : "bg-white/20"
                    }`}
                    style={{
                      height: `${6 + Math.sin(i * 0.4) * 4}px`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">{selectedPartner.name}</p>
              <div className="flex items-center gap-0.5 h-10">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full wave-bar bg-pink-400"
                    style={{
                      height: `${8 + Math.sin(i * 0.6 + 1) * 12}px`,
                      animationDelay: `${i * 0.07 + 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Record Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsRecording((r) => !r)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold transition-all duration-200 hover:scale-110 ${
                isRecording
                  ? "bg-red-500 pulse-glow"
                  : "bg-violet-600 hover:bg-violet-500"
              }`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? (
                <span className="w-6 h-6 bg-white rounded-sm" />
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="6" />
                </svg>
              )}
            </button>
          </div>
          {isRecording && (
            <p className="text-center text-red-400 text-sm mt-2 animate-pulse">
              🔴 Recording in progress…
            </p>
          )}
        </div>

        {/* Lyrics / Notes Chat */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold text-white mb-3">Collaborative Lyrics</h3>
            <div className="flex gap-2">
              {(["lyric", "note", "chat"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setMessageType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                    messageType === type
                      ? "bg-violet-600 text-white"
                      : "glass-card text-gray-400 hover:text-white"
                  }`}
                >
                  {type === "lyric" ? "🎵 Lyric" : type === "note" ? "🎶 Hum" : "💬 Chat"}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-52 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "You"
                      ? "bg-violet-600 text-white rounded-br-sm"
                      : msg.sender === "System"
                      ? "bg-white/5 text-gray-400 italic text-center w-full text-xs"
                      : "bg-white/10 text-white rounded-bl-sm"
                  }`}
                >
                  {msg.sender !== "You" && msg.sender !== "System" && (
                    <p className="text-xs text-gray-400 mb-1">{msg.sender}</p>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                messageType === "lyric"
                  ? "Add a lyric line…"
                  : messageType === "note"
                  ? "Hum or scat notation…"
                  : "Send a message…"
              }
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 text-sm transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🎤</div>
        <h1 className="text-4xl font-black text-white mb-4">Live Duets</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Connect with people who share your musical mood. Create music
          together in real time — lyrics, melodies, harmonies. Find your
          perfect duet partner.
        </p>
      </div>

      {/* Mood Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setFilterMood(m)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              filterMood === m
                ? "bg-amber-600 text-white"
                : "glass-card text-gray-400 hover:text-white"
            }`}
          >
            {m === "all" ? "All Moods" : m}
          </button>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="glass-card rounded-2xl p-6 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xl">
                  {partner.emoji}
                </div>
                <div>
                  <p className="font-semibold text-white">{partner.name}</p>
                  <p className="text-sm text-gray-400">{partner.instrument}</p>
                </div>
              </div>
              <div
                className={`w-2.5 h-2.5 rounded-full mt-1 ${
                  partner.status === "available"
                    ? "bg-green-400 animate-pulse"
                    : "bg-yellow-400"
                }`}
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                {partner.mood}
              </span>
              <span className="text-xs text-gray-500">{partner.distance}</span>
              {partner.status === "in-session" && (
                <span className="text-xs text-yellow-400">In Session</span>
              )}
            </div>

            <button
              onClick={() => partner.status === "available" && joinDuet(partner)}
              disabled={partner.status !== "available"}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                partner.status === "available"
                  ? "bg-amber-600 hover:bg-amber-500 text-white hover:scale-[1.02]"
                  : "bg-white/5 text-gray-500 cursor-not-allowed"
              }`}
            >
              {partner.status === "available" ? "Join Duet" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
