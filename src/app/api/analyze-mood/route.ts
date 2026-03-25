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
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const safeText = sanitizeInput(text, 1000);

    if (!process.env.OPENAI_API_KEY) {
      // Fallback for demo without API key
      return NextResponse.json(getMockMoodAnalysis(safeText));
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an empathetic mood analysis AI. Analyze the emotional content of the user's message and return a JSON object with:
- mood: a single word mood label (e.g., "sad", "hopeful", "anxious", "joyful", "frustrated", "calm", "excited", "melancholic")
- emotion: a short descriptive phrase (e.g., "quietly hopeful", "deeply melancholic")
- intensity: a number from 1-10 representing emotional intensity
- summary: one sentence describing their emotional state

Respond ONLY with valid JSON, no markdown.`,
        },
        {
          role: "user",
          content: safeText,
        },
      ],
      max_tokens: 200,
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(content);

    return NextResponse.json({
      mood: parsed.mood ?? "reflective",
      emotion: parsed.emotion ?? "thoughtful",
      intensity: parsed.intensity ?? 5,
      summary: parsed.summary ?? "",
    });
  } catch (err) {
    // If OpenAI fails, return a sensible fallback
    console.error("Mood analysis error:", err);
    return NextResponse.json(getMockMoodAnalysis(""));
  }
}

function getMockMoodAnalysis(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("sad") || lower.includes("down") || lower.includes("cry")) {
    return { mood: "sad", emotion: "quietly sorrowful", intensity: 7, summary: "You're feeling sad and need some comfort." };
  }
  if (lower.includes("happy") || lower.includes("great") || lower.includes("joy")) {
    return { mood: "happy", emotion: "genuinely joyful", intensity: 8, summary: "You're in a great mood and feeling positive." };
  }
  if (lower.includes("anxi") || lower.includes("stress") || lower.includes("worry")) {
    return { mood: "anxious", emotion: "worried and tense", intensity: 7, summary: "You're feeling anxious and overwhelmed." };
  }
  if (lower.includes("motiv") || lower.includes("ready") || lower.includes("strong")) {
    return { mood: "motivated", emotion: "driven and powerful", intensity: 9, summary: "You're feeling motivated and ready to take on the world." };
  }
  if (lower.includes("calm") || lower.includes("peace") || lower.includes("relax")) {
    return { mood: "calm", emotion: "peacefully centered", intensity: 4, summary: "You're feeling calm and at peace." };
  }
  return { mood: "hopeful", emotion: "quietly hopeful", intensity: 6, summary: "You're feeling a mix of uncertainty and hope." };
}
