"""Tests for a1.lyrics_generator."""

import pytest

from a1.lyrics_generator import Lyrics, LyricsGenerator, SongSection, SongTheme
from a1.mood_detector import Mood, MoodCategory


@pytest.fixture
def generator() -> LyricsGenerator:
    return LyricsGenerator()


@pytest.fixture
def happy_mood() -> Mood:
    return Mood(category=MoodCategory.HAPPY, intensity=0.8)


@pytest.fixture
def sad_mood() -> Mood:
    return Mood(category=MoodCategory.SAD, intensity=0.6)


class TestLyricsGenerator:
    def test_generate_returns_lyrics(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood)
        assert isinstance(lyrics, Lyrics)

    def test_song_has_six_sections(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood)
        assert len(lyrics.sections) == 6

    def test_section_labels(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood)
        labels = [s.label for s in lyrics.sections]
        assert labels == [
            "Verse 1",
            "Chorus",
            "Verse 2",
            "Chorus",
            "Bridge",
            "Chorus (Outro)",
        ]

    def test_all_sections_have_lines(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood)
        for section in lyrics.sections:
            assert len(section.lines) > 0

    def test_theme_override(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood, theme=SongTheme.LIFE)
        assert lyrics.theme == SongTheme.LIFE

    def test_default_theme_applied(self, generator: LyricsGenerator, sad_mood: Mood) -> None:
        lyrics = generator.generate(sad_mood)
        assert lyrics.theme == SongTheme.HEALING

    def test_custom_title(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood, title="My Custom Title")
        assert lyrics.title == "My Custom Title"

    def test_title_generated_when_not_given(
        self, generator: LyricsGenerator, happy_mood: Mood
    ) -> None:
        lyrics = generator.generate(happy_mood)
        assert lyrics.title
        assert len(lyrics.title) > 0

    def test_mood_stored(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood)
        assert lyrics.mood is happy_mood

    def test_str_representation(self, generator: LyricsGenerator, happy_mood: Mood) -> None:
        lyrics = generator.generate(happy_mood)
        text = str(lyrics)
        assert lyrics.title in text
        assert "Verse 1" in text
        assert "Chorus" in text
        assert "Bridge" in text

    def test_all_mood_categories(self, generator: LyricsGenerator) -> None:
        for category in MoodCategory:
            mood = Mood(category=category, intensity=0.7)
            lyrics = generator.generate(mood)
            assert len(lyrics.sections) == 6


class TestSongSection:
    def test_str_contains_label(self) -> None:
        section = SongSection(label="Chorus", lines=["Line 1", "Line 2"])
        assert "[Chorus]" in str(section)

    def test_str_contains_lines(self) -> None:
        section = SongSection(label="Verse 1", lines=["Hello world"])
        assert "Hello world" in str(section)
