"""Lyrics generator module for A1.

Generates personalised song lyrics in a classic song structure
(Verse → Chorus → Verse → Chorus → Bridge → Chorus) based on the
user's detected :class:`~a1.mood_detector.Mood` and optional theme.
"""

from __future__ import annotations

import random
from dataclasses import dataclass
from enum import Enum

from a1.mood_detector import Mood, MoodCategory

# ---------------------------------------------------------------------------
# Song theme
# ---------------------------------------------------------------------------


class SongTheme(str, Enum):
    """Broad thematic area for the generated song."""

    LOVE = "love"
    LIFE = "life"
    INSPIRATION = "inspiration"
    HEALING = "healing"
    CELEBRATION = "celebration"
    REFLECTION = "reflection"


# ---------------------------------------------------------------------------
# Lyric data – one pool per (MoodCategory, SongTheme) combination
# ---------------------------------------------------------------------------

# Each entry in the pool is a tuple of (verse_lines, chorus_lines, bridge_lines).
# Lines are templates; {name} is substituted if the user supplies one.

_LYRIC_POOLS: dict[tuple[MoodCategory, SongTheme], list[dict[str, list[str]]]] = {
    # ------------------------------------------------------------------ HAPPY
    (MoodCategory.HAPPY, SongTheme.LOVE): [
        {
            "verse": [
                "Every morning starts with your smile,",
                "Making every ordinary moment worthwhile.",
                "With you beside me the world feels right,",
                "Colours brighter, the future so bright.",
            ],
            "chorus": [
                "You light the world on fire,",
                "With every step our dreams get higher.",
                "Together we're an unstoppable team,",
                "Living every colour of this beautiful dream.",
            ],
            "bridge": [
                "Nothing can dim the light you bring,",
                "With you around I just want to sing.",
                "Hold my hand as we dance through the night,",
                "Everything feels perfectly right.",
            ],
        }
    ],
    (MoodCategory.HAPPY, SongTheme.LIFE): [
        {
            "verse": [
                "Jump out of bed and greet the sun,",
                "A brand new chapter has just begun.",
                "Laughter echoing down the street,",
                "Life is the melody, love is the beat.",
            ],
            "chorus": [
                "Dance like nobody's watching today,",
                "Throw all your worries and doubts away.",
                "This is your moment, this is your song,",
                "You've belonged here all along.",
            ],
            "bridge": [
                "Even the rain makes the flowers grow,",
                "Even in winter there's a glow.",
                "Keep on moving, don't stop now,",
                "You'll find a way—I know how.",
            ],
        }
    ],
    # ------------------------------------------------------------------- SAD
    (MoodCategory.SAD, SongTheme.HEALING): [
        {
            "verse": [
                "The clouds may cover your skies for now,",
                "You're searching for reasons, searching for how.",
                "Each tear you shed is a river of grace,",
                "Washing away the pain you face.",
            ],
            "chorus": [
                "But the sun's been waiting for you,",
                "Shining through everything you've been through.",
                "You've come so far, don't give up tonight—",
                "This is your moment, you'll be alright.",
            ],
            "bridge": [
                "Hold on a little while longer,",
                "Every storm makes you a little bit stronger.",
                "The dawn is coming, trust the light,",
                "Your story isn't over tonight.",
            ],
        }
    ],
    (MoodCategory.SAD, SongTheme.LOVE): [
        {
            "verse": [
                "I trace your name in fading light,",
                "The empty chair, the quiet night.",
                "The coffee cup still marks your place,",
                "I still remember your embrace.",
            ],
            "chorus": [
                "Distance can't erase what's real,",
                "Time cannot undo the way I feel.",
                "Even when the silence grows too wide,",
                "You're still the fire burning inside.",
            ],
            "bridge": [
                "Maybe love is letting go,",
                "Maybe love is in the not knowing.",
                "But I keep your memory close,",
                "In the things I miss the most.",
            ],
        }
    ],
    # ------------------------------------------------------------ REFLECTIVE
    (MoodCategory.REFLECTIVE, SongTheme.LIFE): [
        {
            "verse": [
                "Seasons change and rivers run,",
                "We chase the moon and follow the sun.",
                "Every road I've walked has shaped this heart,",
                "Every end has been another start.",
            ],
            "chorus": [
                "Look how far we've come, look how far we've grown,",
                "Through the storms and silence, we found our own.",
                "In the space between who I was and who I'll be,",
                "I'm learning to embrace what's meant for me.",
            ],
            "bridge": [
                "I don't need to have all the answers today,",
                "Some truths are only found along the way.",
                "I'm grateful for the scars and the golden years,",
                "For every laugh and every trail of tears.",
            ],
        }
    ],
    # -------------------------------------------------------------- ENERGIZED
    (MoodCategory.ENERGIZED, SongTheme.INSPIRATION): [
        {
            "verse": [
                "The alarm rings but you're already awake,",
                "There's a fire in your chest and a leap you must take.",
                "The world is wide and the horizon calls,",
                "Nothing can stop you, nothing at all.",
            ],
            "chorus": [
                "Raise your voice, the world's yours to claim—",
                "It's your time to rise and win the game.",
                "You light the world on fire,",
                "With every step your dreams get higher.",
            ],
            "bridge": [
                "Push through the doubt, push through the noise,",
                "This is your chapter, this is your choice.",
                "The finish line was made for someone like you,",
                "Go show the world what you can do.",
            ],
        }
    ],
    # --------------------------------------------------------------- ANXIOUS
    (MoodCategory.ANXIOUS, SongTheme.HEALING): [
        {
            "verse": [
                "The thoughts race fast, the night feels long,",
                "You try to stay calm but something feels wrong.",
                "Breathe in slowly, breathe out the fear,",
                "You are safe, and I am here.",
            ],
            "chorus": [
                "You've come so far, don't give up tonight—",
                "This is your moment, you'll be alright.",
                "One breath at a time, one step, one day,",
                "The fear will pass, it always does fade.",
            ],
            "bridge": [
                "You are braver than you believe,",
                "Stronger than anything you've yet conceived.",
                "Let the worry drift like clouds in the sky,",
                "Peace is coming, let it draw nigh.",
            ],
        }
    ],
    # ------------------------------------------------------------------ CALM
    (MoodCategory.CALM, SongTheme.REFLECTION): [
        {
            "verse": [
                "Still waters mirror a quieter sky,",
                "No need to rush and no reason to try.",
                "Let the moment hold you where you stand,",
                "Breathe in the world and open your hands.",
            ],
            "chorus": [
                "Here in the silence I find my way,",
                "Grateful for the beauty of today.",
                "Nothing to prove and nowhere to be,",
                "Just this moment—just you and me.",
            ],
            "bridge": [
                "Let the leaves fall, let the rivers flow,",
                "There's a wisdom in the letting go.",
                "All the answers live inside the pause,",
                "Peace is the beginning of every cause.",
            ],
        }
    ],
    # --------------------------------------------------------------- ROMANTIC
    (MoodCategory.ROMANTIC, SongTheme.LOVE): [
        {
            "verse": [
                "Your laughter is my favourite song,",
                "With you is right where I belong.",
                "The world slows down when you're near,",
                "Every moment with you is crystal clear.",
            ],
            "chorus": [
                "You are my melody, you are my rhyme,",
                "I'd choose you over and over every time.",
                "Underneath the stars that light our way,",
                "I fall in love with you again each day.",
            ],
            "bridge": [
                "No poetry could capture this feeling,",
                "No song could finish what my heart is revealing.",
                "So I'll just hold you close and say,",
                "I love you more with every passing day.",
            ],
        }
    ],
    # --------------------------------------------------------------- INSPIRED
    (MoodCategory.INSPIRED, SongTheme.INSPIRATION): [
        {
            "verse": [
                "There's a spark behind your eyes tonight,",
                "A thousand possibilities shining bright.",
                "The canvas is blank, the page is new,",
                "Everything is waiting here for you.",
            ],
            "chorus": [
                "Dream it, believe it, and make it real,",
                "Speak the vision you're starting to feel.",
                "The world was built by dreamers just like you,",
                "So step into the story you were born to do.",
            ],
            "bridge": [
                "Every great beginning once felt small,",
                "Every mountain started as a call.",
                "Keep the fire burning bright inside,",
                "Let your purpose be your faithful guide.",
            ],
        }
    ],
}

