import request from 'supertest';
import server from '../index.js';

afterAll(() => {
  server.close();
});

describe('POST /auth/login', () => {
  it('should return an object with a token', async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'milimenares@gmail.com', password: '123123' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('token');
  });

  it('should return a 401 status for invalid credentials', async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'info@wawita.cl', password: '456456' });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});

describe('POST /auth/register', () => {
  /*
  it('should return an object with a token', async () => {
    const response = await request(server).post('/api/v1/auth/register').send({
      email: 'ventas@pequenosencanto.cl',
      name: 'Pequeños Encanto S.A.',
      password: '123123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('token');
  });
  */
  it('should return a 409 status when user is already registered', async () => {
    const response = await request(server).post('/api/v1/auth/register').send({
      email: 'ventas@babyworld.cl',
      name: 'Baby World SPA',
      password: '123123',
    });

    expect(response.status).toBe(409);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'User already exists');
  });
});
