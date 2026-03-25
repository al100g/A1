import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const VOICE_BY_MOOD: Record<string, "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"> = {
  sad: "shimmer",
  melancholic: "shimmer",
  hopeful: "nova",
  happy: "nova",
  excited: "alloy",
  motivated: "echo",
  calm: "fable",
  peaceful: "fable",
  anxious: "alloy",
  frustrated: "onyx",
  romantic: "shimmer",
};

export async function POST(req: NextRequest) {
  try {
    const { lyrics, mood } = await req.json();

    if (!lyrics || typeof lyrics !== "string") {
      return NextResponse.json({ error: "Lyrics are required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment." },
        { status: 503 }
      );
    }

    const voice = VOICE_BY_MOOD[mood?.toLowerCase()] ?? "nova";

    // Use just the first verse and chorus to keep audio short
    const shortText = lyrics
      .split("\n\n")
      .slice(0, 2)
      .join("\n\n")
      .slice(0, 4000);

    const mp3 = await getOpenAI().audio.speech.create({
      model: "tts-1",
      voice,
      input: shortText,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("TTS error:", err);
    return NextResponse.json(
      { error: "Failed to generate audio. Please try again." },
      { status: 500 }
    );
  }
}
