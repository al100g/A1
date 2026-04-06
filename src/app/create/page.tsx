"use client";

import { useState } from "react";
import Link from "next/link";

const GENRES = ["Pop", "R&B", "Hip-Hop", "Indie", "Rock", "Lo-fi", "Country", "EDM"];
const MOODS = ["Happy", "Sad", "Energetic", "Calm", "Hopeful", "Romantic", "Angry", "Nostalgic"];
const THEMES = ["Love", "Growth", "Heartbreak", "Freedom", "Friendship", "Resilience", "Dreams", "Nature"];

const SAMPLE_LYRICS: Record<string, string> = {
  Happy: `[Verse 1]
The morning sun is painting gold
A brand-new story to be told
I'm stepping out into the light
Everything feels finally right

[Chorus]
I'm alive, I'm alive
Watch me rise, watch me thrive
Nothing's gonna dim this fire inside
I'm alive, I'm alive

[Verse 2]
The world is bright and full of grace
A smile breaking through my face
The weight I carried is now gone
I'm free, I'm moving on

[Bridge]
This is my moment, this is my time
Every blessing, every sign
I claim this joy, I hold it near
The best of life is finally here`,

  Sad: `[Verse 1]
The empty chair across the room
Still holds the echo of your perfume
I reach for you in morning light
But you've been gone since before night

[Chorus]
Where do the pieces go
When love is all you know
I'm searching in the after
For the you I used to know

[Verse 2]
The photographs along the wall
Remind me how we had it all
I'm learning how to breathe again
Through all this beautiful pain

[Bridge]
Maybe someday I'll understand
Why you let go of my hand
But for now I'll let it fall
These tears that say it all`,

  Calm: `[Verse 1]
The river runs so soft and slow
Through meadows where the wildflowers grow
I lay my burdens on the shore
And breathe in peace like never before

[Chorus]
Still, still, be still
Let the quiet work its will
Every worry fades away
In this gentle golden day

[Verse 2]
The world can wait a little while
I'm learning just to breathe and smile
No rush, no race, no need to run
Just warm beneath the afternoon sun`,
};

function generateLyrics(mood: string): string {
  return SAMPLE_LYRICS[mood] ?? SAMPLE_LYRICS["Calm"] ?? "";
}

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [message, setMessage] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [generating, setGenerating] = useState(false);

  function handleGenerate() {
    if (!mood) return;
    setGenerating(true);
    setTimeout(() => {
      setLyrics(generateLyrics(mood));
      setStep(3);
      setGenerating(false);
    }, 2000);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black text-white">
          ✍️ Create Your Song
        </h1>
        <p className="text-white/60">
          Tell A1 what you&apos;re feeling and it will write a song just for you.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-10 flex items-center gap-3">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${
                step >= s
                  ? "bg-purple-600 text-white"
                  : "border border-white/20 bg-transparent text-white/40"
              }`}
            >
              {s}
            </div>
            <span className="text-xs text-white/40">
              {s === 1 ? "Style" : s === 2 ? "Message" : "Your Song"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1 — Style */}
      {step === 1 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-lg font-bold text-white">Choose your style</h2>

          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-white/70">
              Mood *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    mood === m
                      ? "border-purple-500 bg-purple-500/20 text-purple-300"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-white/70">
              Genre (optional)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(genre === g ? "" : g)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    genre === g
                      ? "border-pink-500 bg-pink-500/20 text-pink-300"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="mb-3 block text-sm font-semibold text-white/70">
              Theme (optional)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(theme === t ? "" : t)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    theme === t
                      ? "border-amber-500 bg-amber-500/20 text-amber-300"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!mood}
            className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition hover:bg-purple-500 disabled:opacity-40"
          >
            Next: Add Your Message →
          </button>
        </div>
      )}

      {/* Step 2 — Message */}
      {step === 2 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-lg font-bold text-white">
            What&apos;s your song about?
          </h2>

          <div className="mb-2 flex flex-wrap gap-2 text-xs text-white/50">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Mood: <strong className="text-purple-400">{mood}</strong>
            </span>
            {genre && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Genre: <strong className="text-pink-400">{genre}</strong>
              </span>
            )}
            {theme && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Theme: <strong className="text-amber-400">{theme}</strong>
              </span>
            )}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. I want to capture how I feel after overcoming a hard year and finally feeling free..."
            rows={5}
            className="mt-4 mb-6 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 rounded-xl border border-white/20 bg-white/5 py-3 font-semibold text-white/70 transition hover:bg-white/10"
            >
              ← Back
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex-[2] rounded-xl bg-purple-600 py-3 font-bold text-white transition hover:bg-purple-500 disabled:opacity-60"
            >
              {generating ? "A1 is writing your song…" : "✨ Generate My Song →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Lyrics */}
      {step === 3 && lyrics && (
        <div>
          <div className="mb-6 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4 text-center">
            <p className="text-sm text-white/60">
              A1 wrote a <strong className="text-purple-300">{mood}</strong>
              {genre ? ` ${genre}` : ""} song{theme ? ` about ${theme}` : ""} for you
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Your Custom Song</h2>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(lyrics);
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 transition hover:bg-white/10"
              >
                Copy Lyrics
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/80">
              {lyrics}
            </pre>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setStep(1);
                setMood("");
                setGenre("");
                setTheme("");
                setMessage("");
                setLyrics("");
              }}
              className="w-full rounded-xl border border-white/20 bg-white/5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Create Another Song
            </button>
            <Link
              href="/playlists"
              className="w-full rounded-xl bg-pink-600 py-3 text-center font-bold text-white transition hover:bg-pink-500"
            >
              Browse Mood Playlists →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
