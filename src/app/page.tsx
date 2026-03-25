import Link from "next/link";

const features = [
  {
    href: "/mood-detection",
    icon: "🎭",
    title: "Mood Detection",
    description:
      "AI analyzes your emotions through text or voice input. Share how you feel and let our models understand the nuances of your mood.",
    gradient: "from-violet-600 to-indigo-600",
    glow: "hover:shadow-violet-500/30",
  },
  {
    href: "/ai-songwriting",
    icon: "🎵",
    title: "AI Songwriting & Singing",
    description:
      "Generate custom lyrics and melodies tailored to your emotional state. Our AI composes original songs that speak directly to your soul.",
    gradient: "from-pink-600 to-rose-600",
    glow: "hover:shadow-pink-500/30",
  },
  {
    href: "/live-duets",
    icon: "🎤",
    title: "Live Duets",
    description:
      "Connect with others through real-time music creation. Find a partner who resonates with your mood and create music together.",
    gradient: "from-amber-500 to-orange-600",
    glow: "hover:shadow-amber-500/30",
  },
  {
    href: "/mood-playlists",
    icon: "🎧",
    title: "Mood Playlists",
    description:
      "Discover curated tracks that resonate with your current emotions. AI-powered playlists that evolve with how you feel throughout the day.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "hover:shadow-emerald-500/30",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-violet-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          AI-Powered Music Empowerment
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
          <span className="gradient-text">A1</span>
        </h1>
        <p className="text-2xl md:text-3xl font-light text-gray-300 mb-4">
          Music &amp; Mood Empowerment
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Experience music like never before. A1 uses cutting-edge AI to detect
          your emotions, generate personalized songs, connect you with live
          duet partners, and curate playlists that match your soul.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/mood-detection"
            className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 pulse-glow"
          >
            Detect My Mood
          </Link>
          <Link
            href="/mood-playlists"
            className="px-8 py-4 rounded-xl glass-card hover:bg-white/10 text-white font-semibold text-lg transition-all duration-200 hover:scale-105"
          >
            Explore Playlists
          </Link>
        </div>

        {/* Sound Wave Animation */}
        <div className="flex items-center justify-center gap-1.5 mt-16 h-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="wave-bar w-1.5 rounded-full bg-gradient-to-t from-violet-600 to-pink-400"
              style={{
                height: `${20 + Math.sin(i * 0.7) * 16}px`,
                animationDelay: `${i * 0.06}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-4 pb-24 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Everything You Need
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          Four powerful features, all driven by AI, all designed to amplify
          your emotional connection to music.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className={`group glass-card rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${feature.glow}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-200`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                Explore feature
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-4 pb-24">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Mood States" },
              { value: "10K+", label: "Songs Generated" },
              { value: "5K+", label: "Live Duets" },
              { value: "99%", label: "Accuracy" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-black gradient-text mb-2">
                  {value}
                </div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
