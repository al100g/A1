import MoodDetector from "@/components/MoodDetector";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mood Detection | A1",
  description: "Let AI analyze your emotional state through text input",
};

export default function MoodDetectionPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full text-sm text-violet-300 font-medium">
          <span className="text-lg">🎭</span>
          Mood Detection
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          How Are You{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Feeling?
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
          Describe your current emotional state in your own words. Our AI will analyze your
          mood and provide a detailed emotional breakdown to help guide your music experience.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: "✍️", title: "Describe", desc: "Write freely about how you feel right now" },
          { icon: "🧠", title: "AI Analyzes", desc: "Advanced NLP detects your emotional state" },
          { icon: "🎵", title: "Get Music", desc: "Discover songs and playlists for your mood" },
        ].map((item) => (
          <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-white font-semibold text-sm">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Detector Component */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <MoodDetector />
      </div>

      {/* Example prompts */}
      <div className="space-y-3">
        <p className="text-gray-500 text-sm font-medium">Example descriptions to try:</p>
        <div className="space-y-2">
          {[
            "I feel so energetic and ready to take on the world today!",
            "Feeling a bit down and missing someone I love",
            "I'm completely calm and at peace with everything",
            "Super anxious about my big presentation tomorrow",
            "Everything is wonderful, I'm in love!",
          ].map((example) => (
            <p
              key={example}
              className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-2 rounded-lg italic"
            >
              &ldquo;{example}&rdquo;
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
