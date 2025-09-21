import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {

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
    it('should return a random number between 1 and 100', async () => {
      const res = await request(app).get('/random');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('random');
      const randomNumber = res.body.data.random;
      expect(typeof randomNumber).toBe('number');
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(100);
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
      expect(res.body.data).toHaveProperty('name', 'Player A');
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
  });
});
