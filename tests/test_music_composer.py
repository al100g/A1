"""
Tests for the music_composer service.
"""
from services.music_composer import (
    MOOD_MUSIC_PROFILES,
    adjust_profile,
    compose_music,
    get_music_profile,
)


class TestGetMusicProfile:
    def test_returns_dict(self):
        assert isinstance(get_music_profile("happy"), dict)

    def test_known_mood(self):
        profile = get_music_profile("happy")
        assert profile["style"] == "pop"

    def test_unknown_mood_defaults_to_happy(self):
        profile = get_music_profile("unknown_mood")
        assert profile == get_music_profile("happy")

    def test_all_moods_have_required_keys(self):
        for mood in MOOD_MUSIC_PROFILES:
            p = get_music_profile(mood)
            for key in ("tempo", "bpm", "key", "instruments", "style", "description"):
                assert key in p, f"{mood} profile missing '{key}'"

    def test_returns_copy(self):
        p1 = get_music_profile("happy")
        p2 = get_music_profile("happy")
        p1["bpm"] = 999
        assert p2["bpm"] != 999


class TestAdjustProfile:
    def test_upbeat_increases_bpm(self):
        profile = get_music_profile("sad")
        original_bpm = profile["bpm"]
        adjusted = adjust_profile(profile, "make it more upbeat")
        assert adjusted["bpm"] > original_bpm

    def test_upbeat_sets_tempo(self):
        profile = get_music_profile("sad")
        adjusted = adjust_profile(profile, "make it more upbeat")
        assert adjusted["tempo"] == "upbeat"

    def test_slower_decreases_bpm(self):
        profile = get_music_profile("happy")
        original_bpm = profile["bpm"]
        adjusted = adjust_profile(profile, "make it slower")
        assert adjusted["bpm"] < original_bpm

    def test_add_piano(self):
        profile = get_music_profile("happy")
        profile["instruments"] = ["drums", "guitar"]
        adjusted = adjust_profile(profile, "let's try piano instead")
        assert "solo piano" in adjusted["instruments"]

    def test_add_strings(self):
        profile = get_music_profile("happy")
        profile["instruments"] = ["piano"]
        adjusted = adjust_profile(profile, "add strings here")
        assert "strings" in adjusted["instruments"]

    def test_no_duplicate_piano(self):
        profile = get_music_profile("sad")
        profile["instruments"] = ["solo piano"]
        adjusted = adjust_profile(profile, "piano")
        assert adjusted["instruments"].count("solo piano") == 1

    def test_original_profile_not_mutated(self):
        profile = get_music_profile("happy")
        original_bpm = profile["bpm"]
        adjust_profile(profile, "more upbeat")
        assert profile["bpm"] == original_bpm

    def test_bpm_cap_at_200(self):
        profile = get_music_profile("energized")
        profile["bpm"] = 195
        adjusted = adjust_profile(profile, "more upbeat")
        assert adjusted["bpm"] <= 200

    def test_bpm_floor_at_40(self):
        profile = get_music_profile("sad")
        profile["bpm"] = 45
        adjusted = adjust_profile(profile, "slower")
        assert adjusted["bpm"] >= 40


class TestComposeMusic:
    def test_returns_dict(self):
        result = compose_music("happy")
        assert isinstance(result, dict)

    def test_mood_in_result(self):
        result = compose_music("sad")
        assert result["mood"] == "sad"

    def test_placeholder_source_without_api_key(self):
        result = compose_music("happy", aiva_api_key=None)
        assert result["source"] == "placeholder"

    def test_profile_present(self):
        result = compose_music("happy")
        assert "profile" in result and isinstance(result["profile"], dict)

    def test_adjustment_applied(self):
        result = compose_music("sad", adjustment="make it more upbeat")
        assert result["profile"]["tempo"] == "upbeat"

    def test_all_moods_return_valid_result(self):
        for mood in MOOD_MUSIC_PROFILES:
            result = compose_music(mood)
            assert result["mood"] == mood
