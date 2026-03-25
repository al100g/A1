"""A1 – Interactive CLI entry point.

Run with:
    python -m a1.main
or, if installed via pip:
    a1
"""

from __future__ import annotations

import sys
import textwrap

from a1.lyrics_generator import SongTheme
from a1.song_builder import SongBuilder

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

_BANNER = r"""
    ___   __
   /   | <  |
  / /| | / /
 / ___ |/ /
/_/  |_/_/   — Music & Mood Empowerment AI

"""

_VIBES = [
    "hopeful",
    "fun",
    "soothing",
    "happy",
    "sad",
    "reflective",
    "anxious",
    "energized",
    "calm",
    "romantic",
    "inspired",
]

_THEMES = {
    "1": SongTheme.LOVE,
    "2": SongTheme.LIFE,
    "3": SongTheme.INSPIRATION,
    "4": SongTheme.HEALING,
    "5": SongTheme.CELEBRATION,
    "6": SongTheme.REFLECTION,
}


def _prompt(message: str) -> str:
    """Display *message* and return stripped user input."""
    try:
        return input(message).strip()
    except (EOFError, KeyboardInterrupt):
        print("\n\nGoodbye! Keep making music. 🎵")
        sys.exit(0)


def _ask_vibe() -> str:
    """Ask the user to choose a vibe from the list."""
    print("\nWhat's your vibe today?")
    for i, vibe in enumerate(_VIBES, 1):
        print(f"  {i:>2}. {vibe}")
    while True:
        raw = _prompt("\nEnter a number or type your own vibe: ")
        if raw.isdigit() and 1 <= int(raw) <= len(_VIBES):
            return _VIBES[int(raw) - 1]
        if raw:
            return raw
        print("Please enter a valid choice.")


def _ask_theme() -> SongTheme | None:
    """Ask the user to choose a song theme (optional)."""
    theme_labels = {
        "1": "Love",
        "2": "Life",
        "3": "Inspiration",
        "4": "Healing",
        "5": "Celebration",
        "6": "Reflection",
    }
    print("\nWhat do you want the song to be about?")
    for k, v in theme_labels.items():
        print(f"  {k}. {v}")
    print("  0. Let A1 decide")

    raw = _prompt("\nYour choice (0-6): ")
    if raw in _THEMES:
        return _THEMES[raw]
    return None


def _ask_style_hint() -> str | None:
    """Ask for a free-text musical style preference."""
    hint = _prompt(
        "\nAny music style preferences? "
        "(e.g. 'more upbeat', 'piano only', or press Enter to skip): "
    )
    return hint if hint else None


def _ask_entry_mode() -> str:
    """Ask how the user wants to describe their mood."""
    print(
        textwrap.dedent(
            """
    How would you like to tell A1 how you're feeling?
      1. Type freely (describe your mood in your own words)
      2. Pick a vibe from a list
    """
        )
    )
    while True:
        choice = _prompt("Enter 1 or 2: ")
        if choice in {"1", "2"}:
            return choice
        print("Please enter 1 or 2.")


# ---------------------------------------------------------------------------
# Main flow
# ---------------------------------------------------------------------------


def run() -> None:
    """Run the A1 interactive CLI session."""
    print(_BANNER)
    print("Welcome to A1! I'll write and sing a personalised song just for you.\n")

    builder = SongBuilder()

    # ── Mood capture ──────────────────────────────────────────────────────────
    mode = _ask_entry_mode()

    song = None
    if mode == "1":
        user_text = _prompt(
            "\nTell me how you're feeling right now: "
        )
        if not user_text:
            print("No input provided. Using a default vibe.")
            vibe = "hopeful"
            name = _prompt("\nWhat's your name? (optional, press Enter to skip): ")
            theme = _ask_theme()
            style_hint = _ask_style_hint()
            song = builder.build_from_vibe(
                vibe,
                theme=theme,
                user_name=name or None,
                style_hint=style_hint,
            )
        else:
            name = _prompt("\nWhat's your name? (optional, press Enter to skip): ")
            theme = _ask_theme()
            style_hint = _ask_style_hint()
            song = builder.build_from_text(
                user_text,
                theme=theme,
                user_name=name or None,
                style_hint=style_hint,
            )
    else:
        vibe = _ask_vibe()
        name = _prompt("\nWhat's your name? (optional, press Enter to skip): ")
        theme = _ask_theme()
        style_hint = _ask_style_hint()
        song = builder.build_from_vibe(
            vibe,
            theme=theme,
            user_name=name or None,
            style_hint=style_hint,
        )

    # ── Display ───────────────────────────────────────────────────────────────
    print("\n\nGenerating your song…\n")
    print(song.full_display())

    # ── Feedback loop ─────────────────────────────────────────────────────────
    while True:
        action = _prompt(
            "\nWhat would you like to do?\n"
            "  1. Adjust music style\n"
            "  2. Generate a new version\n"
            "  3. Exit\n"
            "Choice: "
        )
        if action == "1":
            new_hint = _prompt("Describe the style change (e.g. 'more upbeat', 'add strings'): ")
            song = builder.build_from_mood(
                song.mood,
                theme=song.lyrics.theme,
                title=song.lyrics.title,
                style_hint=new_hint,
            )
            print("\n\nUpdated song:\n")
            print(song.full_display())
        elif action == "2":
            song = builder.build_from_mood(
                song.mood,
                theme=song.lyrics.theme,
            )
            print("\n\nNew version:\n")
            print(song.full_display())
        else:
            print("\nThank you for using A1! Keep the music alive. 🎵")
            break


if __name__ == "__main__":
    run()
