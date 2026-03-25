'use strict';

const { A1 } = require('../src/a1');

describe('A1', () => {
  describe('constructor', () => {
    it('initialises with default options', () => {
      const a1 = new A1();
      expect(a1.userName).toBe('');
      expect(a1.recommendationCount).toBe(5);
      expect(a1.singLyrics).toBe(true);
    });

    it('accepts a custom user name', () => {
      const a1 = new A1({ userName: 'Alex' });
      expect(a1.userName).toBe('Alex');
    });

    it('accepts a custom recommendation count', () => {
      const a1 = new A1({ recommendationCount: 3 });
      expect(a1.recommendationCount).toBe(3);
    });

    it('accepts singLyrics: false', () => {
      const a1 = new A1({ singLyrics: false });
      expect(a1.singLyrics).toBe(false);
    });
  });

  describe('respond()', () => {
    let a1;
    beforeEach(() => {
      a1 = new A1({ userName: 'Alex', recommendationCount: 3 });
    });

    it('returns an object with all expected keys', () => {
      const result = a1.respond("I'm feeling really happy today!");
      expect(result).toHaveProperty('detectedMood');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('scores');
      expect(result).toHaveProperty('strategy');
      expect(result).toHaveProperty('recommendation');
      expect(result).toHaveProperty('lyrics');
      expect(result).toHaveProperty('text');
    });

    it('detects a happy mood', () => {
      const result = a1.respond('I am so happy, joyful and excited!');
      expect(result.detectedMood).toBe('happy');
    });

    it('detects a sad mood', () => {
      const result = a1.respond('I feel so sad and lonely, been crying a lot');
      expect(result.detectedMood).toBe('sad');
    });

    it('returns the requested number of songs', () => {
      const result = a1.respond('I feel great');
      expect(result.recommendation.songs.length).toBe(3);
    });

    it('includes lyrics in the text output when singLyrics is true', () => {
      const result = a1.respond('I feel great');
      expect(result.text).toContain('🎤');
    });

    it('omits lyrics from the text output when singLyrics is false', () => {
      const silentA1 = new A1({ singLyrics: false });
      const result = silentA1.respond('I feel great');
      expect(result.text).not.toContain('🎤');
    });

    it('includes user name in the text output', () => {
      const result = a1.respond('I am feeling calm and relaxed');
      expect(result.text).toContain('Alex');
    });

    it('uses the amplify strategy by default', () => {
      const result = a1.respond('I feel happy');
      expect(result.strategy).toBe('amplify');
    });

    it('uses the shift strategy when requested', () => {
      const result = a1.respond('I feel sad', 'shift');
      expect(result.strategy).toBe('shift');
      expect(result.recommendation.targetMood).not.toBe('sad');
    });

    it('confidence is between 0 and 1', () => {
      const result = a1.respond('I am pumped and energetic');
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  describe('recommend()', () => {
    it('returns a recommendation object', () => {
      const a1 = new A1({ recommendationCount: 4 });
      const result = a1.recommend('happy');
      expect(result).toHaveProperty('songs');
      expect(result.songs.length).toBe(4);
    });

    it('supports shift strategy', () => {
      const a1 = new A1();
      const result = a1.recommend('sad', 'shift');
      expect(result.targetMood).not.toBe('sad');
    });
  });

  describe('sing()', () => {
    it('returns a string containing a musical note emoji', () => {
      const a1 = new A1({ userName: 'Sam' });
      const lyrics = a1.sing('happy');
      expect(lyrics).toContain('🎤');
    });

    it('personalises the lyrics with the user name', () => {
      const a1 = new A1({ userName: 'Jordan' });
      const lyrics = a1.sing('sad');
      expect(lyrics).toContain('Jordan');
    });

    it('works without a user name set', () => {
      const a1 = new A1();
      expect(() => a1.sing('calm')).not.toThrow();
    });
  });
});
