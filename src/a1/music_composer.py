"""Music composer module for A1.

Provides mood-based composition guidance and integrates with external AI
music-composition services (AIVA, Google Magenta) via a pluggable adapter
interface.  Ships with a built-in :class:`OfflineComposer` that returns
rich descriptive guidance without requiring any network access, making it
suitable for prototyping and testing.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass

from a1.mood_detector import Mood, MoodCategory

# ---------------------------------------------------------------------------
# Composition result
# ---------------------------------------------------------------------------


@dataclass
class CompositionGuide:
    """Describes the musical direction for a song.

    Attributes:
        tempo_bpm:      Suggested beats per minute.
        key:            Musical key (e.g. ``"C major"``).
        time_signature: Time signature (e.g. ``"4/4"``).
        instruments:    Recommended instruments in priority order.
        style_tags:     Free-form style descriptors (e.g. ``["soft", "acoustic"]``).
        description:    Human-readable paragraph explaining the musical direction.
        audio_url:      Optional URL to a generated audio preview (set by online
                        adapters after a successful API call).
    """

    tempo_bpm: int
    key: str
    time_signature: str
    instruments: list[str]
    style_tags: list[str]
    description: str
    audio_url: str | None = None
    provider: str = "offline"

    def summary(self) -> str:
        """Return a short human-readable summary."""
        instr = ", ".join(self.instruments[:3])
        tags = " · ".join(self.style_tags)
        lines = [
            f"Provider   : {self.provider}",
            f"Tempo      : {self.tempo_bpm} BPM",
            f"Key        : {self.key}",
            f"Time sig.  : {self.time_signature}",
            f"Instruments: {instr}",
            f"Style      : {tags}",
            "",
            self.description,
        ]
        if self.audio_url:
            lines.append(f"\n🎵 Preview  : {self.audio_url}")
        return "\n".join(lines)


# ---------------------------------------------------------------------------
# Adapter interface
# ---------------------------------------------------------------------------


class MusicComposerAdapter(ABC):
    """Abstract adapter for AI music-composition back-ends."""

    @abstractmethod
    def compose(self, mood: Mood, style_hint: str | None = None) -> CompositionGuide:
        """Generate a composition guide for *mood*.

        Args:
            mood:       The user's current emotional state.
            style_hint: Optional free-text style request from the user,
                        e.g. ``"make it more upbeat"`` or
                        ``"try piano instead"``.

        Returns:
            A :class:`CompositionGuide` instance.
        """


# ---------------------------------------------------------------------------
# Built-in offline adapter
# ---------------------------------------------------------------------------


# Parameterised mood profiles -----------------------------------------------

_MOOD_PROFILES: dict[MoodCategory, dict] = {
    MoodCategory.HAPPY: {
        "tempo_range": (116, 130),
        "keys": ["C major", "G major", "D major", "A major"],
        "time_signatures": ["4/4"],
        "instruments": ["acoustic guitar", "piano", "drums", "strings", "bass"],
        "style_tags": ["upbeat", "bright", "pop", "joyful"],
        "description": (
            "Bright, driving pop production with a strummed acoustic guitar leading"
            " the verse and a full band—including punchy drums, warm bass, and lush"
            " strings—kicking in on the chorus.  The mix stays airy and wide to"
            " reflect the joyful mood."
        ),
    },
    MoodCategory.SAD: {
        "tempo_range": (60, 76),
        "keys": ["A minor", "D minor", "E minor", "B minor"],
        "time_signatures": ["4/4", "3/4"],
        "instruments": ["soft piano", "acoustic guitar", "cello", "ambient pads"],
        "style_tags": ["gentle", "acoustic", "emotional", "intimate"],
        "description": (
            "Sparse, intimate arrangement centred on soft piano with delicate"
            " fingerpicked guitar underneath.  A solo cello enters on the bridge"
            " to deepen the emotional weight.  Subtle ambient pads add breath"
            " without overwhelming the lyrical vulnerability."
        ),
    },
    MoodCategory.REFLECTIVE: {
        "tempo_range": (72, 88),
        "keys": ["G major", "E minor", "C major", "F major"],
        "time_signatures": ["4/4", "6/8"],
        "instruments": ["piano", "acoustic guitar", "light percussion", "strings"],
        "style_tags": ["calm", "melodic", "folk", "nostalgic"],
        "description": (
            "A meditative folk-pop palette with a finger-picked guitar carrying the"
            " melody through the verses.  Piano chords swell gently into the chorus,"
            " and sparse brushed-drum patterns add momentum without breaking the"
            " contemplative atmosphere."
        ),
    },
    MoodCategory.ANXIOUS: {
        "tempo_range": (80, 96),
        "keys": ["D minor", "A minor", "E minor"],
        "time_signatures": ["4/4"],
        "instruments": ["soft piano", "ambient pads", "acoustic guitar", "light strings"],
        "style_tags": ["soothing", "gentle", "slow-build", "reassuring"],
        "description": (
            "A grounding, soothing arrangement that starts very sparsely—just"
            " soft piano and ambient pad—and gradually introduces acoustic guitar"
            " and light strings as the song progresses.  The deliberate slow build"
            " mirrors the journey from anxiety toward calm."
        ),
    },
    MoodCategory.ENERGIZED: {
        "tempo_range": (128, 145),
        "keys": ["E major", "A major", "D major", "B major"],
        "time_signatures": ["4/4"],
        "instruments": ["electric guitar", "drums", "bass", "synth leads", "brass"],
        "style_tags": ["high-energy", "rock", "anthem", "driving"],
        "description": (
            "A full-throttle anthemic rock production with a distorted electric"
            " guitar riff anchoring the verses.  Fat kick and snare drums drive the"
            " choruses, and powerful brass stabs punctuate the bridge.  The mix is"
            " loud, wide, and unapologetically energetic."
        ),
    },
    MoodCategory.CALM: {
        "tempo_range": (58, 72),
        "keys": ["F major", "C major", "G major", "Bb major"],
        "time_signatures": ["4/4", "3/4"],
        "instruments": ["piano", "acoustic guitar", "light pads", "flute"],
        "style_tags": ["ambient", "peaceful", "meditative", "airy"],
        "description": (
            "A tranquil, minimal arrangement built around a flowing piano melody."
            "  Light, breath-like pads create space, while an occasional flute line"
            " adds warmth.  No percussion—just stillness and gentle movement."
        ),
    },
    MoodCategory.ROMANTIC: {
        "tempo_range": (76, 96),
        "keys": ["Eb major", "Ab major", "F major", "Db major"],
        "time_signatures": ["4/4", "3/4"],
        "instruments": ["piano", "strings", "acoustic guitar", "soft drums", "bass"],
        "style_tags": ["romantic", "lush", "intimate", "ballad"],
        "description": (
            "A lush romantic ballad with warm piano and orchestral strings weaving"
            " together.  Soft brushed drums enter on the second verse, and the"
            " arrangement builds to an emotionally saturated chorus before"
            " stripping back to piano alone for the final section."
        ),
    },
    MoodCategory.INSPIRED: {
        "tempo_range": (100, 118),
        "keys": ["C major", "G major", "D major", "A major"],
        "time_signatures": ["4/4"],
        "instruments": ["piano", "strings", "light drums", "acoustic guitar", "choir pads"],
        "style_tags": ["uplifting", "cinematic", "hopeful", "anthemic"],
        "description": (
            "A cinematic, hopeful production that opens with a gentle piano motif"
            " and slowly adds orchestral strings, acoustic guitar, and softly"
            " building drums.  Choir pads swell into the chorus, giving the track"
            " a transcendent, sky-opening quality that matches the feeling of"
            " inspiration and possibility."
        ),
    },
}


import random  # noqa: E402  (placed here to keep the top of the file clean)


class OfflineComposer(MusicComposerAdapter):
    """A rule-based composer that works without any external API calls.

    Suitable for development, testing, and offline use.
    """

    def compose(self, mood: Mood, style_hint: str | None = None) -> CompositionGuide:
        """Return a :class:`CompositionGuide` derived from the mood profile."""
        profile = _MOOD_PROFILES.get(mood.category, _MOOD_PROFILES[MoodCategory.CALM])

        lo, hi = profile["tempo_range"]
        # Nudge tempo by intensity: higher intensity → faster tempo.
        tempo = round(lo + (hi - lo) * mood.intensity)

        instruments: list[str] = list(profile["instruments"])
        style_tags: list[str] = list(profile["style_tags"])
        description: str = profile["description"]

        if style_hint:
            instruments, style_tags, description = self._apply_hint(
                style_hint, instruments, style_tags, description, profile
            )

        return CompositionGuide(
            tempo_bpm=tempo,
            key=random.choice(profile["keys"]),
            time_signature=random.choice(profile["time_signatures"]),
            instruments=instruments,
            style_tags=style_tags,
            description=description,
            provider="A1 Offline Composer",
        )

    # ------------------------------------------------------------------

    def _apply_hint(
        self,
        hint: str,
        instruments: list[str],
        style_tags: list[str],
        description: str,
        profile: dict,
    ) -> tuple[list[str], list[str], str]:
        """Adjust the composition parameters based on a free-text style hint."""
        h = hint.lower()

        if "upbeat" in h or "faster" in h or "energetic" in h:
            if "upbeat" not in style_tags:
                style_tags = ["upbeat"] + style_tags
            if "drums" not in instruments:
                instruments = instruments + ["drums"]
            description = (
                "Adjusted for a more upbeat feel: "
                + description[0].lower()
                + description[1:]
            )

        if "piano" in h:
            instruments = ["piano"] + [i for i in instruments if i != "piano"]

        if "acoustic" in h or "acoustic guitar" in h:
            instruments = ["acoustic guitar"] + [
                i for i in instruments if i != "acoustic guitar"
            ]

        if "strings" in h:
            if "strings" not in instruments:
                instruments = instruments + ["strings"]

        if "calm" in h or "softer" in h or "gentle" in h:
            style_tags = ["gentle", "soft"] + [
                t for t in style_tags if t not in {"upbeat", "high-energy", "driving"}
            ]

        return instruments, style_tags, description


# ---------------------------------------------------------------------------
# AIVA adapter stub
# ---------------------------------------------------------------------------


class AivaComposerAdapter(MusicComposerAdapter):
    """Adapter for the AIVA AI music composition API.

    See https://www.aiva.ai/ for API documentation and credentials.

    Set the ``api_key`` to enable real composition.  When the key is absent
    the adapter falls back to :class:`OfflineComposer`.
    """

    def __init__(self, api_key: str | None = None) -> None:
        self._api_key = api_key
        self._fallback = OfflineComposer()

    def compose(self, mood: Mood, style_hint: str | None = None) -> CompositionGuide:
        if not self._api_key:
            guide = self._fallback.compose(mood, style_hint)
            guide.provider = "AIVA (offline fallback – no API key)"
            return guide

        # --- Real AIVA integration would go here ---
        # Example (pseudo-code):
        #
        #   import requests
        #   response = requests.post(
        #       "https://api.aiva.ai/v1/compositions",
        #       headers={"Authorization": f"Bearer {self._api_key}"},
        #       json={
        #           "mood": mood.category.value,
        #           "style": style_hint or "",
        #           "duration_seconds": 180,
        #       },
        #       timeout=30,
        #   )
        #   response.raise_for_status()
        #   data = response.json()
        #   guide = self._fallback.compose(mood, style_hint)
        #   guide.audio_url = data["audio_url"]
        #   guide.provider = "AIVA"
        #   return guide
        #
        raise NotImplementedError("AIVA API integration is not yet implemented.")


# ---------------------------------------------------------------------------
# Google Magenta adapter stub
# ---------------------------------------------------------------------------


class MagentaComposerAdapter(MusicComposerAdapter):
    """Adapter for Google Magenta melody generation.

    Google Magenta (https://magenta.tensorflow.org/) can run locally via its
    Python library or via a hosted API.  Install the ``magenta`` package and
    point this adapter at a melody RNN checkpoint to generate MIDI output.
    """

    def __init__(self, model_checkpoint: str | None = None) -> None:
        self._checkpoint = model_checkpoint
        self._fallback = OfflineComposer()

    def compose(self, mood: Mood, style_hint: str | None = None) -> CompositionGuide:
        if not self._checkpoint:
            guide = self._fallback.compose(mood, style_hint)
            guide.provider = "Magenta (offline fallback – no checkpoint)"
            return guide

        # --- Real Magenta integration would go here ---
        # Example (pseudo-code):
        #
        #   from magenta.models.melody_rnn import melody_rnn_sequence_generator
        #   generator = melody_rnn_sequence_generator.MelodyRnnSequenceGenerator(
        #       model=melody_rnn_sequence_generator.get_model(self._checkpoint), ...
        #   )
        #   sequence = generator.generate(...)
        #   guide = self._fallback.compose(mood, style_hint)
        #   guide.audio_url = save_midi_and_return_path(sequence)
        #   guide.provider = "Google Magenta"
        #   return guide
        #
        raise NotImplementedError("Magenta integration is not yet implemented.")
