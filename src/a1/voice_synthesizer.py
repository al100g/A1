"""Voice synthesizer module for A1.

Provides an adapter interface for AI singing / voice-synthesis back-ends
(Replica Studios, Uberduck, Vocaloid-style systems) and a built-in
:class:`OfflineVoiceSynthesizer` that returns a formatted script of the
lyrics for demonstration purposes.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass

from a1.lyrics_generator import Lyrics
from a1.mood_detector import Mood, MoodCategory

# ---------------------------------------------------------------------------
# Synthesis result
# ---------------------------------------------------------------------------


@dataclass
class SynthesisResult:
    """The output of a voice synthesis operation.

    Attributes:
        audio_url:    URL or local file path to the generated audio file.
                      ``None`` for offline/dry-run mode.
        script:       The formatted lyric script that was (or would be) sung.
        voice_style:  Description of the vocal style used.
        provider:     Name of the synthesis back-end.
    """

    audio_url: str | None
    script: str
    voice_style: str
    provider: str

    def summary(self) -> str:
        lines = [
            f"Provider   : {self.provider}",
            f"Voice style: {self.voice_style}",
        ]
        if self.audio_url:
            lines.append(f"Audio file : {self.audio_url}")
        else:
            lines.append("Audio file : (not generated – offline mode)")
        lines += ["", "─── Script ───", self.script]
        return "\n".join(lines)


# ---------------------------------------------------------------------------
# Voice style guidance keyed by mood
# ---------------------------------------------------------------------------

_VOICE_STYLES: dict[MoodCategory, dict[str, str]] = {
    MoodCategory.HAPPY: {
        "style": "bright, warm, and energetic with a light vibrato on sustained notes",
        "technique": "clear chest voice, occasional light falsetto on high phrases",
    },
    MoodCategory.SAD: {
        "style": "soft, breathy, and intimate with restrained dynamics",
        "technique": "head voice for high notes, deliberate micro-pauses for emotion",
    },
    MoodCategory.REFLECTIVE: {
        "style": "gentle, measured, and melodic with a storytelling quality",
        "technique": "mixed voice, subtle dynamics between verse and chorus",
    },
    MoodCategory.ANXIOUS: {
        "style": "soft and reassuring, starting quiet and gradually strengthening",
        "technique": "controlled breath support, gradual dynamic swell into the chorus",
    },
    MoodCategory.ENERGIZED: {
        "style": "powerful, full-throated, and anthemic with strong consonant attacks",
        "technique": "full chest voice, belting on the chorus high notes",
    },
    MoodCategory.CALM: {
        "style": "airy, peaceful, and unhurried with long, flowing phrases",
        "technique": "relaxed head voice, minimal vibrato, plenty of space between lines",
    },
    MoodCategory.ROMANTIC: {
        "style": "warm, lush, and expressive with tender phrasing",
        "technique": "mixed voice with gentle vibrato, leaning into emotionally charged words",
    },
    MoodCategory.INSPIRED: {
        "style": "clear, uplifting, and soaring with a hopeful tone",
        "technique": "bright chest voice building to an open, resonant chorus delivery",
    },
}


# ---------------------------------------------------------------------------
# Adapter interface
# ---------------------------------------------------------------------------


class VoiceSynthesizerAdapter(ABC):
    """Abstract adapter for AI voice / singing synthesis back-ends."""

    @abstractmethod
    def synthesize(self, lyrics: Lyrics, mood: Mood) -> SynthesisResult:
        """Synthesize a vocal performance of *lyrics* in *mood*.

        Args:
            lyrics: The full set of song lyrics to perform.
            mood:   The user's current emotional state, used to select
                    vocal style.

        Returns:
            A :class:`SynthesisResult` instance.
        """


# ---------------------------------------------------------------------------
# Offline adapter
# ---------------------------------------------------------------------------


class OfflineVoiceSynthesizer(VoiceSynthesizerAdapter):
    """Returns a formatted lyric script without calling any external API.

    Useful for prototyping and testing.  Prints vocal-direction notes so
    a human (or future TTS engine) knows exactly how to perform each section.
    """

    def synthesize(self, lyrics: Lyrics, mood: Mood) -> SynthesisResult:
        style_info = _VOICE_STYLES.get(
            mood.category, _VOICE_STYLES[MoodCategory.CALM]
        )

        script_lines = [
            f"♪ {lyrics.title} ♪",
            f"Voice style : {style_info['style']}",
            f"Technique   : {style_info['technique']}",
            "",
        ]
        for section in lyrics.sections:
            script_lines.append(f"[{section.label}]")
            script_lines.extend(section.lines)
            script_lines.append("")

        return SynthesisResult(
            audio_url=None,
            script="\n".join(script_lines).strip(),
            voice_style=style_info["style"],
            provider="A1 Offline Voice Synthesizer",
        )


# ---------------------------------------------------------------------------
# Replica Studios adapter stub
# ---------------------------------------------------------------------------


class ReplicaStudiosAdapter(VoiceSynthesizerAdapter):
    """Adapter for the Replica Studios AI voice API.

    See https://replicastudios.com/ for API documentation.
    Set *api_key* to enable real synthesis; without it the adapter falls back
    to :class:`OfflineVoiceSynthesizer`.
    """

    def __init__(self, api_key: str | None = None, voice_id: str | None = None) -> None:
        self._api_key = api_key
        self._voice_id = voice_id or "default"
        self._fallback = OfflineVoiceSynthesizer()

    def synthesize(self, lyrics: Lyrics, mood: Mood) -> SynthesisResult:
        if not self._api_key:
            result = self._fallback.synthesize(lyrics, mood)
            result.provider = "Replica Studios (offline fallback – no API key)"
            return result

        # --- Real Replica Studios integration would go here ---
        # Example (pseudo-code):
        #
        #   import requests
        #   response = requests.post(
        #       "https://api.replicastudios.com/v2/speech/synthesize",
        #       headers={"Authorization": f"Bearer {self._api_key}"},
        #       json={
        #           "voice_uuid": self._voice_id,
        #           "txt": "\n".join(
        #               line for s in lyrics.sections for line in s.lines
        #           ),
        #           "extensions": ["wav"],
        #       },
        #       timeout=60,
        #   )
        #   response.raise_for_status()
        #   data = response.json()
        #   result = self._fallback.synthesize(lyrics, mood)
        #   result.audio_url = data["url"]
        #   result.provider = "Replica Studios"
        #   return result
        #
        raise NotImplementedError("Replica Studios API integration is not yet implemented.")


# ---------------------------------------------------------------------------
# Uberduck adapter stub
# ---------------------------------------------------------------------------


class UberduckAdapter(VoiceSynthesizerAdapter):
    """Adapter for the Uberduck AI singing API.

    See https://uberduck.ai/ for API documentation.
    """

    def __init__(
        self,
        api_key: str | None = None,
        api_secret: str | None = None,
        voice: str = "ava-multilingual",
    ) -> None:
        self._api_key = api_key
        self._api_secret = api_secret
        self._voice = voice
        self._fallback = OfflineVoiceSynthesizer()

    def synthesize(self, lyrics: Lyrics, mood: Mood) -> SynthesisResult:
        if not self._api_key or not self._api_secret:
            result = self._fallback.synthesize(lyrics, mood)
            result.provider = "Uberduck (offline fallback – no credentials)"
            return result

        # --- Real Uberduck integration would go here ---
        raise NotImplementedError("Uberduck API integration is not yet implemented.")
