const request = require('supertest');
const app = require('../src/index');

describe('Health endpoint', () => {
    it('GET /health returns 200 and status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });
});

describe('Items endpoint', () => {
    it('GET /items returns 200 with items array', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('items');
    });
});