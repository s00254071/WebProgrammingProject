import request from "supertest";
import { app } from "../../src/app";

const testCar = {
    "make": "TestMake",
    "model": "TestModel",
    "year": 2015,
    "mileage": 100000
}

describe('Cars API', () => {

    let carId = '';

    it('creates a car', async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .send(testCar);
        expect(response.status).toBe(201);
        expect(response.body.make).toBe('TestMake');
        carId = response.body._id;
    });

    it('fails to create a car with bad data', async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .send({ ...testCar, "year": 1900 });
        expect(response.status).toBe(400);
    });

    it('returns all cars', async () => {
        const response = await request(app)
            .get('/api/v1/cars');
        expect(response.status).toBe(200);
    });

    it('returns one car', async () => {
        const response = await request(app)
            .get(`/api/v1/cars/${carId}`);
        expect(response.status).toBe(200);
        expect(response.body.model).toBe('TestModel');
    });

    it('returns 404 for a car that does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/cars/MehmetaliSeatleon');
        expect(response.status).toBe(404);
    });

    it('updates a car', async () => {
        const response = await request(app)
            .put(`/api/v1/cars/${carId}`)
            .send({ ...testCar, "mileage": 110000 });
        expect(response.status).toBe(200);
        expect(response.body.mileage).toBe(110000);
    });

    it('returns 404 when updating a car that does not exist', async () => {
        const response = await request(app)
            .put('/api/v1/cars/MehmetaliSeatleon')
            .send(testCar);
        expect(response.status).toBe(404);
    });

    it('fails to update a car with bad data', async () => {
        const response = await request(app)
            .put(`/api/v1/cars/${carId}`)
            .send({ ...testCar, "mileage": -5 });
        expect(response.status).toBe(400);
    });

    it('deletes a car', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`);
        expect(response.status).toBe(200);
    });

    it('returns 404 when deleting a car that does not exist', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`);
        expect(response.status).toBe(404);
    });

});