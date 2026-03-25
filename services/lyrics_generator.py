"""
A1 – Music & Mood Empowerment App
Lyrics generation service: builds personalised song lyrics from user mood,
theme, and preferences using an LLM (OpenAI) with a ruled fallback.
"""

from __future__ import annotations

import os
import re
from typing import Optional

# ---------------------------------------------------------------------------
# Mood metadata used by both the generator and the rest of the application
# ---------------------------------------------------------------------------

MOOD_METADATA: dict[str, dict] = {
    "happy": {
        "description": "joyful and celebratory",
        "style": "upbeat, bright, energetic",
        "example_line": "You light the world on fire, with every step your dreams get higher.",
    },
    "sad": {
        "description": "reflective and comforting",
        "style": "gentle, empathetic, hopeful",
        "example_line": (
            "The clouds may cover your skies for now, but the sun's been waiting for you."
        ),
    },
    "reflective": {
        "description": "calm and introspective",
        "style": "thoughtful, poetic, serene",
        "example_line": (
            "In the quiet hours between dusk and dawn, your story's still being written on."
        ),
    },
    "anxious": {
        "description": "reassuring and calming",
        "style": "soothing, warm, grounding",
        "example_line": (
            "Breathe in slowly, let go of the weight \u2013 "
            "you've already made it this far, it's not too late."
        ),
    },
    "energized": {
        "description": "powerful and motivating",
        "style": "high-energy, bold, empowering",
        "example_line": (
            "Raise your voice, the world's yours to claim \u2013 "
            "it's your time to rise and win the game."
        ),
    },
}

SONG_STRUCTURE = ["verse", "chorus", "verse", "chorus", "bridge", "chorus"]

# ---------------------------------------------------------------------------
# Fallback lyrics (used when no LLM key is configured)
# ---------------------------------------------------------------------------

FALLBACK_LYRICS: dict[str, dict[str, str]] = {
    "happy": {
        "verse": (
            "The morning comes alive with golden light,\n"
            "Every colour bright, every moment right.\n"
            "You carry hope inside your open heart,\n"
            "A brand-new chapter waiting for the start."
        ),
        "chorus": (
            "You light the world on fire,\n"
            "With every step your dreams get higher.\n"
            "Reach up and touch the sky,\n"
            "Tonight we'll learn to fly."
        ),
        "bridge": (
            "Nothing can stop the joy you bring,\n"
            "Let your heart soar, let your spirit sing."
        ),
    },
    "sad": {
        "verse": (
            "The room feels heavy, quiet, cold tonight,\n"
            "Each shadow seems to swallow up the light.\n"
            "You carry weight that no one else can see,\n"
            "But you are stronger than you'll ever believe."
        ),
        "chorus": (
            "The clouds may cover your skies for now,\n"
            "But the sun's been waiting for you somehow.\n"
            "Hold on a little longer, don't let go,\n"
            "After the rain, you'll feel your garden grow."
        ),
        "bridge": (
            "Every tear is proof of how much you care,\n"
            "And love like yours is found so rarely, anywhere."
        ),
    },
    "reflective": {
        "verse": (
            "Sitting by the window, watching the rain,\n"
            "Counting all the moments that shaped your name.\n"
            "The years have left their marks, both soft and deep,\n"
            "And all those stories yours alone to keep."
        ),
        "chorus": (
            "In the quiet hours between dusk and dawn,\n"
            "Your story's still being written on.\n"
            "Look back with grace, look forward with grace,\n"
            "You are exactly where you need to be in this space."
        ),
        "bridge": (
            "Stillness holds the answers you have sought,\n"
            "Peace is something patience finally taught."
        ),
    },
    "anxious": {
        "verse": (
            "Your thoughts are racing, heart beats out of time,\n"
            "The world feels steep and every hill a climb.\n"
            "But here, right now, you're safe within this song,\n"
            "You've made it through before – you still belong."
        ),
        "chorus": (
            "Breathe in slowly, let go of the weight,\n"
            "You've already made it this far, it's not too late.\n"
            "One step at a time, one breath, one day,\n"
            "You are not alone – I'll walk with you this way."
        ),
        "bridge": (
            "The storm inside will settle, give it time,\n"
            "Calm is on the other side of every climb."
        ),
    },
    "energized": {
        "verse": (
            "You wake up with fire burning in your chest,\n"
            "Today's the day you'll give it all your best.\n"
            "The world is wide and every door's ajar,\n"
            "Step into the light and own who you are."
        ),
        "chorus": (
            "Raise your voice, the world's yours to claim,\n"
            "It's your time to rise and win the game.\n"
            "Nothing holds you back, nothing holds you down,\n"
            "Wear your strength like an unbreakable crown."
        ),
        "bridge": (
            "Power up, push through, you're almost there,\n"
            "Success is breathing the same air."
        ),
    },
}