# Fallback pool used when the exact (mood, theme) pair has no entry.
_FALLBACK_POOL: list[dict[str, list[str]]] = [
    {
        "verse": [
            "Life is a song we're learning to sing,",
            "Every note a new beginning.",
            "Through the highs and through the lows we go,",
            "Finding beauty in the ebb and flow.",
        ],
        "chorus": [
            "This is your moment, this is your time,",
            "Every word of your story and every rhyme.",
            "You are exactly where you need to be,",
            "Living your truth and finally free.",
        ],
        "bridge": [
            "When the night feels long remember the dawn,",
            "Every ending is a new song.",
            "Keep on shining, keep on bright,",
            "You were born to be this light.",
        ],
    }
]


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------


@dataclass
class SongSection:
    """A single section of a song (verse, chorus, or bridge)."""

    label: str  # e.g. "Verse 1", "Chorus", "Bridge"
    lines: list[str]

    def __str__(self) -> str:
        return f"[{self.label}]\n" + "\n".join(self.lines)


@dataclass
class Lyrics:
    """A complete set of song lyrics made up of ordered :class:`SongSection` objects."""

    title: str
    sections: list[SongSection]
    mood: Mood
    theme: SongTheme

    def __str__(self) -> str:
        header = f"♪ {self.title} ♪\n{'─' * (len(self.title) + 4)}"
        body = "\n\n".join(str(s) for s in self.sections)
        return f"{header}\n\n{body}"


# ---------------------------------------------------------------------------
# Generator
# ---------------------------------------------------------------------------


