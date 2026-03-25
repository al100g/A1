"""
A1 – Music & Mood Empowerment App
Voice synthesis service: converts lyrics to sung/spoken audio via external
AI voice APIs (Uberduck, Replica Studios) with a graceful placeholder fallback.
"""

from __future__ import annotations

import os
import time
from typing import Optional

# ---------------------------------------------------------------------------
# Mood → voice style mapping
# ---------------------------------------------------------------------------

MOOD_VOICE_PROFILES: dict[str, dict] = {
    "happy": {
        "tone": "bright",
        "technique": "clear, energetic delivery",
        "pace": "upbeat",
        "description": "Bright, energetic vocals with a smile in the voice.",
    },
    "sad": {
        "tone": "soft",
        "technique": "gentle, heartfelt delivery",
        "pace": "slow",
        "description": "Gentle, heartfelt singing with subtle vibrato.",
    },
    "reflective": {
        "tone": "warm",
        "technique": "thoughtful, measured delivery",
        "pace": "moderate",
        "description": "Warm, thoughtful vocals with a conversational quality.",
    },
    "anxious": {
        "tone": "calm",
        "technique": "soothing, reassuring delivery",
        "pace": "slow",
        "description": "Soft, soothing voice designed to ground and comfort.",
    },
    "energized": {
        "tone": "powerful",
        "technique": "bold, driving delivery with occasional belting",
        "pace": "fast",
        "description": "Powerful, bold vocals that command attention.",
    },
}


def get_voice_profile(mood: str) -> dict:
    """Return the voice profile for the given mood."""
    mood = mood.lower().strip()
    return dict(MOOD_VOICE_PROFILES.get(mood, MOOD_VOICE_PROFILES["happy"]))


def synthesize_voice(
    lyrics: str,
    mood: str,
    uberduck_api_key: Optional[str] = None,
    uberduck_api_secret: Optional[str] = None,
    voice_uuid: str = "a1-signature",
) -> dict:
    """
    Synthesize a sung vocal track for the provided lyrics.

    Attempts to use the Uberduck singing API when credentials are available;
    falls back to a placeholder response otherwise.

    Returns a dict with:
        - 'mood'      : mood used
        - 'profile'   : voice profile dict
        - 'audio_url' : URL/path to the vocal audio (or None)
        - 'source'    : 'uberduck' or 'placeholder'
        - 'message'   : human-readable status string
    """
    mood = mood.lower().strip()
    profile = get_voice_profile(mood)

    key = uberduck_api_key or os.getenv("UBERDUCK_API_KEY")
    secret = uberduck_api_secret or os.getenv("UBERDUCK_API_SECRET")

    if key and secret:
        result = _call_uberduck(key, secret, lyrics, voice_uuid, mood, profile)
        if result:
            return result

    return {
        "mood": mood,
        "profile": profile,
        "audio_url": None,
        "source": "placeholder",
        "message": (
            f"Voice profile ready: {profile['description']} "
            "Connect Uberduck or Replica Studios credentials to generate real audio."
        ),
    }


def _call_uberduck(
    api_key: str,
    api_secret: str,
    lyrics: str,
    voice_uuid: str,
    mood: str,
    profile: dict,
) -> Optional[dict]:
    """
    Submit a singing job to Uberduck and poll for the result.
    Returns None on any error so callers can fall back gracefully.
    """
    try:
        import requests  # imported lazily

        auth = (api_key, api_secret)
        submit_payload = {
            "voicemodel_uuid": voice_uuid,
            "lyrics": lyrics,
            "backing_track": "",  # caller may provide a backing track URL
        }
        resp = requests.post(
            "https://api.uberduck.ai/tts/vocals",
            json=submit_payload,
            auth=auth,
            timeout=15,
        )
        resp.raise_for_status()
        job_uuid = resp.json().get("uuid")
        if not job_uuid:
            return None

        # Poll until the job completes (max ~60 s)
        for _ in range(20):
            time.sleep(3)
            status_resp = requests.get(
                "https://api.uberduck.ai/tts/vocals-response",
                params={"uuid": job_uuid},
                auth=auth,
                timeout=15,
            )
            status_resp.raise_for_status()
            data = status_resp.json()
            if data.get("finished_at"):
                return {
                    "mood": mood,
                    "profile": profile,
                    "audio_url": data.get("path"),
                    "source": "uberduck",
                    "message": "Uberduck vocal synthesis complete.",
                    "uberduck_data": data,
                }
        return None  # timed out
    except Exception:
        return None
