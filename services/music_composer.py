"""
A1 – Music & Mood Empowerment App
Music composition service: maps user mood to instrument/style metadata and
(optionally) delegates to external AI composition APIs (AIVA, Google Magenta).
"""

from __future__ import annotations

import os
from typing import Optional

# ---------------------------------------------------------------------------
# Mood → music style mapping
# ---------------------------------------------------------------------------

MOOD_MUSIC_PROFILES: dict[str, dict] = {
    "happy": {
        "tempo": "upbeat",
        "bpm": 128,
        "key": "C major",
        "instruments": ["acoustic guitar", "drums", "strings", "piano"],
        "style": "pop",
        "description": "Bright, upbeat pop with strings, acoustic guitar and driving drums.",
    },
    "sad": {
        "tempo": "slow",
        "bpm": 60,
        "key": "D minor",
        "instruments": ["solo piano", "acoustic guitar", "soft strings"],
        "style": "ballad",
        "description": "Soft piano ballad with gentle acoustic guitar and understated strings.",
    },
    "reflective": {
        "tempo": "moderate",
        "bpm": 80,
        "key": "G major",
        "instruments": ["piano", "acoustic guitar", "light percussion", "ambient pads"],
        "style": "indie-folk",
        "description": "Calm indie-folk with piano, acoustic guitar, and airy ambient pads.",
    },
    "anxious": {
        "tempo": "slow",
        "bpm": 65,
        "key": "A minor",
        "instruments": ["solo piano", "soft strings", "gentle synth pads"],
        "style": "ambient-classical",
        "description": "Soothing ambient-classical with warm piano and gentle synth pads.",
    },
    "energized": {
        "tempo": "fast",
        "bpm": 140,
        "key": "E major",
        "instruments": ["electric guitar", "drums", "bass", "synth leads"],
        "style": "pop-rock",
        "description": "High-energy pop-rock with electric guitar, punchy drums, and synth leads.",
    },
}


def get_music_profile(mood: str) -> dict:
    """Return the music profile for the given mood."""
    mood = mood.lower().strip()
    return dict(MOOD_MUSIC_PROFILES.get(mood, MOOD_MUSIC_PROFILES["happy"]))


def adjust_profile(profile: dict, adjustment: str) -> dict:
    """
    Apply a natural-language style adjustment to a music profile.

    Supported adjustments (case-insensitive substrings):
        "more upbeat" / "upbeat"  → increase bpm by 20, tempo → "upbeat"
        "slower" / "slow"         → decrease bpm by 20, tempo → "slow"
        "piano"                   → set lead instrument to solo piano
        "strings"                 → add strings if not present
        "acoustic"                → add acoustic guitar if not present
    """
    profile = dict(profile)  # shallow copy – instruments list copied below
    profile["instruments"] = list(profile.get("instruments", []))

    adj = adjustment.lower()

    if "more upbeat" in adj or "upbeat" in adj:
        profile["bpm"] = min(profile.get("bpm", 100) + 20, 200)
        profile["tempo"] = "upbeat"
    elif "slower" in adj or "slow" in adj:
        profile["bpm"] = max(profile.get("bpm", 100) - 20, 40)
        profile["tempo"] = "slow"

    if "piano" in adj and "solo piano" not in profile["instruments"]:
        profile["instruments"].insert(0, "solo piano")

    if "strings" in adj and "strings" not in profile["instruments"]:
        profile["instruments"].append("strings")

    if "acoustic" in adj and "acoustic guitar" not in profile["instruments"]:
        profile["instruments"].append("acoustic guitar")

    return profile


def compose_music(
    mood: str,
    adjustment: Optional[str] = None,
    aiva_api_key: Optional[str] = None,
) -> dict:
    """
    Compose (or describe) music for the given mood.

    When an AIVA API key is available the function calls AIVA's REST endpoint
    to kick off a composition job and returns the job details alongside the
    local profile.  Without a key the function returns the local profile with
    a placeholder audio URL so the rest of the pipeline can operate normally.

    Returns a dict with:
        - 'mood'        : mood used
        - 'profile'     : music profile dict
        - 'audio_url'   : URL/path to the audio (placeholder or real)
        - 'source'      : 'aiva', 'magenta', or 'placeholder'
        - 'message'     : human-readable status string
    """
    mood = mood.lower().strip()
    profile = get_music_profile(mood)

    if adjustment:
        profile = adjust_profile(profile, adjustment)

    api_key = aiva_api_key or os.getenv("AIVA_API_KEY")

    if api_key:
        result = _call_aiva(api_key, profile, mood)
        if result:
            return result

    # Placeholder response used during development / when no API key is set
    return {
        "mood": mood,
        "profile": profile,
        "audio_url": None,
        "source": "placeholder",
        "message": (
            f"Music profile ready: {profile['description']} "
            f"({profile['bpm']} BPM, {profile['key']}). "
            "Connect an AIVA or Magenta API key to generate real audio."
        ),
    }


def _call_aiva(api_key: str, profile: dict, mood: str) -> Optional[dict]:
    """
    Attempt to create a composition via AIVA's REST API.
    Returns None if the request fails, allowing callers to fall back gracefully.
    """
    try:
        import requests  # imported lazily

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "name": f"A1 – {mood.capitalize()} Song",
            "styles": [profile.get("style", "pop")],
            "tempo": profile.get("tempo", "moderate"),
            "duration": 180,
            "key": profile.get("key", "C major"),
        }
        resp = requests.post(
            "https://api.aiva.ai/v1/compositions",
            json=payload,
            headers=headers,
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json()
        return {
            "mood": mood,
            "profile": profile,
            "audio_url": data.get("download_url") or data.get("preview_url"),
            "source": "aiva",
            "message": f"AIVA composition created: {data.get('name', 'Untitled')}",
            "aiva_data": data,
        }
    except Exception:
        return None