def _build_prompt(mood: str, theme: str, user_name: Optional[str]) -> str:
    """Construct the LLM prompt for personalised lyric generation."""
    meta = MOOD_METADATA.get(mood, MOOD_METADATA["happy"])
    name_clause = f" The song is written for someone named {user_name}." if user_name else ""
    return (
        f"You are a professional, empathetic songwriter.\n"
        f"Write a complete song with the following structure: "
        f"Verse 1, Chorus, Verse 2, Chorus, Bridge, Chorus.\n"
        f"Mood: {mood} ({meta['description']}).\n"
        f"Style: {meta['style']}.\n"
        f"Theme: {theme}.\n"
        f"{name_clause}\n"
        f"Label each section clearly (e.g. '[Verse 1]', '[Chorus]', '[Bridge]').\n"
        f"Keep lines singable (roughly 8–12 syllables each).\n"
        f"Do NOT include any explanation – only the song lyrics.\n"
    )


def _parse_llm_lyrics(raw: str) -> dict[str, str]:
    """
    Parse LLM-generated lyrics into a section dict keyed by lowercase section
    names ('verse', 'chorus', 'bridge').  Multiple verses are merged under
    the 'verse' key separated by a blank line.
    """
    sections: dict[str, list[str]] = {}
    current_key: Optional[str] = None
    for line in raw.splitlines():
        header_match = re.match(r"\[(.+?)\]", line.strip())
        if header_match:
            raw_key = header_match.group(1).lower()
            # Normalise "verse 1", "verse 2" → "verse"
            key = re.sub(r"\s*\d+$", "", raw_key).strip()
            if key not in sections:
                sections[key] = []
            current_key = key
        elif current_key is not None:
            sections[current_key].append(line)

    # Join each section's lines; strip leading/trailing whitespace
    return {k: "\n".join(v).strip() for k, v in sections.items() if v}


def generate_lyrics(
    mood: str,
    theme: str = "life",
    user_name: Optional[str] = None,
    openai_api_key: Optional[str] = None,
) -> dict:
    """
    Generate personalised song lyrics for the given mood.

    Returns a dict with:
        - 'mood'      : the mood used
        - 'theme'     : the theme used
        - 'structure' : list of section names in song order
        - 'sections'  : dict mapping section name → lyric text
        - 'full_lyrics': the full song as a single string
        - 'source'    : 'llm' or 'fallback'
    """
    mood = mood.lower().strip()
    if mood not in MOOD_METADATA:
        mood = "happy"

    api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
    sections: dict[str, str] = {}
    source = "fallback"

    if api_key:
        try:
            import openai  # imported lazily so the module works without it

            client = openai.OpenAI(api_key=api_key)
            prompt = _build_prompt(mood, theme, user_name)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=800,
                temperature=0.85,
            )
            raw = response.choices[0].message.content or ""
            sections = _parse_llm_lyrics(raw)
            source = "llm"
        except Exception:
            sections = {}

    if not sections:
        sections = dict(FALLBACK_LYRICS.get(mood, FALLBACK_LYRICS["happy"]))

    # Build full lyrics in SONG_STRUCTURE order
    ordered: list[str] = []
    for section in SONG_STRUCTURE:
        text = sections.get(section, "")
        if text:
            label = (
                section
                .replace("verse", "Verse")
                .replace("chorus", "Chorus")
                .replace("bridge", "Bridge")
            )
            ordered.append(f"[{label}]\n{text}")

    full_lyrics = "\n\n".join(ordered)

    return {
        "mood": mood,
        "theme": theme,
        "structure": SONG_STRUCTURE,
        "sections": sections,
        "full_lyrics": full_lyrics,
        "source": source,
    }
