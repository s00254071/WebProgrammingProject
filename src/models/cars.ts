import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface ICar {
  make: string;
  model: string;
  year?: number;
  mileage?: number;
}

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, min: 1950 },
    mileage: { type: Number, min: 0 },
  },
  { timestamps: true }
);

export const CarModel = model<ICar>('Car', carSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - make
 *         - model
 *       properties:
 *         make:
 *           type: string
 *           example: Hyundai
 *         model:
 *           type: string
 *           example: i40
 *         year:
 *           type: integer
 *           example: 2013
 *         mileage:
 *           type: integer
 *           example: 180000
 */
export const createCarZSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1950).optional(),
  mileage: z.number().min(0).optional(),
});

export const updateCarZSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1950).optional(),
  mileage: z.number().min(0).optional(),
});