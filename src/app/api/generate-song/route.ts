import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function sanitizeInput(input: string, maxLength: number): string {
  return input
    .slice(0, maxLength)
    .replace(/[^\w\s.,!?'"()\-–—áéíóúàèìòùâêîôûäëïöüñçæøåß]/gi, "")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const { mood, emotion, intensity, input } = await req.json();

    if (!mood && !input) {
      return NextResponse.json({ error: "Mood or input is required" }, { status: 400 });
    }

    const safeMood = sanitizeInput(String(mood || ""), 50);
    const safeEmotion = sanitizeInput(String(emotion || ""), 100);
    const safeInput = sanitizeInput(String(input || ""), 500);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(getMockSong(safeMood, safeEmotion));
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are A1, a world-class AI songwriter who creates deeply personal, emotionally resonant songs.
Write a complete song with:
- title: a poetic song title
- genre: the most fitting genre (pop, indie, soul, R&B, folk, etc.)
- theme: a one-sentence theme for the song
- lyrics with 4 sections: verse1, chorus, verse2, bridge

Each section should have 4-6 lines. Make the lyrics personal, authentic, and match the emotional tone.
Do NOT include section labels in the lyrics text themselves.
Respond ONLY with valid JSON, no markdown. Format:
{
  "title": "...",
  "genre": "...",
  "theme": "...",
  "lyrics": {
    "verse1": "...",
    "chorus": "...",
    "verse2": "...",
    "bridge": "..."
  }
}`,
        },
        {
          role: "user",
          content: `Write a song for someone feeling: ${safeEmotion || safeMood} (intensity: ${intensity}/10).
Their words: "${safeInput}"`,
        },
      ],
      max_tokens: 800,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(content);

    return NextResponse.json({
      title: parsed.title ?? "Your Song",
      mood: safeMood || "reflective",
      emotion: safeEmotion || parsed.genre,
      genre: parsed.genre ?? "indie pop",
      theme: parsed.theme ?? "A personal journey",
      lyrics: {
        verse1: parsed.lyrics?.verse1 ?? "",
        chorus: parsed.lyrics?.chorus ?? "",
        verse2: parsed.lyrics?.verse2 ?? "",
        bridge: parsed.lyrics?.bridge ?? "",
      },
    });
  } catch (err) {
    console.error("Song generation error:", err);
    return NextResponse.json(getMockSong("hopeful", "quietly hopeful"));
  }
}

function getMockSong(mood: string, emotion: string) {
  const songs: Record<string, object> = {
    sad: {
      title: "Through the Rain",
      mood,
      emotion: emotion || "sorrowful",
      genre: "indie folk",
      theme: "Finding beauty even in the darkest moments",
      lyrics: {
        verse1: "The quiet fills the empty room\nAnd silence speaks of what's been lost\nI trace the outline of your shadow\nAnd count the words that carried cost",
        chorus: "But I will find my way through the rain\nEvery tear a seed of something new\nThough today the skies are heavy\nI know I'll find the light again soon",
        verse2: "The photographs all fade to grey\nBut memory keeps color true\nI hold the moments that we lived\nAnd let them carry me right through",
        bridge: "There's beauty in the breaking\nA grace in letting go\nEvery storm has taught me something\nEvery scar has helped me grow",
      },
    },
    happy: {
      title: "Golden Days",
      mood,
      emotion: emotion || "joyful",
      genre: "pop",
      theme: "Celebrating the simple joys of being alive",
      lyrics: {
        verse1: "The morning light is painting gold\nOn everything my eyes can see\nI feel the warmth of something real\nAnd I know this is where I need to be",
        chorus: "These are golden days, golden days\nEvery breath a gift I celebrate\nWith a grateful heart and open hands\nI'm alive and it feels so great",
        verse2: "The laughter fills the summer air\nAnd everything just falls in place\nI'm dancing with the universe\nA smile wide across my face",
        bridge: "Count the blessings not the burdens\nFind the music in the noise\nThis is living, this is breathing\nThis is finding all my joys",
      },
    },
  };

  return songs[mood] ?? {
    title: "A New Chapter",
    mood,
    emotion: emotion || "hopeful",
    genre: "indie pop",
    theme: "Standing at the edge of possibility and choosing hope",
    lyrics: {
      verse1: "I stand here at the crossroads\nWith questions in my hands\nThe future soft and unmapped\nLike footprints in the sands",
      chorus: "But hope is what I'm carrying\nHope is what I know\nEven when the road seems winding\nHope will help me grow",
      verse2: "There's courage in the unknown\nAnd beauty in the wait\nEvery ending is a doorway\nEvery loss can become great",
      bridge: "I choose to trust the journey\nI choose to feel the light\nEven in uncertainty\nI choose to get this right",
    },
  };
}
