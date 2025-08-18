import request from 'supertest';
import server from '../index.js';

afterAll(() => {
  server.close();
});

describe('GET /users/:profileId', () => {
  it('should respond with 200 and return a data property containing a single user profile object', async () => {
    const userProfileId = '626a97eb-3859-492b-80b6-e66a085e8ced';
    const response = await request(server).get(
      `/api/v1/users/${userProfileId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
  });
});
