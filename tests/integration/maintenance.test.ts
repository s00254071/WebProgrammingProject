import request from "supertest";
import { app } from "../../src/app";

describe('Maintenance API', () => {

    let carId = '';
    let recordId = '';

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .send({ "make": "TestMake", "model": "TestModel" });
        carId = response.body._id;
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/v1/cars/${carId}`);
    });

    it('creates a maintenance record', async () => {
        const response = await request(app)
            .post('/api/v1/maintenance')
            .send({ "carId": carId, "type": "oil change", "date": "2026-09-15", "cost": 85 });
        expect(response.status).toBe(201);
        expect(response.body.carId).toBe(carId);
        recordId = response.body._id;
    });

    it('fails to create a record with bad data', async () => {
        const response = await request(app)
            .post('/api/v1/maintenance')
            .send({ "carId": carId, "type": "car wash", "date": "not a date", "cost": -1 });
        expect(response.status).toBe(400);
    });

    it('returns all records', async () => {
        const response = await request(app)
            .get('/api/v1/maintenance');
        expect(response.status).toBe(200);
    });

    it('returns one record', async () => {
        const response = await request(app)
            .get(`/api/v1/maintenance/${recordId}`);
        expect(response.status).toBe(200);
        expect(response.body.cost).toBe(85);
    });

    it('returns 404 for a record that does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/maintenance/cabcabcabcabcabcabcabcab');
        expect(response.status).toBe(404);
    });

    it('updates a record', async () => {
        const response = await request(app)
            .put(`/api/v1/maintenance/${recordId}`)
            .send({ "carId": carId, "type": "oil change", "date": "2026-09-15", "cost": 95 });
        expect(response.status).toBe(200);
        expect(response.body.cost).toBe(95);
    });

    it('returns 404 when updating a record that does not exist', async () => {
        const response = await request(app)
            .put('/api/v1/maintenance/cabcabcabcabcabcabcabcab')
            .send({ "carId": carId, "type": "oil change", "date": "2026-09-15", "cost": 95 });
        expect(response.status).toBe(404);
    });

    it('fails to update a record with bad data', async () => {
        const response = await request(app)
            .put(`/api/v1/maintenance/${recordId}`)
            .send({ "carId": carId, "type": "oil change", "date": "2026-09-15", "cost": "ninety five" });
        expect(response.status).toBe(400);
    });

    it('deletes a record', async () => {
        const response = await request(app)
            .delete(`/api/v1/maintenance/${recordId}`);
        expect(response.status).toBe(200);
    });

    it('returns 404 when deleting a record that does not exist', async () => {
        const response = await request(app)
            .delete(`/api/v1/maintenance/${recordId}`);
        expect(response.status).toBe(404);
    });

});