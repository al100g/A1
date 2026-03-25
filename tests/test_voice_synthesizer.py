"""Tests for a1.voice_synthesizer."""

import pytest

from a1.lyrics_generator import LyricsGenerator
from a1.mood_detector import Mood, MoodCategory
from a1.voice_synthesizer import OfflineVoiceSynthesizer, SynthesisResult


@pytest.fixture
def synthesizer() -> OfflineVoiceSynthesizer:
    return OfflineVoiceSynthesizer()


@pytest.fixture
def happy_mood() -> Mood:
    return Mood(category=MoodCategory.HAPPY, intensity=0.8)


@pytest.fixture
def sad_mood() -> Mood:
    return Mood(category=MoodCategory.SAD, intensity=0.6)


def _make_lyrics(mood: Mood):
    return LyricsGenerator().generate(mood)


class TestOfflineVoiceSynthesizer:
    def test_returns_synthesis_result(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert isinstance(result, SynthesisResult)

    def test_audio_url_is_none_offline(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert result.audio_url is None

    def test_script_not_empty(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert len(result.script) > 0

    def test_script_contains_title(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        lyrics = _make_lyrics(happy_mood)
        result = synthesizer.synthesize(lyrics, happy_mood)
        assert lyrics.title in result.script

    def test_script_contains_section_labels(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert "[Verse 1]" in result.script
        assert "[Chorus]" in result.script
        assert "[Bridge]" in result.script

    def test_voice_style_not_empty(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert result.voice_style

    def test_provider_name(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert "A1" in result.provider or "Offline" in result.provider

    def test_sad_voice_style_different_from_happy(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood, sad_mood: Mood
    ) -> None:
        happy_result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        sad_result = synthesizer.synthesize(_make_lyrics(sad_mood), sad_mood)
        assert happy_result.voice_style != sad_result.voice_style

    def test_all_mood_categories(self, synthesizer: OfflineVoiceSynthesizer) -> None:
        for category in MoodCategory:
            mood = Mood(category=category, intensity=0.7)
            lyrics = _make_lyrics(mood)
            result = synthesizer.synthesize(lyrics, mood)
            assert len(result.script) > 0

    def test_summary_contains_provider(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert result.provider in result.summary()

    def test_summary_contains_script(
        self, synthesizer: OfflineVoiceSynthesizer, happy_mood: Mood
    ) -> None:
        result = synthesizer.synthesize(_make_lyrics(happy_mood), happy_mood)
        assert result.script in result.summary()
