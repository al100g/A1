"""Tests for a1.music_composer."""

import pytest

from a1.mood_detector import Mood, MoodCategory
from a1.music_composer import CompositionGuide, OfflineComposer


@pytest.fixture
def composer() -> OfflineComposer:
    return OfflineComposer()


@pytest.fixture
def happy_mood() -> Mood:
    return Mood(category=MoodCategory.HAPPY, intensity=0.8)


@pytest.fixture
def sad_mood() -> Mood:
    return Mood(category=MoodCategory.SAD, intensity=0.5)


class TestOfflineComposer:
    def test_returns_composition_guide(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert isinstance(guide, CompositionGuide)

    def test_tempo_in_valid_range(self, composer: OfflineComposer) -> None:
        for category in MoodCategory:
            mood = Mood(category=category, intensity=0.7)
            guide = composer.compose(mood)
            assert 50 <= guide.tempo_bpm <= 200

    def test_happy_mood_upbeat_style(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert any(tag in guide.style_tags for tag in ["upbeat", "bright", "joyful", "pop"])

    def test_sad_mood_gentle_style(self, composer: OfflineComposer, sad_mood: Mood) -> None:
        guide = composer.compose(sad_mood)
        assert any(tag in guide.style_tags for tag in ["gentle", "acoustic", "emotional"])

    def test_instruments_list_not_empty(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert len(guide.instruments) > 0

    def test_key_not_empty(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert guide.key

    def test_time_signature_not_empty(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert guide.time_signature

    def test_style_hint_piano(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood, style_hint="try piano instead")
        assert guide.instruments[0] == "piano"

    def test_style_hint_upbeat(self, composer: OfflineComposer, sad_mood: Mood) -> None:
        guide = composer.compose(sad_mood, style_hint="make it more upbeat")
        assert "upbeat" in guide.style_tags

    def test_style_hint_acoustic(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood, style_hint="acoustic guitar please")
        assert guide.instruments[0] == "acoustic guitar"

    def test_provider_name(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert "A1" in guide.provider or "Offline" in guide.provider

    def test_summary_contains_tempo(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert "BPM" in guide.summary()

    def test_summary_contains_key(self, composer: OfflineComposer, happy_mood: Mood) -> None:
        guide = composer.compose(happy_mood)
        assert guide.key in guide.summary()

    def test_all_mood_categories(self, composer: OfflineComposer) -> None:
        for category in MoodCategory:
            mood = Mood(category=category, intensity=0.7)
            guide = composer.compose(mood)
            assert guide.tempo_bpm > 0

    def test_intensity_affects_tempo(self, composer: OfflineComposer) -> None:
        low = composer.compose(Mood(category=MoodCategory.HAPPY, intensity=0.0))
        high = composer.compose(Mood(category=MoodCategory.HAPPY, intensity=1.0))
        assert high.tempo_bpm >= low.tempo_bpm
