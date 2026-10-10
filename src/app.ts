import express, { Application, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import carRoutes from './routes/cars';
import maintenanceRoutes from './routes/maintenance';

export const app: Application = express();

app.use(express.json());

app.get("/ping", async (_req: Request, res: Response) => {
    res.json({
        message: "hello from Mehmet"
    });
});

app.use('/api/v1/cars', carRoutes);
app.use('/api/v1/maintenance', maintenanceRoutes);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);