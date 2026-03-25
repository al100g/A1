'use strict';

const { generateLyrics, presentLyrics, VERSE_TEMPLATES } = require('../src/lyricsGenerator');

describe('lyricsGenerator', () => {
  describe('generateLyrics()', () => {
    it('returns a non-empty string', () => {
      const lyrics = generateLyrics('happy', 'Alex');
      expect(typeof lyrics).toBe('string');
      expect(lyrics.length).toBeGreaterThan(0);
    });

    it('substitutes the user name into the lyrics', () => {
      const lyrics = generateLyrics('happy', 'Jordan');
      expect(lyrics).toContain('Jordan');
    });

    it('uses "friend" when no name is provided', () => {
      const lyrics = generateLyrics('happy');
      expect(lyrics).toContain('friend');
    });

    it('uses "friend" when name is empty string', () => {
      const lyrics = generateLyrics('sad', '');
      expect(lyrics).toContain('friend');
    });

    it('uses "friend" when name is whitespace only', () => {
      const lyrics = generateLyrics('calm', '   ');
      expect(lyrics).toContain('friend');
    });

    it('generates lyrics for all known moods', () => {
      const moods = Object.keys(VERSE_TEMPLATES);
      for (const mood of moods) {
        expect(() => generateLyrics(mood, 'Sam')).not.toThrow();
        const lyrics = generateLyrics(mood, 'Sam');
        expect(lyrics.length).toBeGreaterThan(0);
      }
    });

    it('does not contain unreplaced {{name}} or {{mood}} placeholders', () => {
      const lyrics = generateLyrics('happy', 'Alex');
      expect(lyrics).not.toContain('{{name}}');
      expect(lyrics).not.toContain('{{mood}}');
    });

    it('falls back gracefully for an unknown mood', () => {
      const lyrics = generateLyrics('unknownmood', 'Pat');
      expect(typeof lyrics).toBe('string');
      expect(lyrics.length).toBeGreaterThan(0);
      expect(lyrics).toContain('Pat');
    });

    it('replaces all occurrences of the name, not just the first', () => {
      // Pick a template known to have multiple {{name}} uses — run many times to cover all templates
      for (let i = 0; i < 10; i++) {
        const lyrics = generateLyrics('sad', 'Morgan');
        expect(lyrics).not.toContain('{{name}}');
      }
    });
  });

  describe('presentLyrics()', () => {
    it('returns a string containing the lyrics', () => {
      const lyrics = 'Line one\nLine two';
      const output = presentLyrics(lyrics, 'happy', 'Alex');
      expect(output).toContain('Line one');
      expect(output).toContain('Line two');
    });

    it('includes the user name in the header', () => {
      const output = presentLyrics('some lyrics', 'happy', 'Taylor');
      expect(output).toContain('Taylor');
    });

    it('includes the mood in the header', () => {
      const output = presentLyrics('some lyrics', 'energetic', 'Sam');
      expect(output).toContain('energetic');
    });

    it('uses "friend" in the header when no name is provided', () => {
      const output = presentLyrics('some lyrics', 'calm');
      expect(output).toContain('friend');
    });

    it('contains a divider line', () => {
      const output = presentLyrics('lyrics here', 'happy', 'Alex');
      expect(output).toContain('─');
    });

    it('includes the microphone emoji', () => {
      const output = presentLyrics('lyrics', 'happy', 'Alex');
      expect(output).toContain('🎤');
    });
  });

  describe('VERSE_TEMPLATES', () => {
    it('has entries for all six moods', () => {
      const expectedMoods = ['happy', 'sad', 'calm', 'energetic', 'angry', 'hopeful'];
      for (const mood of expectedMoods) {
        expect(VERSE_TEMPLATES[mood]).toBeDefined();
        expect(VERSE_TEMPLATES[mood].length).toBeGreaterThan(0);
      }
    });

    it('every template contains {{name}} placeholder', () => {
      for (const templates of Object.values(VERSE_TEMPLATES)) {
        for (const template of templates) {
          expect(template).toContain('{{name}}');
        }
      }
    });
  });
});
