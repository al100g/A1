"""Mood detection module for A1.

Analyses text (and optionally numeric valence/energy scores) to return
a normalised :class:`Mood` object that drives lyrics and music generation.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from enum import Enum

# ---------------------------------------------------------------------------
# Mood taxonomy
# ---------------------------------------------------------------------------


class MoodCategory(str, Enum):
    """High-level emotional categories recognised by A1."""

    HAPPY = "happy"
    SAD = "sad"
    REFLECTIVE = "reflective"
    ANXIOUS = "anxious"
    ENERGIZED = "energized"
    CALM = "calm"
    ROMANTIC = "romantic"
    INSPIRED = "inspired"


@dataclass
class Mood:
    """A detected or user-supplied emotional state.

    Attributes:
        category:   The primary emotional category.
        intensity:  Strength of the emotion on a 0.0–1.0 scale.
        description: Optional free-text description supplied by the user.
        keywords:   Words that contributed to the detection result.
    """

    category: MoodCategory
    intensity: float = 0.7
    description: str | None = None
    keywords: list[str] = field(default_factory=list)

    def __post_init__(self) -> None:
        if not 0.0 <= self.intensity <= 1.0:
            raise ValueError("intensity must be between 0.0 and 1.0")

    @property
    def is_upbeat(self) -> bool:
        """Return True for moods that call for energetic/bright music."""
        return self.category in {
            MoodCategory.HAPPY,
            MoodCategory.ENERGIZED,
            MoodCategory.INSPIRED,
        }

    @property
    def is_introspective(self) -> bool:
        """Return True for moods that call for gentle, thoughtful music."""
        return self.category in {
            MoodCategory.REFLECTIVE,
            MoodCategory.SAD,
            MoodCategory.CALM,
            MoodCategory.ANXIOUS,
        }


# ---------------------------------------------------------------------------
# Keyword bank used for text-based detection
# ---------------------------------------------------------------------------

_KEYWORD_MAP: dict[MoodCategory, list[str]] = {
    MoodCategory.HAPPY: [
        "happy",
        "joy",
        "joyful",
        "excited",
        "elated",
        "cheerful",
        "great",
        "wonderful",
        "amazing",
        "fantastic",
        "laugh",
        "smile",
        "fun",
        "celebrate",
        "glad",
        "delighted",
        "pleased",
    ],
    MoodCategory.SAD: [
        "sad",
        "cry",
        "crying",
        "tears",
        "depressed",
        "heartbroken",
        "unhappy",
        "miserable",
        "grief",
        "lonely",
        "lost",
        "down",
        "hopeless",
        "hurt",
        "pain",
        "sorrow",
        "sorrowful",
    ],
    MoodCategory.REFLECTIVE: [
        "reflect",
        "thinking",
        "nostalgic",
        "memories",
        "remember",
        "miss",
        "wonder",
        "ponder",
        "contemplat",
        "peaceful",
        "quiet",
        "thoughtful",
    ],
    MoodCategory.ANXIOUS: [
        "anxious",
        "anxiety",
        "nervous",
        "stress",
        "stressed",
        "worried",
        "worry",
        "fear",
        "scared",
        "overwhelm",
        "panic",
        "restless",
        "uneasy",
    ],
    MoodCategory.ENERGIZED: [
        "energized",
        "pumped",
        "motivated",
        "fired up",
        "hyped",
        "ready",
        "power",
        "strong",
        "unstoppable",
        "determined",
        "driven",
        "alive",
    ],
    MoodCategory.CALM: [
        "calm",
        "relax",
        "relaxed",
        "peaceful",
        "serene",
        "tranquil",
        "chill",
        "mellow",
        "ease",
        "gentle",
        "soothed",
        "still",
    ],
    MoodCategory.ROMANTIC: [
        "love",
        "romantic",
        "romance",
        "heart",
        "affection",
        "crush",
        "darling",
        "beloved",
        "together",
        "close",
        "intimate",
        "adore",
    ],
    MoodCategory.INSPIRED: [
        "inspired",
        "inspire",
        "creative",
        "dream",
        "vision",
        "purpose",
        "hope",
        "believe",
        "aspire",
        "ambition",
        "passion",
        "future",
    ],
}


# ---------------------------------------------------------------------------
# Public detector
# ---------------------------------------------------------------------------


class MoodDetector:
    """Detect mood from user-supplied text using keyword matching.

    For production use this class can be subclassed or replaced with a model
    that calls a sentiment / emotion-analysis API (e.g. Google NL API,
    AWS Comprehend, or a fine-tuned transformer).
    """

    def detect(self, text: str) -> Mood:
        """Return a :class:`Mood` inferred from *text*.

        The method scores each :class:`MoodCategory` by how many of its
        keywords appear in the lower-cased text, then picks the winner.
        A tie is broken in favour of the first category defined in the enum.

        Args:
            text: Free-form text from the user describing how they feel.

        Returns:
            A :class:`Mood` instance populated with the detected category,
            an intensity proportional to the number of keyword hits, and the
            matched keywords.

        Raises:
            ValueError: If *text* is empty or contains only whitespace.
        """
        if not text or not text.strip():
            raise ValueError("text must not be empty")

        text_lower = text.lower()
        scores: dict[MoodCategory, list[str]] = {cat: [] for cat in MoodCategory}

        for category, keywords in _KEYWORD_MAP.items():
            for kw in keywords:
                # Use word-boundary matching so "sad" does not match "sadly"
                # when "sad" itself is the keyword, but sub-string keywords
                # like "contemplat" still fire on "contemplating".
                pattern = r"\b" + re.escape(kw) if " " not in kw else re.escape(kw)
                if re.search(pattern, text_lower):
                    scores[category].append(kw)

        best_category = max(scores, key=lambda c: len(scores[c]))
        matched = scores[best_category]

        # Intensity: scale the hit-count against the keyword bank size, capped
        # at 0.95 so there is always room for a human-supplied boost.
        bank_size = len(_KEYWORD_MAP[best_category])
        raw_intensity = min(len(matched) / max(bank_size, 1), 0.95)
        # Give at least 0.5 even on a single keyword match.
        intensity = max(raw_intensity, 0.5) if matched else 0.5

        return Mood(
            category=best_category,
            intensity=round(intensity, 2),
            description=text.strip(),
            keywords=matched,
        )

    def from_vibe_choice(self, choice: str) -> Mood:
        """Map a user's short vibe label (e.g. "hopeful") to a :class:`Mood`.

        This is used when A1 asks *"What's your vibe today?"* and the user
        picks from a short list rather than typing free text.

        Args:
            choice: A vibe label string (case-insensitive).

        Returns:
            A :class:`Mood` with a default intensity of 0.7.

        Raises:
            ValueError: If *choice* does not map to any known vibe.
        """
        vibe_map: dict[str, MoodCategory] = {
            "hopeful": MoodCategory.INSPIRED,
            "fun": MoodCategory.HAPPY,
            "soothing": MoodCategory.CALM,
            "happy": MoodCategory.HAPPY,
            "sad": MoodCategory.SAD,
            "reflective": MoodCategory.REFLECTIVE,
            "anxious": MoodCategory.ANXIOUS,
            "energized": MoodCategory.ENERGIZED,
            "calm": MoodCategory.CALM,
            "romantic": MoodCategory.ROMANTIC,
            "inspired": MoodCategory.INSPIRED,
        }
        key = choice.strip().lower()
        if key not in vibe_map:
            available = ", ".join(sorted(vibe_map))
            raise ValueError(
                f"Unknown vibe '{choice}'. Available vibes: {available}"
            )
        return Mood(category=vibe_map[key], intensity=0.7, description=choice)
