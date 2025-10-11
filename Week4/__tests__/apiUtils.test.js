// Use ESM-compatible mocking: import Jest globals and declare the mock before importing the module under test.
import { jest } from '@jest/globals';

jest.unstable_mockModule('axios', () => ({
  default: { get: jest.fn() }
}));

// Import the mocked axios and the module under test using top-level await
const axios = (await import('axios')).default;
const { getWeather, getUsers, getPostsByUser } = await import('../apiUtils.js');

describe('apiUtils', () => {
  afterEach(() => {
    // Reset the mock between tests to avoid cross-test pollution
    axios.get.mockReset();
  });

  describe('getWeather', () => {
    const cases = [
      {
        name: 'returns weather data on success',
        city: 'London',
        apiKey: 'valid-key',
        mockResponse: { status: 200, data: { location: { name: 'London' } } },
        expected: { location: { name: 'London' } }
      },
      {
        name: 'throws when non-200 status',
        city: 'Nowhere',
        apiKey: 'bad-key',
        mockResponse: { status: 500, data: {} },
        expectedError: 'API call failed'
      },
      {
        name: 'throws when axios rejects (network error)',
        city: 'Network',
        apiKey: 'key',
        mockReject: new Error('Network Error'),
        expectedError: 'Network Error'
      }
    ];

    test.each(cases)('%s', async (tc) => {
      // Arrange: set up axios mock according to the table-driven test case
      if (tc.mockReject) {
        axios.get.mockRejectedValue(tc.mockReject);
      } else {
        axios.get.mockResolvedValue(tc.mockResponse);
      }

      // Act + Assert: success case
      if (tc.expected) {
        const data = await getWeather(tc.city, tc.apiKey);
        expect(axios.get).toHaveBeenCalled();
        expect(data).toEqual(tc.expected);
      } else {
        // Act + Assert: error cases
        await expect(getWeather(tc.city, tc.apiKey)).rejects.toThrow(tc.expectedError);
      }
    });
  });

  describe('getUsers', () => {
    test('returns users when API responds with 200', async () => {
      // Mock successful users fetch
      const users = [{ id: 1, name: 'Alice' }];
      axios.get.mockResolvedValue({ status: 200, data: users });

      const result = await getUsers();

      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(result).toEqual(users);
    });

    test('throws when API responds with non-200 status', async () => {
      // Mock failure response
      axios.get.mockResolvedValue({ status: 404, data: {} });
      await expect(getUsers()).rejects.toThrow('Failed to fetch users');
    });
  });

  describe('getPostsByUser', () => {
    const cases = [
      {
        name: 'returns posts for a valid user id',
        userId: 1,
        mockResponse: { status: 200, data: [{ id: 1, userId: 1 }] },
        expected: [{ id: 1, userId: 1 }]
      },
      {
        name: 'returns empty array when user has no posts',
        userId: 9999,
        mockResponse: { status: 200, data: [] },
        expected: []
      },
      {
        name: 'throws on non-200 status',
        userId: 2,
        mockResponse: { status: 500, data: {} },
        expectedError: 'Failed to fetch posts'
      }
    ];

    test.each(cases)('%s', async (tc) => {
      axios.get.mockResolvedValue(tc.mockResponse);
      if (tc.expected) {
        const posts = await getPostsByUser(tc.userId);
        expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts?userId=${tc.userId}`);
        expect(posts).toEqual(tc.expected);
      } else {
        await expect(getPostsByUser(tc.userId)).rejects.toThrow(tc.expectedError);
      }
    });
  });
});
