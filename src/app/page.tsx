import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A1 – Music & Mood Empowerment Platform',
  description:
    'Discover A1: your AI-powered music companion that detects your mood, writes personalized songs, and curates playlists to lift your spirit.',
};

const stats = [
  { value: '36+', label: 'AI-Generated Songs' },
  { value: '12', label: 'Curated Playlists' },
  { value: '6', label: 'Mood Categories' },
  { value: '∞', label: 'Personalized Experiences' },
];

const features = [
  {
    emoji: '🎭',
    title: 'Mood Detection',
    description:
      'Our AI analyzes your text to pinpoint your exact emotional state across six mood dimensions in seconds.',
    href: '/mood-detection',
    color: 'from-purple-600/20 to-violet-600/20',
    border: 'border-purple-500/30',
  },
  {
    emoji: '✍️',
    title: 'AI Songwriting',
    description:
      'Select your mood and genre, then watch A1 compose a full song — lyrics, melody, tempo, and key — just for you.',
    href: '/ai-songwriting',
    color: 'from-violet-600/20 to-indigo-600/20',
    border: 'border-violet-500/30',
  },
  {
    emoji: '🎤',
    title: 'Live Duets',
    description:
      'Create or join live music sessions. Choose your instrument, record, and collaborate with friends in real time.',
    href: '/live-duets',
    color: 'from-indigo-600/20 to-blue-600/20',
    border: 'border-indigo-500/30',
  },
  {
    emoji: '🎵',
    title: 'Mood Playlists',
    description:
      'Explore 12 curated playlists crafted around every emotional state — from euphoric highs to reflective lows.',
    href: '/mood-playlists',
    color: 'from-pink-600/20 to-purple-600/20',
    border: 'border-pink-500/30',
  },
];

const steps = [
  {
    step: '01',
    title: 'Share Your Mood',
    description: 'Type how you\'re feeling or select from our mood categories.',
  },
  {
    step: '02',
    title: 'AI Creates Your Song',
    description: 'A1 composes a personalized song that matches your emotional state.',
  },
  {
    step: '03',
    title: 'Listen & Feel',
    description: 'Experience music tailored specifically to your mood and preferences.',
  },
  {
    step: '04',
    title: 'Share & Connect',
    description: 'Join live duets or share your unique musical journey with others.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32 sm:pt-32 sm:pb-40">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300 mb-8">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            AI-Powered Music Experience
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            Music that{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400">
              feels
            </span>{' '}
            like you
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            A1 detects your emotional state, writes personalized songs, and curates
            playlists to empower and uplift you — because every mood deserves its
            perfect soundtrack.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/mood-detection" className="btn-primary text-base w-full sm:w-auto text-center">
              Detect My Mood →
            </Link>
            <Link href="/ai-songwriting" className="btn-secondary text-base w-full sm:w-auto text-center">
              Generate a Song
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">
                {stat.value}
              </span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{' '}
              <span className="gradient-text">feel the music</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Four powerful features designed to make music deeply personal and
              emotionally resonant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className={`group relative overflow-hidden bg-gradient-to-br ${feature.color} border ${feature.border} rounded-2xl p-8 hover:border-purple-400/60 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-4 text-purple-400 text-sm font-medium group-hover:text-purple-300 flex items-center gap-1">
                  Explore <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 bg-white/2 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How <span className="gradient-text">A1</span> works
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From your mood to your music in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-purple-500/50 to-transparent z-0" />
                )}
                <div className="card-glass p-6 h-full relative z-10">
                  <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300 mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to discover your{' '}
            <span className="gradient-text">perfect sound?</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Start with a mood check-in and let A1 create music that moves with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/mood-detection" className="btn-primary w-full sm:w-auto text-center">
              Start Mood Detection
            </Link>
            <Link href="/mood-playlists" className="btn-secondary w-full sm:w-auto text-center">
              Browse Playlists
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
