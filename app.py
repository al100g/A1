"""
A1 – Music & Mood Empowerment App
Flask application entry point.

Environment variables (all optional – the app runs without them):
    OPENAI_API_KEY   – enables AI-powered lyric generation via GPT-4o-mini
    AIVA_API_KEY     – enables AIVA music composition
    UBERDUCK_API_KEY / UBERDUCK_API_SECRET – enables Uberduck vocal synthesis
    SECRET_KEY       – Flask session secret (defaults to a dev key)
"""

from __future__ import annotations

import os

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request

from services.lyrics_generator import MOOD_METADATA, generate_lyrics
from services.music_composer import compose_music
from services.voice_synthesizer import synthesize_voice

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "a1-dev-secret-change-in-production")


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.route("/")
def index():
    moods = list(MOOD_METADATA.keys())
    return render_template("index.html", moods=moods)


@app.route("/api/generate", methods=["POST"])
def api_generate():
    """
    Generate a personalised song (lyrics + music profile + voice profile).

    Expected JSON body:
        mood       (str, required)  – one of the supported moods
        theme      (str, optional)  – song theme, e.g. "love", "life"
        user_name  (str, optional)  – personalise the lyrics with this name
        adjustment (str, optional)  – style tweak, e.g. "make it more upbeat"
    """
    data = request.get_json(silent=True) or {}

    mood: str = (data.get("mood") or "happy").strip()
    theme: str = (data.get("theme") or "life").strip()
    user_name: str | None = (data.get("user_name") or "").strip() or None
    adjustment: str | None = (data.get("adjustment") or "").strip() or None

    lyrics_result = generate_lyrics(mood=mood, theme=theme, user_name=user_name)
    resolved_mood = lyrics_result["mood"]  # normalised by generate_lyrics
    music_result = compose_music(mood=resolved_mood, adjustment=adjustment)
    voice_result = synthesize_voice(
        lyrics=lyrics_result["full_lyrics"],
        mood=resolved_mood,
    )

    return jsonify(
        {
            "mood": resolved_mood,
            "theme": theme,
            "lyrics": lyrics_result,
            "music": {
                "profile": music_result["profile"],
                "audio_url": music_result.get("audio_url"),
                "source": music_result["source"],
                "message": music_result["message"],
            },
            "voice": {
                "profile": voice_result["profile"],
                "audio_url": voice_result.get("audio_url"),
                "source": voice_result["source"],
                "message": voice_result["message"],
            },
        }
    )


@app.route("/api/moods", methods=["GET"])
def api_moods():
    """Return all supported moods with their descriptions."""
    return jsonify(
        {
            mood: {
                "description": meta["description"],
                "style": meta["style"],
                "example_line": meta["example_line"],
            }
            for mood, meta in MOOD_METADATA.items()
        }
    )


@app.route("/api/adjust", methods=["POST"])
def api_adjust():
    """
    Adjust the music profile for an existing mood.

    Expected JSON body:
        mood       (str, required)
        adjustment (str, required) – e.g. "make it more upbeat" / "add piano"
    """
    data = request.get_json(silent=True) or {}
    mood: str = (data.get("mood") or "happy").strip()
    adjustment: str = (data.get("adjustment") or "").strip()

    if not adjustment:
        return jsonify({"error": "adjustment is required"}), 400

    result = compose_music(mood=mood, adjustment=adjustment)
    return jsonify(
        {
            "mood": mood,
            "profile": result["profile"],
            "audio_url": result.get("audio_url"),
            "source": result["source"],
            "message": result["message"],
        }
    )


# ---------------------------------------------------------------------------
# Dev server entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode, port=5000)