class LyricsGenerator:
    """Generate personalised song lyrics for a given :class:`~a1.mood_detector.Mood`.

    The generator selects from curated lyric pools keyed on
    ``(MoodCategory, SongTheme)`` and assembles them into the standard
    **Verse → Chorus → Verse → Chorus → Bridge → Chorus** structure.

    A future implementation can replace the pool lookup with a call to a
    large-language-model API (e.g. OpenAI ``/v1/chat/completions``) by
    overriding :meth:`_select_pool_entry`.
    """

    def generate(
        self,
        mood: Mood,
        theme: SongTheme | None = None,
        title: str | None = None,
        user_name: str | None = None,
    ) -> Lyrics:
        """Generate a full set of song lyrics.

        Args:
            mood:       The user's detected or chosen emotional state.
            theme:      Optional thematic area; auto-selected from mood if omitted.
            title:      Optional custom song title.
            user_name:  Optional user name used to personalise select lines.

        Returns:
            A :class:`Lyrics` object containing all song sections.
        """
        resolved_theme = theme or self._default_theme(mood)
        pool_entry = self._select_pool_entry(mood, resolved_theme)

        verse_lines = list(pool_entry["verse"])
        chorus_lines = list(pool_entry["chorus"])
        bridge_lines = list(pool_entry["bridge"])

        if user_name:
            verse_lines = [line.replace("{name}", user_name) for line in verse_lines]
            chorus_lines = [line.replace("{name}", user_name) for line in chorus_lines]
            bridge_lines = [line.replace("{name}", user_name) for line in bridge_lines]

        # Classic structure: V1 – C – V2 – C – B – C
        # Verse 2 reuses the same lines with optional variation (shuffle last pair).
        verse2_lines = verse_lines[:2] + list(reversed(verse_lines[2:]))

        sections = [
            SongSection("Verse 1", verse_lines),
            SongSection("Chorus", chorus_lines),
            SongSection("Verse 2", verse2_lines),
            SongSection("Chorus", chorus_lines),
            SongSection("Bridge", bridge_lines),
            SongSection("Chorus (Outro)", chorus_lines),
        ]

        resolved_title = title or self._generate_title(mood, resolved_theme)
        return Lyrics(
            title=resolved_title,
            sections=sections,
            mood=mood,
            theme=resolved_theme,
        )

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _default_theme(self, mood: Mood) -> SongTheme:
        """Choose a sensible default theme based on mood category."""
        mapping: dict[MoodCategory, SongTheme] = {
            MoodCategory.HAPPY: SongTheme.LOVE,
            MoodCategory.SAD: SongTheme.HEALING,
            MoodCategory.REFLECTIVE: SongTheme.LIFE,
            MoodCategory.ANXIOUS: SongTheme.HEALING,
            MoodCategory.ENERGIZED: SongTheme.INSPIRATION,
            MoodCategory.CALM: SongTheme.REFLECTION,
            MoodCategory.ROMANTIC: SongTheme.LOVE,
            MoodCategory.INSPIRED: SongTheme.INSPIRATION,
        }
        return mapping.get(mood.category, SongTheme.LIFE)

    def _select_pool_entry(
        self, mood: Mood, theme: SongTheme
    ) -> dict[str, list[str]]:
        """Return a randomly selected lyric entry for *(mood, theme)*.

        Falls back to the global fallback pool if no entry exists for the
        given combination.
        """
        pool = _LYRIC_POOLS.get((mood.category, theme), _FALLBACK_POOL)
        return random.choice(pool)

    def _generate_title(self, mood: Mood, theme: SongTheme) -> str:
        """Generate a short evocative title from mood and theme."""
        titles: dict[tuple[MoodCategory, SongTheme], list[str]] = {
            (MoodCategory.HAPPY, SongTheme.LOVE): [
                "Your Smile Is My Sunshine",
                "Dancing in the Light",
            ],
            (MoodCategory.SAD, SongTheme.HEALING): [
                "The Sun's Been Waiting",
                "After the Rain",
            ],
            (MoodCategory.REFLECTIVE, SongTheme.LIFE): [
                "Rivers and Roads",
                "Between Then and Now",
            ],
            (MoodCategory.ENERGIZED, SongTheme.INSPIRATION): [
                "Rise and Claim It",
                "Fire in My Chest",
            ],
            (MoodCategory.ANXIOUS, SongTheme.HEALING): [
                "Breathe",
                "One Step at a Time",
            ],
            (MoodCategory.CALM, SongTheme.REFLECTION): [
                "Still Waters",
                "The Art of Letting Go",
            ],
            (MoodCategory.ROMANTIC, SongTheme.LOVE): [
                "You Are My Melody",
                "Under These Stars",
            ],
            (MoodCategory.INSPIRED, SongTheme.INSPIRATION): [
                "The Story You Were Born to Do",
                "Spark",
            ],
        }
        options = titles.get(
            (mood.category, theme), ["This Moment", "Your Song", "Written for You"]
        )
        return random.choice(options)
