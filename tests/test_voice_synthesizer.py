"""
Tests for the voice_synthesizer service.
"""
from services.voice_synthesizer import (
    MOOD_VOICE_PROFILES,
    get_voice_profile,
    synthesize_voice,
)


class TestGetVoiceProfile:
    def test_returns_dict(self):
        assert isinstance(get_voice_profile("happy"), dict)

    def test_known_mood(self):
        profile = get_voice_profile("energized")
        assert profile["tone"] == "powerful"

    def test_unknown_mood_defaults_to_happy(self):
        profile = get_voice_profile("mystery_mood")
        assert profile == get_voice_profile("happy")

    def test_all_moods_have_required_keys(self):
        for mood in MOOD_VOICE_PROFILES:
            p = get_voice_profile(mood)
            for key in ("tone", "technique", "pace", "description"):
                assert key in p, f"{mood} voice profile missing '{key}'"

    def test_returns_copy(self):
        p1 = get_voice_profile("happy")
        p2 = get_voice_profile("happy")
        p1["tone"] = "mutated"
        assert p2["tone"] != "mutated"


class TestSynthesizeVoice:
    LYRICS = "[Verse]\nTest line one\nTest line two"

    def test_returns_dict(self):
        result = synthesize_voice(self.LYRICS, "happy")
        assert isinstance(result, dict)

    def test_placeholder_source_without_credentials(self):
        result = synthesize_voice(
            self.LYRICS, "happy",
            uberduck_api_key=None,
            uberduck_api_secret=None,
        )
        assert result["source"] == "placeholder"

    def test_mood_normalised_to_lowercase(self):
        result = synthesize_voice(self.LYRICS, "HAPPY")
        assert result["mood"] == "happy"

    def test_profile_present(self):
        result = synthesize_voice(self.LYRICS, "sad")
        assert "profile" in result and isinstance(result["profile"], dict)

    def test_all_moods_return_valid_result(self):
        for mood in MOOD_VOICE_PROFILES:
            result = synthesize_voice(self.LYRICS, mood)
            assert result["mood"] == mood
