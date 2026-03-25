"""
Tests for the lyrics_generator service.
"""
from services.lyrics_generator import (
    FALLBACK_LYRICS,
    MOOD_METADATA,
    SONG_STRUCTURE,
    _build_prompt,
    _parse_llm_lyrics,
    generate_lyrics,
)


class TestMoodMetadata:
    def test_all_moods_present(self):
        expected = {"happy", "sad", "reflective", "anxious", "energized"}
        assert set(MOOD_METADATA.keys()) == expected

    def test_each_mood_has_required_keys(self):
        for mood, meta in MOOD_METADATA.items():
            assert "description" in meta, f"{mood} missing 'description'"
            assert "style" in meta, f"{mood} missing 'style'"
            assert "example_line" in meta, f"{mood} missing 'example_line'"


class TestBuildPrompt:
    def test_prompt_contains_mood(self):
        prompt = _build_prompt("sad", "love", None)
        assert "sad" in prompt.lower()

    def test_prompt_contains_theme(self):
        prompt = _build_prompt("happy", "adventure", None)
        assert "adventure" in prompt

    def test_prompt_personalised_with_name(self):
        prompt = _build_prompt("happy", "life", "Alice")
        assert "Alice" in prompt

    def test_prompt_no_name_clause_when_none(self):
        prompt = _build_prompt("happy", "life", None)
        assert "written for someone named" not in prompt


class TestParseLLMLyrics:
    SAMPLE = (
        "[Verse 1]\nLine one\nLine two\n\n"
        "[Chorus]\nRefrain A\nRefrain B\n\n"
        "[Verse 2]\nLine three\nLine four\n\n"
        "[Bridge]\nBridge line\n"
    )

    def test_verse_key_present(self):
        result = _parse_llm_lyrics(self.SAMPLE)
        assert "verse" in result

    def test_chorus_key_present(self):
        result = _parse_llm_lyrics(self.SAMPLE)
        assert "chorus" in result

    def test_bridge_key_present(self):
        result = _parse_llm_lyrics(self.SAMPLE)
        assert "bridge" in result

    def test_verse_content(self):
        result = _parse_llm_lyrics(self.SAMPLE)
        assert "Line one" in result["verse"]

    def test_chorus_content(self):
        result = _parse_llm_lyrics(self.SAMPLE)
        assert "Refrain A" in result["chorus"]

    def test_empty_string_returns_empty_dict(self):
        assert _parse_llm_lyrics("") == {}


class TestGenerateLyrics:
    def test_returns_correct_mood(self):
        result = generate_lyrics("happy")
        assert result["mood"] == "happy"

    def test_unknown_mood_defaults_to_happy(self):
        result = generate_lyrics("confused")
        assert result["mood"] == "happy"

    def test_all_supported_moods(self):
        for mood in MOOD_METADATA:
            result = generate_lyrics(mood)
            assert result["mood"] == mood

    def test_full_lyrics_non_empty(self):
        result = generate_lyrics("sad")
        assert len(result["full_lyrics"]) > 0

    def test_sections_present(self):
        result = generate_lyrics("happy")
        assert isinstance(result["sections"], dict)
        assert len(result["sections"]) > 0

    def test_structure_matches_song_structure(self):
        result = generate_lyrics("happy")
        assert result["structure"] == SONG_STRUCTURE

    def test_source_is_fallback_without_api_key(self):
        result = generate_lyrics("happy", openai_api_key=None)
        assert result["source"] == "fallback"

    def test_theme_recorded(self):
        result = generate_lyrics("happy", theme="adventure")
        assert result["theme"] == "adventure"

    def test_full_lyrics_contains_section_labels(self):
        result = generate_lyrics("happy")
        assert "[" in result["full_lyrics"] and "]" in result["full_lyrics"]

    def test_fallback_lyrics_complete_for_all_moods(self):
        for mood in MOOD_METADATA:
            assert mood in FALLBACK_LYRICS, f"No fallback for mood: {mood}"
            for section in ("verse", "chorus", "bridge"):
                assert section in FALLBACK_LYRICS[mood]

    def test_llm_error_falls_back_gracefully(self, monkeypatch):
        """If the OpenAI call raises an exception the fallback is used."""
        def fake_openai(*args, **kwargs):
            raise RuntimeError("API unavailable")

        monkeypatch.setenv("OPENAI_API_KEY", "fake-key")
        import services.lyrics_generator as lg

        # Patch at the module level so the import inside generate_lyrics fails
        import builtins
        real_import = builtins.__import__

        def patched_import(name, *args, **kwargs):
            if name == "openai":
                raise ImportError("mocked")
            return real_import(name, *args, **kwargs)

        monkeypatch.setattr(builtins, "__import__", patched_import)
        result = lg.generate_lyrics("happy", openai_api_key="fake-key")
        assert result["source"] == "fallback"
