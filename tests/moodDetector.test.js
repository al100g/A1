'use strict';

const { detectMood, MOOD_KEYWORDS } = require('../src/moodDetector');

describe('moodDetector', () => {
  describe('detectMood()', () => {
    it('returns calm as default for empty input', () => {
      const result = detectMood('');
      expect(result.dominantMood).toBe('calm');
      expect(result.confidence).toBe(0);
    });

    it('returns calm as default for whitespace-only input', () => {
      const result = detectMood('   ');
      expect(result.dominantMood).toBe('calm');
    });

    it('detects a happy mood from text', () => {
      const { dominantMood } = detectMood('I am so happy and joyful today, feeling amazing!');
      expect(dominantMood).toBe('happy');
    });

    it('detects a sad mood from text', () => {
      const { dominantMood } = detectMood('I feel so sad and lonely, I have been crying all night');
      expect(dominantMood).toBe('sad');
    });

    it('detects a calm mood from text', () => {
      const { dominantMood } = detectMood('I feel very calm, relaxed and peaceful right now');
      expect(dominantMood).toBe('calm');
    });

    it('detects an energetic mood from text', () => {
      const { dominantMood } = detectMood('I am so pumped and energetic, ready for my workout!');
      expect(dominantMood).toBe('energetic');
    });

    it('detects an angry mood from text', () => {
      const { dominantMood } = detectMood('I am so angry and furious, feeling full of rage');
      expect(dominantMood).toBe('angry');
    });

    it('detects a hopeful mood from text', () => {
      const { dominantMood } = detectMood('I feel hopeful and optimistic about the future, feeling inspired');
      expect(dominantMood).toBe('hopeful');
    });

    it('returns scores as a record with all mood keys', () => {
      const { scores } = detectMood('I feel great today');
      for (const mood of Object.keys(MOOD_KEYWORDS)) {
        expect(typeof scores[mood]).toBe('number');
      }
    });

    it('normalises scores to 0-1 range', () => {
      const { scores } = detectMood('I am so happy and joyful and cheerful and excited');
      for (const score of Object.values(scores)) {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
      }
    });

    it('the dominant mood always has the highest score', () => {
      const { scores, dominantMood } = detectMood('I am so happy and joyful and cheerful');
      for (const [mood, score] of Object.entries(scores)) {
        if (mood !== dominantMood) {
          expect(scores[dominantMood]).toBeGreaterThanOrEqual(score);
        }
      }
    });

    it('confidence equals the dominant mood normalised score', () => {
      const { scores, dominantMood, confidence } = detectMood('feeling sad and lonely');
      expect(confidence).toBeCloseTo(scores[dominantMood], 5);
    });

    it('is case-insensitive', () => {
      const lower = detectMood('i am happy and joyful');
      const upper = detectMood('I AM HAPPY AND JOYFUL');
      expect(lower.dominantMood).toBe(upper.dominantMood);
    });
  });

  describe('MOOD_KEYWORDS', () => {
    it('contains entries for each expected mood', () => {
      const expectedMoods = ['happy', 'sad', 'calm', 'energetic', 'angry', 'hopeful'];
      for (const mood of expectedMoods) {
        expect(MOOD_KEYWORDS[mood]).toBeDefined();
        expect(MOOD_KEYWORDS[mood].length).toBeGreaterThan(0);
      }
    });

    it('every keyword entry has a word and a positive weight', () => {
      for (const keywords of Object.values(MOOD_KEYWORDS)) {
        for (const entry of keywords) {
          expect(typeof entry.word).toBe('string');
          expect(entry.word.length).toBeGreaterThan(0);
          expect(typeof entry.weight).toBe('number');
          expect(entry.weight).toBeGreaterThan(0);
        }
      }
    });
  });
});
