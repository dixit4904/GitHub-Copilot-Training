const request = require('supertest');
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

// Mock the mysql2 module
jest.mock('mysql2', () => ({
  createConnection: jest.fn(),
}));

// Mock the jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Import the app after mocking
let app;
let mockDbQuery;
let mockJwtSign;

beforeAll(() => {
  // Set up environment variables
  process.env.JWT_SECRET = 'test_secret';
  process.env.DB_HOST = 'localhost';
  process.env.DB_USER = 'user';
  process.env.DB_PASS = 'pass';
  process.env.DB_NAME = 'db';

  app = require('./new');

  // Mock the db.query directly
  mockDbQuery = jest.fn();
  app.db.query = mockDbQuery;

  // Mock JWT sign
  mockJwtSign = jwt.sign;
  mockJwtSign.mockReturnValue('mocked_token');
});

describe('POST /login', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('should return a token for valid credentials', async () => {
    const mockUser = { id: 1, username: 'testuser' };
    mockDbQuery.mockImplementation((sql, params, callback) => {
      callback(null, [mockUser]);
    });

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'mocked_token');
    expect(mockDbQuery).toHaveBeenCalledWith(
      'SELECT id, username FROM users WHERE username = ? AND password = ? LIMIT 1;',
      ['testuser', 'testpass'],
      expect.any(Function)
    );
    expect(mockJwtSign).toHaveBeenCalledWith(
      { uid: 1 },
      'test_secret',
      { expiresIn: '1h' }
    );
  });

  it('should return 401 for invalid credentials', async () => {
    mockDbQuery.mockImplementation((sql, params, callback) => {
      callback(null, []);
    });

    const response = await request(app)
      .post('/login')
      .send({ username: 'wronguser', password: 'wrongpass' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'invalid');
    expect(mockJwtSign).not.toHaveBeenCalled();
  });

  it('should return 500 for database error', async () => {
    mockDbQuery.mockImplementation((sql, params, callback) => {
      callback(new Error('DB error'), null);
    });

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'db error');
    expect(mockJwtSign).not.toHaveBeenCalled();
  });

  it('should handle missing request body fields', async () => {
    const response = await request(app)
      .post('/login')
      .send({}); // Missing username and password

    // Since destructuring will set them to undefined, query will be called with [undefined, undefined]
    mockDbQuery.mockImplementation((sql, params, callback) => {
      callback(null, []);
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'invalid');
  });
});

// Test for JWT_SECRET not set (though it's checked at startup)
describe('App initialization', () => {
  it('should throw error if JWT_SECRET is not set', () => {
    // Temporarily unset JWT_SECRET
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    jest.resetModules(); // Reset module cache to re-import
    expect(() => {
      require('./new'); // This should throw
    }).toThrow('JWT_SECRET not set');
    // Restore
    process.env.JWT_SECRET = originalSecret;
  });
});
