import request from 'supertest';
import server from '../index.js';

afterAll(() => {
  server.close();
});

describe('GET /publications', () => {
  it('should respond with 200 and return a data property containing an array of publications', async () => {
    const response = await request(server).get('/api/v1/publications');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe('GET /publications/:id', () => {
  it('should respond with 200 and return a data property containing a single publication object', async () => {
    const publicationId = 'b262a9b7-7db1-4317-b138-6f96119dbf42';
    const response = await request(server).get(
      `/api/v1/publications/${publicationId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
  });
});
