"""Tests for a1.mood_detector."""

import pytest

from a1.mood_detector import Mood, MoodCategory, MoodDetector


@pytest.fixture
def detector() -> MoodDetector:
    return MoodDetector()


class TestMoodDetect:
    def test_happy_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I feel so happy and excited today!")
        assert mood.category == MoodCategory.HAPPY

    def test_sad_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I am so sad and crying all day")
        assert mood.category == MoodCategory.SAD

    def test_reflective_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I keep thinking and reflecting about old memories")
        assert mood.category == MoodCategory.REFLECTIVE

    def test_anxious_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I feel so anxious and stressed about everything")
        assert mood.category == MoodCategory.ANXIOUS

    def test_energized_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I am so energized and motivated to take on the world")
        assert mood.category == MoodCategory.ENERGIZED

    def test_calm_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I feel very calm and relaxed right now")
        assert mood.category == MoodCategory.CALM

    def test_romantic_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I am deeply in love and feeling very romantic")
        assert mood.category == MoodCategory.ROMANTIC

    def test_inspired_text(self, detector: MoodDetector) -> None:
        mood = detector.detect("I feel so inspired and full of creative dreams")
        assert mood.category == MoodCategory.INSPIRED

    def test_intensity_range(self, detector: MoodDetector) -> None:
        mood = detector.detect("happy")
        assert 0.0 <= mood.intensity <= 1.0

    def test_keywords_populated(self, detector: MoodDetector) -> None:
        mood = detector.detect("I feel happy and excited")
        assert len(mood.keywords) > 0

    def test_empty_text_raises(self, detector: MoodDetector) -> None:
        with pytest.raises(ValueError, match="must not be empty"):
            detector.detect("")

    def test_whitespace_only_raises(self, detector: MoodDetector) -> None:
        with pytest.raises(ValueError, match="must not be empty"):
            detector.detect("   ")

    def test_description_stored(self, detector: MoodDetector) -> None:
        text = "I feel great today"
        mood = detector.detect(text)
        assert mood.description == text


class TestFromVibeChoice:
    def test_hopeful(self, detector: MoodDetector) -> None:
        mood = detector.from_vibe_choice("hopeful")
        assert mood.category == MoodCategory.INSPIRED

    def test_fun(self, detector: MoodDetector) -> None:
        mood = detector.from_vibe_choice("fun")
        assert mood.category == MoodCategory.HAPPY

    def test_soothing(self, detector: MoodDetector) -> None:
        mood = detector.from_vibe_choice("soothing")
        assert mood.category == MoodCategory.CALM

    def test_case_insensitive(self, detector: MoodDetector) -> None:
        mood = detector.from_vibe_choice("HAPPY")
        assert mood.category == MoodCategory.HAPPY

    def test_unknown_vibe_raises(self, detector: MoodDetector) -> None:
        with pytest.raises(ValueError, match="Unknown vibe"):
            detector.from_vibe_choice("unknown_xyz")

    def test_default_intensity(self, detector: MoodDetector) -> None:
        mood = detector.from_vibe_choice("calm")
        assert mood.intensity == 0.7


class TestMood:
    def test_invalid_intensity_raises(self) -> None:
        with pytest.raises(ValueError, match="intensity must be between"):
            Mood(category=MoodCategory.HAPPY, intensity=1.5)

    def test_is_upbeat(self) -> None:
        assert Mood(category=MoodCategory.HAPPY).is_upbeat
        assert Mood(category=MoodCategory.ENERGIZED).is_upbeat
        assert not Mood(category=MoodCategory.SAD).is_upbeat

    def test_is_introspective(self) -> None:
        assert Mood(category=MoodCategory.SAD).is_introspective
        assert Mood(category=MoodCategory.CALM).is_introspective
        assert not Mood(category=MoodCategory.HAPPY).is_introspective
