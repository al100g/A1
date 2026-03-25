import Link from "next/link";

const features = [
  {
    icon: "🎭",
    title: "Mood Detection",
    description: "AI analyzes your emotions through text input to understand your current emotional state with precision.",
    href: "/mood-detection",
    gradient: "from-violet-500 to-purple-700",
    glow: "shadow-violet-500/25",
  },
  {
    icon: "🎵",
    title: "AI Songwriting",
    description: "Generate custom lyrics and melodies tailored to your mood and preferred music genre in seconds.",
    href: "/ai-songwriting",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/25",
  },
  {
    icon: "🎸",
    title: "Live Duets",
    description: "Connect with other musicians worldwide for real-time collaborative music creation sessions.",
    href: "/live-duets",
    gradient: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/25",
  },
  {
    icon: "🎧",
    title: "Mood Playlists",
    description: "Discover curated playlists that perfectly match your current emotional state and musical taste.",
    href: "/mood-playlists",
    gradient: "from-teal-500 to-emerald-600",
    glow: "shadow-teal-500/25",
  },
];

const stats = [
  { value: "50K+", label: "Songs Generated" },
  { value: "12K+", label: "Active Users" },
  { value: "200+", label: "Live Duets Daily" },
  { value: "98%", label: "Mood Accuracy" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full text-sm text-violet-300 font-medium">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            AI-Powered Music Empowerment Platform
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight">
            <span className="text-white">A</span>
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">1</span>
            <br />
            <span className="text-2xl sm:text-4xl font-semibold text-gray-300 mt-2 block">
              Music & Mood Empowerment
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            AI-powered music creation that understands your emotions. Detect your mood,
            generate personalized songs, collaborate in live duets, and discover playlists
            that speak to your soul.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/mood-detection"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5"
            >
              Detect My Mood 🎭
            </Link>
            <Link
              href="/ai-songwriting"
              className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-bold text-base rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Generate a Song 🎵
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 sm:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Everything You Need</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Four powerful features designed to connect your emotions with music
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-6 space-y-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl shadow-xl ${feature.glow} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
              <div className="flex items-center gap-1 text-violet-400 text-sm font-medium group-hover:gap-2 transition-all duration-200">
                Explore <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 sm:py-24 bg-white/2">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white">How A1 Works</h2>
            <p className="text-gray-400 text-lg">Three simple steps to musical empowerment</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Share Your Mood", desc: "Tell A1 how you're feeling through text. Our AI analyzes your emotional state with high precision.", icon: "💬" },
              { step: "02", title: "AI Creates Music", desc: "Our AI engine generates personalized lyrics, melodies, and curated playlists based on your mood.", icon: "🤖" },
              { step: "03", title: "Connect & Create", desc: "Join live duets with other musicians or enjoy your mood-matched playlist solo.", icon: "🌐" },
            ].map((item) => (
              <div key={item.step} className="relative space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-violet-400 text-xs font-bold tracking-widest uppercase">{item.step}</div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-4 py-16 sm:py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Let Music Understand You?
          </h2>
          <p className="text-gray-400 text-lg">
            Start with mood detection and let A1 guide you to your perfect musical experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/mood-detection"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all duration-200 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50"
            >
              Get Started Free
            </Link>
            <Link
              href="/live-duets"
              className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold rounded-2xl transition-all duration-200"
            >
              Join a Live Duet
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8 text-center">
        <p className="text-gray-600 text-sm">
          © 2024 A1 Music Platform · Built with AI for emotional music empowerment
        </p>
      </footer>
    </div>
  );
}
