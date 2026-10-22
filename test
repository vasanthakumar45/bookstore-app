const request = require('supertest');
const app = require('../server');

describe('Bookstore API', () => {
  test('GET /health returns UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  test('GET / returns the welcome page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Online Bookstore');
  });

  test('GET /books returns a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /books/1 returns one book', async () => {
    const res = await request(app).get('/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('GET /books/999 returns 404', async () => {
    const res = await request(app).get('/books/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /books adds a new book', async () => {
    const res = await request(app)
      .post('/books')
      .send({ title: 'Kubernetes Up & Running', author: 'Kelsey Hightower', price: 610 });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Kubernetes Up & Running');
  });

  test('POST /books with missing fields returns 400', async () => {
    const res = await request(app).post('/books').send({ title: 'No author' });
    expect(res.statusCode).toBe(400);
  });
});
