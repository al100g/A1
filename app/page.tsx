import Link from 'next/link';
import { Music, Brain, Users, ListMusic } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Mood Detection',
    description: 'AI-powered mood analysis from your text. Understand your emotions and get personalized music recommendations.',
    href: '/mood',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
  },
  {
    icon: Music,
    title: 'AI Songwriting',
    description: 'Generate unique song lyrics tailored to your mood and preferred genre using advanced AI.',
    href: '/songs',
    color: 'text-violet-400',
    bgColor: 'bg-violet-400/10',
    borderColor: 'border-violet-400/20',
  },
  {
    icon: Users,
    title: 'Live Duets',
    description: 'Collaborate in real-time with other musicians. Create rooms, share lyrics, and make music together.',
    href: '/duets',
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-400/10',
    borderColor: 'border-fuchsia-400/20',
  },
  {
    icon: ListMusic,
    title: 'Mood Playlists',
    description: 'Curated playlists that match your current mood. Discover new music that resonates with how you feel.',
    href: '/playlists',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'border-indigo-400/20',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI-Powered Music Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Feel the Music,</span>
            <br />
            <span className="text-white">Live the Moment</span>
          </h1>
          <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
            A1 transforms your emotions into music. Detect your mood, generate personalized lyrics,
            collaborate in live duets, and discover playlists that match your vibe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mood"
              className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
            >
              Detect My Mood
            </Link>
            <Link
              href="/songs"
              className="bg-purple-900/50 hover:bg-purple-800/50 text-purple-200 border border-purple-500/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105"
            >
              Generate Lyrics
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Everything You Need to Express Yourself
          </h2>
          <p className="text-purple-300 text-center mb-12 max-w-2xl mx-auto">
            Four powerful features working together to create your perfect musical journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className={`group card-gradient border ${feature.borderColor} rounded-2xl p-8 hover:scale-[1.02] transition-all duration-200 hover:shadow-lg`}
                >
                  <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-purple-300 leading-relaxed">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-purple-300 mb-8">
            Join thousands of musicians and music lovers who use A1 to express their emotions through music.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
