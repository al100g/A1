import { NextRequest, NextResponse } from "next/server";

export type Mood = {
  label: string;
  emoji: string;
  intensity: number; // 0–100
  keywords: string[];
  color: string;
};

const MOOD_MAP: Record<string, Mood> = {
  happy: {
    label: "Happy",
    emoji: "😊",
    intensity: 85,
    keywords: ["joy", "elated", "cheerful", "great", "wonderful", "excited", "love", "amazing"],
    color: "mood-gradient-happy",
  },
  sad: {
    label: "Sad",
    emoji: "😢",
    intensity: 70,
    keywords: ["sad", "down", "depressed", "unhappy", "lonely", "miss", "cry", "hurt"],
    color: "mood-gradient-sad",
  },
  energetic: {
    label: "Energetic",
    emoji: "⚡",
    intensity: 95,
    keywords: ["energy", "pumped", "motivated", "hype", "fire", "power", "strong", "ready"],
    color: "mood-gradient-energetic",
  },
  calm: {
    label: "Calm",
    emoji: "🌿",
    intensity: 40,
    keywords: ["calm", "peaceful", "relax", "chill", "serene", "quiet", "still", "gentle"],
    color: "mood-gradient-calm",
  },
  romantic: {
    label: "Romantic",
    emoji: "💕",
    intensity: 75,
    keywords: ["love", "romance", "heart", "date", "beautiful", "tender", "affection", "crush"],
    color: "mood-gradient-romantic",
  },
  melancholic: {
    label: "Melancholic",
    emoji: "🌧️",
    intensity: 60,
    keywords: ["melancholy", "nostalgic", "wistful", "longing", "bittersweet", "distant", "fading"],
    color: "mood-gradient-melancholic",
  },
};

function detectMood(text: string): Mood {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [moodKey, mood] of Object.entries(MOOD_MAP)) {
    scores[moodKey] = mood.keywords.reduce(
      (acc, kw) => acc + (lower.includes(kw) ? 1 : 0),
      0
    );
  }

  const topMood = Object.entries(scores).sort(([, a], [, b]) => b - a)[0];

  if (topMood[1] === 0) {
    // Default to calm if nothing detected
    return { ...MOOD_MAP.calm, intensity: 50 };
  }

  return {
    ...MOOD_MAP[topMood[0]],
    intensity: Math.min(100, MOOD_MAP[topMood[0]].intensity + topMood[1] * 5),
  };
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json() as { text: string };

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "text field is required" },
        { status: 400 }
      );
    }

    if (text.length > 2000) {
      return NextResponse.json(
        { error: "text must be 2000 characters or fewer" },
        { status: 400 }
      );
    }

    const mood = detectMood(text.trim());

    return NextResponse.json({ mood });
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze mood" },
      { status: 500 }
    );
  }
}
