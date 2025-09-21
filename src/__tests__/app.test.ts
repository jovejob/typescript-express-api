import request from 'supertest';
import app from '../app';
import { readPlayers, writePlayers } from '../storage';
import { Player } from '../types';

// Mock the storage functions
jest.mock('../storage');
const mockedReadPlayers = readPlayers as jest.Mock;
const mockedWritePlayers = writePlayers as jest.Mock;

describe('API Endpoints', () => {
  let mockPlayers: Player[];

  beforeEach(() => {
    // Reset mocks before each test
    mockPlayers = [
      { id: 1, name: 'Hero1', balance: 100 },
      { id: 2, name: 'Hero2', balance: 200 },
    ];
    mockedReadPlayers.mockResolvedValue(JSON.parse(JSON.stringify(mockPlayers)));
    mockedWritePlayers.mockResolvedValue(undefined);
  });

  // Test for the root endpoint
  describe('GET /', () => {
    it('should return a welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Welcome to my TypeScript Express API!');
    });
  });

  // Test suite for /random endpoint
  describe('GET /random', () => {
    it('should return a random number between 1 and 10', async () => {
      const res = await request(app).get('/random');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('random');
      const randomNumber = res.body.data.random;
      expect(typeof randomNumber).toBe('number');
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(10);
    });
  });

  // Test suite for /players endpoint
  describe('Player API', () => {
    it('GET /players - should return all players', async () => {
      const res = await request(app).get('/players');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /players/:id - should return a single player', async () => {
      const res = await request(app).get('/players/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('id', 1);
      expect(res.body.data).toHaveProperty('name', mockPlayers[0].name);
    });

    it('GET /players/:id - should return 404 for non-existent player', async () => {
      const res = await request(app).get('/players/999');
      expect(res.statusCode).toEqual(404);
    });

    it('POST /players - should create a new player', async () => {
      const newPlayer = {
        name: 'Jove Trajkoski',
        balance: 1500,
      };
      const res = await request(app)
        .post('/players')
        .send(newPlayer);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(newPlayer.name);
      expect(res.body.data.balance).toBe(newPlayer.balance);
    });

    it('POST /players - should return 400 for invalid data', async () => {
      const res = await request(app)
        .post('/players')
        .send({ name: 'Invalid' }); // Missing balance
      expect(res.statusCode).toEqual(400);
    });

    describe('POST /players/:id/spin', () => {
      it('should update the player balance and return the updated player', async () => {
        const initialBalance = mockPlayers[0].balance; // 100
        const res = await request(app).post('/players/1/spin');

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.id).toEqual(1);
        // Check that balance is greater than it was
        expect(res.body.data.balance).toBeGreaterThan(initialBalance);
        // Check that balance is within the possible new range
        expect(res.body.data.balance).toBeLessThanOrEqual(initialBalance + 10);
        expect(mockedWritePlayers).toHaveBeenCalled();
      });

      it('should return 404 if the player does not exist', async () => {
        const res = await request(app).post('/players/999/spin');
        expect(res.statusCode).toEqual(404);
      });
    });
  });
});
