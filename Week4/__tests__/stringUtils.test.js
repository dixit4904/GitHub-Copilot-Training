import {
  extractEmails,
  extractUrls,
  wordCount,
  capitalizeWords,
  reverseString
} from '../stringUtils.js';

describe('stringUtils', () => {
  describe('extractEmails', () => {
    const cases = [
      { name: 'finds single email', input: 'Contact me at test@example.com', expected: ['test@example.com'] },
      { name: 'finds multiple emails', input: 'a@b.com and c@d.org', expected: ['a@b.com', 'c@d.org'] },
      { name: 'returns empty array when none', input: 'no emails here', expected: [] }
    ];

    test.each(cases)('%s', (tc) => {
      // Each case validates extraction behavior and edge cases
      expect(extractEmails(tc.input)).toEqual(tc.expected);
    });
  });

  describe('extractUrls', () => {
    test('extracts http and https urls', () => {
      const text = 'visit http://example.com and https://site.org/page';
      // Should find both urls
      expect(extractUrls(text)).toEqual(['http://example.com', 'https://site.org/page']);
    });

    test('returns empty array when no urls', () => {
      expect(extractUrls('no links')).toEqual([]);
    });
  });

  describe('wordCount', () => {
    const cases = [
      { name: 'counts words in normal sentence', input: 'hello world', expected: 2 },
      { name: 'handles extra spaces', input: '  multiple   spaces   here ', expected: 3 },
      { name: 'returns 0 for empty input', input: '', expected: 0 }
    ];

    test.each(cases)('%s', (tc) => {
      expect(wordCount(tc.input)).toBe(tc.expected);
    });
  });

  describe('capitalizeWords', () => {
    test('capitalizes each word start', () => {
      expect(capitalizeWords('hello world from js')).toBe('Hello World From Js');
    });

    test('maintains non-letter characters', () => {
      expect(capitalizeWords('123 abc')).toBe('123 Abc');
    });
  });

  describe('reverseString', () => {
    test('reverses ASCII string', () => {
      expect(reverseString('abc')).toBe('cba');
    });

    test('reverses emojis and Unicode correctly', () => {
      // This checks that surrogate pairs and combined emoji are handled
      expect(reverseString('👍🏻😊')).toBe('😊🏻👍');
    });
  });
});
