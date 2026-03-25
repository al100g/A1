const { recommendSongs, formatRecommendation, SUPPORTED_MOODS } = require("../src/songRecommender");
const { MOOD_LIBRARY, MOOD_SHIFT_MAP } = require("../src/moodLibrary");

describe("SUPPORTED_MOODS", () => {
  test("includes happy, sad, calm, energetic, and hopeful", () => {
    expect(SUPPORTED_MOODS).toEqual(expect.arrayContaining(["happy", "sad", "calm", "energetic", "hopeful"]));
  });
});

describe("recommendSongs - amplify mode (default)", () => {
  test.each(SUPPORTED_MOODS)("returns songs for mood '%s'", (mood) => {
    const result = recommendSongs(mood);
    expect(result.mood).toBe(mood);
    expect(result.targetMood).toBe(mood);
    expect(result.songs.length).toBeGreaterThan(0);
  });

  test("returns the requested number of songs", () => {
    const result = recommendSongs("happy", "amplify", 2);
    expect(result.songs).toHaveLength(2);
  });

  test("does not exceed the library size", () => {
    const librarySize = MOOD_LIBRARY["calm"].length;
    const result = recommendSongs("calm", "amplify", librarySize + 10);
    expect(result.songs.length).toBeLessThanOrEqual(librarySize);
  });

  test("each song has title, artist, and genre", () => {
    const result = recommendSongs("energetic", "amplify", 3);
    result.songs.forEach((song) => {
      expect(song).toHaveProperty("title");
      expect(song).toHaveProperty("artist");
      expect(song).toHaveProperty("genre");
    });
  });

  test("is case-insensitive for mood input", () => {
    const result = recommendSongs("Happy");
    expect(result.mood).toBe("happy");
  });

  test("trims whitespace from mood input", () => {
    const result = recommendSongs("  sad  ");
    expect(result.mood).toBe("sad");
  });
});

describe("recommendSongs - shift mode", () => {
  test.each(Object.entries(MOOD_SHIFT_MAP))(
    "shifts mood from '%s' to '%s'",
    (from, to) => {
      const result = recommendSongs(from, "shift");
      expect(result.mood).toBe(from);
      expect(result.targetMood).toBe(to);
      expect(result.songs.length).toBeGreaterThan(0);
    }
  );
});

describe("recommendSongs - error handling", () => {
  test("throws for unsupported mood", () => {
    expect(() => recommendSongs("angry")).toThrow(/Unsupported mood/);
  });

  test("throws for unsupported mode", () => {
    expect(() => recommendSongs("happy", "random")).toThrow(/Unsupported mode/);
  });

  test("throws when mood is empty string", () => {
    expect(() => recommendSongs("")).toThrow(/Unsupported mood/);
  });

  test("throws when mood is undefined", () => {
    expect(() => recommendSongs(undefined)).toThrow(/Unsupported mood/);
  });
});

describe("formatRecommendation", () => {
  test("includes mood description when amplifying", () => {
    const result = recommendSongs("happy", "amplify", 2);
    const formatted = formatRecommendation(result);
    expect(formatted).toContain("happy");
    expect(formatted).toContain("keep that vibe going");
  });

  test("includes source and target mood when shifting", () => {
    const result = recommendSongs("sad", "shift", 2);
    const formatted = formatRecommendation(result);
    expect(formatted).toContain("sad");
    expect(formatted).toContain("hopeful");
    expect(formatted).toContain("shift your mood");
  });

  test("lists songs with numbering and artist info", () => {
    const recommendation = {
      mood: "calm",
      targetMood: "calm",
      songs: [
        { title: "Weightless", artist: "Marconi Union", genre: "ambient" },
      ],
    };
    const formatted = formatRecommendation(recommendation);
    expect(formatted).toContain("1.");
    expect(formatted).toContain('"Weightless"');
    expect(formatted).toContain("Marconi Union");
    expect(formatted).toContain("ambient");
  });
});
