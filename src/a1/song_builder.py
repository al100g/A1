"""Song builder module for A1.

Orchestrates the full personalised-song pipeline:

1. Detect the user's mood.
2. Generate lyrics.
3. Compose the music guide.
4. Synthesize the vocal performance.

:class:`SongBuilder` is the single façade that calling code (e.g. the CLI
or a future web API) should interact with.
"""

from __future__ import annotations

from dataclasses import dataclass

from a1.lyrics_generator import Lyrics, LyricsGenerator, SongTheme
from a1.mood_detector import Mood, MoodDetector
from a1.music_composer import CompositionGuide, MusicComposerAdapter, OfflineComposer
from a1.voice_synthesizer import (
    OfflineVoiceSynthesizer,
    SynthesisResult,
    VoiceSynthesizerAdapter,
)

# ---------------------------------------------------------------------------
# Song result
# ---------------------------------------------------------------------------


@dataclass
class Song:
    """The complete output of the song-generation pipeline.

    Attributes:
        mood:        The detected or user-supplied mood.
        lyrics:      Generated song lyrics.
        composition: Musical composition guidance.
        performance: Voice synthesis result (script + optional audio URL).
    """

    mood: Mood
    lyrics: Lyrics
    composition: CompositionGuide
    performance: SynthesisResult

    def full_display(self) -> str:
        """Return a formatted string showing the complete song experience."""
        divider = "═" * 60
        thin = "─" * 60

        mood_section = (
            f"Mood Detected : {self.mood.category.value.capitalize()}"
            f"  (intensity {self.mood.intensity:.0%})"
        )
        if self.mood.description:
            mood_section += f"\nYour message  : \"{self.mood.description}\""

        return "\n".join(
            [
                divider,
                "  ♪  A1 — Your Personalised Song  ♪",
                divider,
                "",
                mood_section,
                "",
                thin,
                "  LYRICS",
                thin,
                str(self.lyrics),
                "",
                thin,
                "  MUSIC GUIDE",
                thin,
                self.composition.summary(),
                "",
                thin,
                "  VOCAL PERFORMANCE",
                thin,
                self.performance.summary(),
                "",
                divider,
            ]
        )


# ---------------------------------------------------------------------------
# Builder
# ---------------------------------------------------------------------------


class SongBuilder:
    """Orchestrates the full A1 song-creation pipeline.

    Args:
        composer:    Music composition adapter (defaults to :class:`OfflineComposer`).
        synthesizer: Voice synthesis adapter (defaults to
                     :class:`OfflineVoiceSynthesizer`).
    """

    def __init__(
        self,
        composer: MusicComposerAdapter | None = None,
        synthesizer: VoiceSynthesizerAdapter | None = None,
    ) -> None:
        self._detector = MoodDetector()
        self._lyrics_gen = LyricsGenerator()
        self._composer: MusicComposerAdapter = composer or OfflineComposer()
        self._synthesizer: VoiceSynthesizerAdapter = (
            synthesizer or OfflineVoiceSynthesizer()
        )

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def build_from_text(
        self,
        user_text: str,
        theme: SongTheme | None = None,
        title: str | None = None,
        user_name: str | None = None,
        style_hint: str | None = None,
    ) -> Song:
        """Generate a song from a free-text description of how the user feels.

        Args:
            user_text:  How the user feels in their own words.
            theme:      Optional song theme override.
            title:      Optional custom song title.
            user_name:  Optional user name to personalise lyrics.
            style_hint: Optional music style adjustment
                        (e.g. ``"make it more upbeat"``).

        Returns:
            A fully assembled :class:`Song`.
        """
        mood = self._detector.detect(user_text)
        return self._build(mood, theme, title, user_name, style_hint)

    def build_from_mood(
        self,
        mood: Mood,
        theme: SongTheme | None = None,
        title: str | None = None,
        user_name: str | None = None,
        style_hint: str | None = None,
    ) -> Song:
        """Generate a song from a pre-constructed :class:`~a1.mood_detector.Mood`.

        Args:
            mood:       The user's emotional state.
            theme:      Optional song theme override.
            title:      Optional custom song title.
            user_name:  Optional user name to personalise lyrics.
            style_hint: Optional music style adjustment.

        Returns:
            A fully assembled :class:`Song`.
        """
        return self._build(mood, theme, title, user_name, style_hint)

    def build_from_vibe(
        self,
        vibe: str,
        theme: SongTheme | None = None,
        title: str | None = None,
        user_name: str | None = None,
        style_hint: str | None = None,
    ) -> Song:
        """Generate a song from a short vibe label (e.g. ``"hopeful"``).

        Args:
            vibe:       A vibe label understood by
                        :meth:`~a1.mood_detector.MoodDetector.from_vibe_choice`.
            theme:      Optional song theme override.
            title:      Optional custom song title.
            user_name:  Optional user name to personalise lyrics.
            style_hint: Optional music style adjustment.

        Returns:
            A fully assembled :class:`Song`.
        """
        mood = self._detector.from_vibe_choice(vibe)
        return self._build(mood, theme, title, user_name, style_hint)

    # ------------------------------------------------------------------
    # Internal
    # ------------------------------------------------------------------

    def _build(
        self,
        mood: Mood,
        theme: SongTheme | None,
        title: str | None,
        user_name: str | None,
        style_hint: str | None,
    ) -> Song:
        lyrics = self._lyrics_gen.generate(mood, theme, title, user_name)
        composition = self._composer.compose(mood, style_hint)
        performance = self._synthesizer.synthesize(lyrics, mood)
        return Song(
            mood=mood,
            lyrics=lyrics,
            composition=composition,
            performance=performance,
        )
