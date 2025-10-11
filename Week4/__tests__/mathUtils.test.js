import * as math from '../mathUtils.js';

describe('mathUtils', () => {
  describe('calculateFactorial', () => {
    const cases = [
      { name: 'factorial of 0 is 1', input: 0, expected: 1 },
      { name: 'factorial of 1 is 1', input: 1, expected: 1 },
      { name: 'factorial of 5 is 120', input: 5, expected: 120 }
    ];

    test.each(cases)('%s', (tc) => {
      // Normal cases
      expect(math.calculateFactorial(tc.input)).toBe(tc.expected);
    });

    test('throws for negative numbers', () => {
      // Edge case: negative input should throw
      expect(() => math.calculateFactorial(-1)).toThrow('Negative numbers are not allowed');
    });
  });

  describe('fibonacci', () => {
    const cases = [
      { name: 'fibonacci 0 is 0', input: 0, expected: 0 },
      { name: 'fibonacci 1 is 1', input: 1, expected: 1 },
      { name: 'fibonacci 10 is 55', input: 10, expected: 55 }
    ];

    test.each(cases)('%s', (tc) => {
      expect(math.fibonacci(tc.input)).toBe(tc.expected);
    });

    test('throws for negative numbers', () => {
      expect(() => math.fibonacci(-5)).toThrow('Negative numbers not allowed');
    });
  });

  describe('isPrime', () => {
    const cases = [
      { name: '2 is prime', input: 2, expected: true },
      { name: '3 is prime', input: 3, expected: true },
      { name: '4 is not prime', input: 4, expected: false },
      { name: '1 is not prime', input: 1, expected: false },
      { name: '0 is not prime', input: 0, expected: false }
    ];

    test.each(cases)('%s', (tc) => {
      expect(math.isPrime(tc.input)).toBe(tc.expected);
    });
  });

  describe('sumArray', () => {
    test('sums array of numbers', () => {
      // Normal case
      expect(math.sumArray([1, 2, 3])).toBe(6);
    });

    test('returns 0 for empty array', () => {
      // Edge case: empty array
      expect(math.sumArray([])).toBe(0);
    });

    test('throws when input is not an array', () => {
      // Invalid input
      expect(() => math.sumArray(null)).toThrow('Input must be an array');
    });
  });

  describe('maxInArray', () => {
    test('finds max in normal array', () => {
      expect(math.maxInArray([1, 5, 3])).toBe(5);
    });

    test('handles array with negative numbers', () => {
      expect(math.maxInArray([-10, -3, -20])).toBe(-3);
    });

    test('throws when input not array', () => {
      expect(() => math.maxInArray('nope')).toThrow('Input must be an array');
    });
  });

  describe('isPositiveInteger', () => {
    const cases = [
      { name: 'positive integer 3', input: 3, expected: true },
      { name: 'zero is not positive', input: 0, expected: false },
      { name: 'negative integer', input: -1, expected: false },
      { name: 'non-integer', input: 2.5, expected: false }
    ];

    test.each(cases)('%s', (tc) => {
      expect(math.isPositiveInteger(tc.input)).toBe(tc.expected);
    });
  });

  describe('squareArray', () => {
    test('squares each number', () => {
      expect(math.squareArray([1, 2, -3])).toEqual([1, 4, 9]);
    });

    test('works with empty array', () => {
      expect(math.squareArray([])).toEqual([]);
    });
  });

  describe('randomInt', () => {
    test('returns min when Math.random is 0', () => {
      // Mock Math.random to 0
      const realRandom = Math.random;
      Math.random = () => 0;
      expect(math.randomInt(5, 10)).toBe(5);
      Math.random = realRandom;
    });

    test('returns max when Math.random is nearly 1', () => {
      const realRandom = Math.random;
      Math.random = () => 0.9999999;
      expect(math.randomInt(5, 10)).toBe(10);
      Math.random = realRandom;
    });
  });

  describe('filterEvenNumbers', () => {
    test('filters even numbers from array', () => {
      expect(math.filterEvenNumbers([1, 2, 3, 4])).toEqual([2, 4]);
    });

    test('returns empty array when no evens', () => {
      expect(math.filterEvenNumbers([1, 3, 5])).toEqual([]);
    });
  });
});
