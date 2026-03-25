import Link from "next/link";

const features = [
  {
    icon: "🎭",
    title: "Mood Detection",
    description:
      "Share how you feel through text or voice. A1 understands your emotions and meets you exactly where you are.",
  },
  {
    icon: "✍️",
    title: "Personalized Songwriting",
    description:
      "A1 crafts custom lyrics that fit your mood and story — verses, choruses, bridges, all tailored to you.",
  },
  {
    icon: "🎤",
    title: "AI Singing",
    description:
      "Your song comes alive with A1's expressive AI voice — soothing, energetic, or uplifting to match your vibe.",
  },
  {
    icon: "🎵",
    title: "Music Recommendations",
    description:
      "Discover tracks that match your emotions and evolve with your mood throughout the day.",
  },
  {
    icon: "🌊",
    title: "Mood Journeys",
    description:
      "Let A1 guide you from one emotional space to another — from sadness to strength, or stress to calm.",
  },
  {
    icon: "🤝",
    title: "Creative Partner",
    description:
      "Looking for inspiration? A1 co-writes songs to spark your creative process whenever you need it.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="animate-float inline-block mb-6 text-6xl">🎶</div>
        <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
          <span className="gradient-text">Empowerment</span>
          <br />
          <span className="text-purple-100">Through Music</span>
        </h1>
        <p className="text-lg sm:text-xl text-purple-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          A1 listens to how you feel, writes a song just for you, and sings it
          back. Your personal AI musician — always here, always in tune.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/mood"
            className="btn-primary px-8 py-4 rounded-2xl text-white font-bold text-lg inline-block"
          >
            Share Your Mood →
          </Link>
          <Link
            href="/recommendations"
            className="btn-secondary px-8 py-4 rounded-2xl text-purple-200 font-bold text-lg inline-block"
          >
            Discover Music
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center mb-2 gradient-text">
          What A1 Does
        </h2>
        <p className="text-center text-purple-300/70 mb-12">
          Six ways A1 uplifts and inspires you every day
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="glass-card rounded-2xl p-6 hover:border-purple-500/40 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/30"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-bold text-purple-100 mb-2">{title}</h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center mb-12 gradient-text">
          How It Works
        </h2>
        <div className="flex flex-col sm:flex-row gap-0 items-stretch">
          {[
            {
              step: "01",
              title: "Share How You Feel",
              desc: 'Type "I feel uncertain but hopeful" or speak your thoughts aloud.',
              icon: "💬",
            },
            {
              step: "02",
              title: "A1 Creates Your Song",
              desc: "A1 crafts lyrics, composes a melody, and produces a performance just for you.",
              icon: "🎼",
            },
            {
              step: "03",
              title: "Listen & Feel",
              desc: "Hear your custom song sung by A1's AI voice or download it to keep forever.",
              icon: "🎧",
            },
            {
              step: "04",
              title: "Share or Reflect",
              desc: "Share your track with a friend or let it inspire you through the day.",
              icon: "✨",
            },
          ].map(({ step, title, desc, icon }, i) => (
            <div key={step} className="flex flex-col sm:flex-row items-center flex-1">
              <div className="glass-card rounded-2xl p-6 flex-1 text-center hover:border-purple-500/40 transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-xs font-mono text-purple-500 mb-2">{step}</div>
                <h3 className="font-bold text-purple-100 mb-2">{title}</h3>
                <p className="text-xs text-purple-200/70 leading-relaxed">{desc}</p>
              </div>
              {i < 3 && (
                <div className="text-purple-600/40 text-2xl my-2 sm:mx-2 sm:my-0 rotate-90 sm:rotate-0">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="glass-card rounded-3xl p-12 border-purple-500/20">
          <div className="text-5xl mb-4">🎵</div>
          <h2 className="text-3xl font-black mb-4 gradient-text">
            Ready to Hear Your Song?
          </h2>
          <p className="text-purple-200/70 mb-8 max-w-md mx-auto">
            It only takes a moment. Tell A1 how you feel and let the music begin.
          </p>
          <Link
            href="/mood"
            className="btn-primary px-10 py-4 rounded-2xl text-white font-bold text-lg inline-block"
          >
            Get Started — It&apos;s Free
          </Link>
        </div>
      </section>
    </div>
  );
}
