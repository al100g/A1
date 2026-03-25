"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const moodPresets = [
  { emoji: "😔", label: "Sad", prompt: "I'm feeling really sad and down today" },
  { emoji: "😰", label: "Anxious", prompt: "I feel anxious and overwhelmed with everything" },
  { emoji: "😊", label: "Happy", prompt: "I'm feeling happy and grateful for life" },
  { emoji: "💪", label: "Motivated", prompt: "I feel motivated and ready to conquer the world" },
  { emoji: "😌", label: "Calm", prompt: "I'm feeling calm and at peace with myself" },
  { emoji: "🌟", label: "Hopeful", prompt: "I feel uncertain but also hopeful for the future" },
  { emoji: "😤", label: "Frustrated", prompt: "I'm feeling frustrated and need to vent" },
  { emoji: "🥰", label: "Loved", prompt: "I feel loved and cherished by the people around me" },
];

export default function MoodPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError("Voice recognition is not supported in your browser.");
      return;
    }
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setError("Could not capture voice. Please try again.");
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setError("");
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please share how you're feeling first.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to analyze mood");
      const data = await res.json();
      const params = new URLSearchParams({
        mood: data.mood,
        emotion: data.emotion,
        intensity: data.intensity,
        input: text,
      });
      router.push(`/song?${params.toString()}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 pt-12 pb-20">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="text-4xl font-black mb-3 gradient-text">
            How Are You Feeling?
          </h1>
          <p className="text-purple-200/70">
            Tell A1 what&apos;s on your heart. Be as open as you like.
          </p>
        </div>

        {/* Preset moods */}
        <div className="mb-6">
          <p className="text-xs text-purple-400 uppercase tracking-widest mb-3">
            Quick mood select
          </p>
          <div className="grid grid-cols-4 gap-2">
            {moodPresets.map(({ emoji, label, prompt }) => (
              <button
                key={label}
                onClick={() => setText(prompt)}
                className={`glass-card rounded-xl p-3 text-center transition-all hover:-translate-y-0.5 hover:border-purple-500/50 ${
                  text === prompt ? "border-purple-500/60 bg-purple-600/20" : ""
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs text-purple-300">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text input */}
        <div className="glass-card rounded-2xl p-4 mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="I feel a bit uncertain but also hopeful for the future…"
            rows={5}
            className="w-full bg-transparent text-purple-100 placeholder-purple-400/50 resize-none text-base leading-relaxed border border-transparent focus:border-purple-500/40 rounded-xl p-2 transition-all"
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-900/30">
            <span className="text-xs text-purple-500">{text.length} characters</span>
            <div className="flex gap-2">
              <button
                onClick={text ? () => setText("") : undefined}
                disabled={!text}
                className="text-xs text-purple-500 hover:text-purple-300 transition-colors disabled:opacity-30"
              >
                Clear
              </button>
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isListening
                    ? "bg-red-600/30 border border-red-500/50 text-red-300 animate-pulse"
                    : "btn-secondary text-purple-200"
                }`}
              >
                {isListening ? "⏹ Stop" : "🎙 Voice"}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="btn-primary w-full py-4 rounded-2xl text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              Analyzing your mood…
            </span>
          ) : (
            "Create My Song →"
          )}
        </button>

        <p className="text-center text-xs text-purple-500 mt-4">
          A1 respects your privacy. Your feelings stay between you and A1.
        </p>
      </div>
    </div>
  );
}
