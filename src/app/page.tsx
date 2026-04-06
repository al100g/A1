import Link from "next/link";

const features = [
  {
    emoji: "🎭",
    title: "Mood Detection",
    description:
      "Tell A1 how you feel — in text or voice. Our AI instantly reads your emotional state.",
    href: "/mood",
    cta: "Detect My Mood",
    color: "from-purple-500 to-indigo-600",
  },
  {
    emoji: "✍️",
    title: "AI Songwriting",
    description:
      "A1 crafts personalized lyrics that match your mood, complete with verses, choruses, and bridges.",
    href: "/create",
    cta: "Create a Song",
    color: "from-pink-500 to-rose-600",
  },
  {
    emoji: "🎵",
    title: "Mood Playlists",
    description:
      "Curated playlists that evolve with your emotions — from energizing anthems to calming escapes.",
    href: "/playlists",
    cta: "Browse Playlists",
    color: "from-amber-500 to-orange-600",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <section className="mb-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
          </span>
          Powered by AI — Made for You
        </div>

        <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-7xl">
          <span className="text-white">Your music.</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your mood.
          </span>
          <br />
          <span className="text-white">Your A1.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">
          A1 detects your emotions, writes personalized songs, and sings them
          just for you. It&apos;s your AI music companion — always in tune with
          how you feel.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/mood"
            className="rounded-xl bg-purple-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-purple-500 active:scale-95"
          >
            Start with My Mood →
          </Link>
          <Link
            href="/create"
            className="rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10 active:scale-95"
          >
            Create a Song
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mb-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Everything A1 does for you
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/8"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-2xl shadow-lg`}
              >
                {f.emoji}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{f.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/50">
                {f.description}
              </p>
              <Link
                href={f.href}
                className="text-sm font-semibold text-purple-400 transition hover:text-purple-300"
              >
                {f.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-24 text-center">
        <h2 className="mb-12 text-3xl font-bold text-white">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-4">
          {[
            { step: "1", title: "Share your mood", desc: "Type how you feel right now" },
            { step: "2", title: "A1 listens", desc: "AI analyzes your emotional state" },
            { step: "3", title: "Song is created", desc: "Lyrics crafted just for you" },
            { step: "4", title: "Enjoy & share", desc: "Listen, download, or share" },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                {item.step}
              </div>
              <h3 className="font-bold text-white">{item.title}</h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-12 text-center">
        <h2 className="mb-4 text-3xl font-black text-white">
          Ready to feel the music?
        </h2>
        <p className="mb-8 text-white/60">
          Join A1 and experience music that truly understands you.
        </p>
        <Link
          href="/mood"
          className="inline-block rounded-xl bg-purple-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-purple-500 active:scale-95"
        >
          Get Started Free →
        </Link>
      </section>
    </div>
  );
}
