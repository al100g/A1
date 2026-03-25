"""
Integration tests for the Flask application routes.
"""
import json
import pytest
from app import app as flask_app


@pytest.fixture
def client():
    flask_app.config["TESTING"] = True
    with flask_app.test_client() as c:
        yield c


class TestIndexRoute:
    def test_status_200(self, client):
        resp = client.get("/")
        assert resp.status_code == 200

    def test_contains_mood_buttons(self, client):
        resp = client.get("/")
        assert b"mood-btn" in resp.data

    def test_html_content_type(self, client):
        resp = client.get("/")
        assert "text/html" in resp.content_type


class TestApiMoods:
    def test_status_200(self, client):
        resp = client.get("/api/moods")
        assert resp.status_code == 200

    def test_returns_json(self, client):
        resp = client.get("/api/moods")
        data = json.loads(resp.data)
        assert isinstance(data, dict)

    def test_contains_all_moods(self, client):
        resp = client.get("/api/moods")
        data = json.loads(resp.data)
        for mood in ("happy", "sad", "reflective", "anxious", "energized"):
            assert mood in data

    def test_each_mood_has_description(self, client):
        resp = client.get("/api/moods")
        data = json.loads(resp.data)
        for mood, info in data.items():
            assert "description" in info


class TestApiGenerate:
    def _post(self, client, payload):
        return client.post(
            "/api/generate",
            data=json.dumps(payload),
            content_type="application/json",
        )

    def test_status_200_happy_mood(self, client):
        resp = self._post(client, {"mood": "happy"})
        assert resp.status_code == 200

    def test_response_has_lyrics(self, client):
        resp = self._post(client, {"mood": "sad"})
        data = json.loads(resp.data)
        assert "lyrics" in data
        assert len(data["lyrics"]["full_lyrics"]) > 0

    def test_response_has_music(self, client):
        resp = self._post(client, {"mood": "happy"})
        data = json.loads(resp.data)
        assert "music" in data
        assert "profile" in data["music"]

    def test_response_has_voice(self, client):
        resp = self._post(client, {"mood": "energized"})
        data = json.loads(resp.data)
        assert "voice" in data
        assert "profile" in data["voice"]

    def test_all_supported_moods(self, client):
        for mood in ("happy", "sad", "reflective", "anxious", "energized"):
            resp = self._post(client, {"mood": mood})
            assert resp.status_code == 200
            data = json.loads(resp.data)
            assert data["mood"] == mood

    def test_unknown_mood_defaults(self, client):
        resp = self._post(client, {"mood": "melancholic_and_lost"})
        assert resp.status_code == 200
        data = json.loads(resp.data)
        assert data["mood"] == "happy"

    def test_empty_payload_uses_defaults(self, client):
        resp = self._post(client, {})
        assert resp.status_code == 200

    def test_theme_reflected_in_response(self, client):
        resp = self._post(client, {"mood": "happy", "theme": "adventure"})
        data = json.loads(resp.data)
        assert data["theme"] == "adventure"

    def test_with_user_name(self, client):
        resp = self._post(client, {"mood": "happy", "user_name": "Alice"})
        assert resp.status_code == 200

    def test_with_adjustment(self, client):
        resp = self._post(client, {"mood": "sad", "adjustment": "make it more upbeat"})
        data = json.loads(resp.data)
        assert data["music"]["profile"]["tempo"] == "upbeat"


class TestApiAdjust:
    def _post(self, client, payload):
        return client.post(
            "/api/adjust",
            data=json.dumps(payload),
            content_type="application/json",
        )

    def test_status_200(self, client):
        resp = self._post(client, {"mood": "happy", "adjustment": "add piano"})
        assert resp.status_code == 200

    def test_returns_updated_profile(self, client):
        resp = self._post(client, {"mood": "happy", "adjustment": "add piano"})
        data = json.loads(resp.data)
        assert "solo piano" in data["profile"]["instruments"]

    def test_missing_adjustment_returns_400(self, client):
        resp = self._post(client, {"mood": "happy"})
        assert resp.status_code == 400

    def test_empty_adjustment_returns_400(self, client):
        resp = self._post(client, {"mood": "happy", "adjustment": "  "})
        assert resp.status_code == 400

    def test_upbeat_adjustment_increases_bpm(self, client):
        resp_before = self._post(client, {"mood": "sad", "adjustment": "none"})
        resp_after = self._post(client, {"mood": "sad", "adjustment": "more upbeat"})
        before_bpm = json.loads(resp_before.data)["profile"]["bpm"]
        after_bpm = json.loads(resp_after.data)["profile"]["bpm"]
        assert after_bpm > before_bpm
