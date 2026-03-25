"""Tests for a1.song_builder."""

import pytest

from a1.lyrics_generator import SongTheme
from a1.mood_detector import Mood, MoodCategory
from a1.song_builder import Song, SongBuilder


@pytest.fixture
def builder() -> SongBuilder:
    return SongBuilder()


class TestSongBuilder:
    def test_build_from_text(self, builder: SongBuilder) -> None:
        song = builder.build_from_text("I feel happy and excited today")
        assert isinstance(song, Song)

    def test_build_from_mood(self, builder: SongBuilder) -> None:
        mood = Mood(category=MoodCategory.SAD, intensity=0.6)
        song = builder.build_from_mood(mood)
        assert isinstance(song, Song)

    def test_build_from_vibe(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("hopeful")
        assert isinstance(song, Song)

    def test_song_has_mood(self, builder: SongBuilder) -> None:
        song = builder.build_from_text("I feel so calm and peaceful")
        assert song.mood is not None
        assert isinstance(song.mood, Mood)

    def test_song_has_lyrics(self, builder: SongBuilder) -> None:
        song = builder.build_from_text("I feel great today")
        assert song.lyrics is not None
        assert len(song.lyrics.sections) == 6

    def test_song_has_composition(self, builder: SongBuilder) -> None:
        song = builder.build_from_text("feeling inspired")
        assert song.composition is not None
        assert song.composition.tempo_bpm > 0

    def test_song_has_performance(self, builder: SongBuilder) -> None:
        song = builder.build_from_text("I'm feeling romantic")
        assert song.performance is not None
        assert len(song.performance.script) > 0

    def test_theme_override(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("happy", theme=SongTheme.LIFE)
        assert song.lyrics.theme == SongTheme.LIFE

    def test_title_override(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("sad", title="My Sad Song")
        assert song.lyrics.title == "My Sad Song"

    def test_style_hint_applied(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("energized", style_hint="piano only")
        assert song.composition.instruments[0] == "piano"

    def test_full_display_not_empty(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("inspired")
        display = song.full_display()
        assert len(display) > 100

    def test_full_display_contains_mood(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("calm")
        display = song.full_display()
        assert "calm" in display.lower()

    def test_full_display_contains_lyrics_section(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("happy")
        display = song.full_display()
        assert "LYRICS" in display

    def test_full_display_contains_music_section(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("sad")
        display = song.full_display()
        assert "MUSIC GUIDE" in display

    def test_full_display_contains_vocal_section(self, builder: SongBuilder) -> None:
        song = builder.build_from_vibe("reflective")
        display = song.full_display()
        assert "VOCAL PERFORMANCE" in display

    def test_unknown_vibe_raises(self, builder: SongBuilder) -> None:
        with pytest.raises(ValueError):
            builder.build_from_vibe("xyz_unknown_vibe_abc")

    def test_all_vibes(self, builder: SongBuilder) -> None:
        vibes = [
            "hopeful", "fun", "soothing", "happy", "sad",
            "reflective", "anxious", "energized", "calm",
            "romantic", "inspired",
        ]
        for vibe in vibes:
            song = builder.build_from_vibe(vibe)
            assert song.lyrics is not None
