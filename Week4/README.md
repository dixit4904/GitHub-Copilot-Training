# Week4 Utilities

## Overview

This module contains a small collection of utility functions split across three files:

- `apiUtils.js` - simple wrappers around HTTP calls (uses axios) to fetch weather data and placeholder users/posts. Useful for learning how to structure API helpers and for small demo apps.
- `mathUtils.js` - commonly used math helpers (factorial, fibonacci, primality checks, array helpers, random integer generator).
- `stringUtils.js` - string parsing and manipulation helpers (email and URL extraction, word counts, capitalization, and Unicode-safe reversal).

Why this exists: these utilities are small, focused helpers meant for teaching and unit testing exercises. They demonstrate good targets for table-driven tests and mocking external dependencies.

## Installation

From the `Week4` directory run:

```powershell
npm install
```

Run tests with coverage:

```powershell
npm test
```

## Usage Examples

apiUtils example:

```javascript
import { getWeather } from './apiUtils.js';

const apiKey = process.env.WEATHER_API_KEY || 'demo-key';
getWeather('London', apiKey).then(data => console.log(data));
```

mathUtils example:

```javascript
import { calculateFactorial, fibonacci } from './mathUtils.js';

console.log(calculateFactorial(5)); // 120
console.log(fibonacci(10)); // 55
```

stringUtils example:

```javascript
import { extractEmails, reverseString } from './stringUtils.js';

console.log(extractEmails('contact me at alice@example.com'));
console.log(reverseString('hello 😊'));
```

## Key Functions

- getWeather(city, apiKey): calls a third-party weather API and returns the payload. Throws on non-200 status.
- getUsers(): fetches users from jsonplaceholder.typicode.com and returns the array.
- getPostsByUser(userId): fetches posts for a given user id.

- calculateFactorial(n): returns n!; throws on negative inputs.
- fibonacci(n): returns the nth Fibonacci number; throws on negative inputs.
- isPrime(n): simple primality check (trial division up to sqrt(n)).
- sumArray(arr), maxInArray(arr): array helpers; both throw if input is not an array.
- isPositiveInteger(n), squareArray(arr), randomInt(min, max), filterEvenNumbers(arr): small utilities.

- extractEmails(text), extractUrls(text): regex-based extraction, return an array or empty array when none found.
- wordCount(text): returns number of words (splits on whitespace); returns 0 for falsy input.
- capitalizeWords(text): uppercases each word-start character.
- reverseString(str): Unicode-safe reversal using Array.from.

## Edge Cases & Limitations

- The API helpers assume axios is available and return the API's raw payload. They throw a generic Error on non-200 responses; callers may want to handle specific status codes.
- Regex-based email and URL extraction are intentionally simple and may not cover every valid RFC-compliant address or URL. They work for common cases but are not a full replacement for dedicated parsers.
- `isPrime` uses trial division and is not optimized for very large numbers.
- `randomInt` relies on Math.random(); for cryptographically secure random numbers use a secure generator.
- Tests included in this folder mock `axios` for deterministic behavior. When integrating with a real API, provide proper API keys and error handling.

## Test Coverage Goal

The provided Jest tests aim for 90%+ coverage of the module. Run `npm test` to see coverage reports in the `coverage` folder.

## Contributing

This repository is for demonstration and learning. If you improve any utilities or tests, please add unit tests that exercise edge cases and update the README accordingly.
