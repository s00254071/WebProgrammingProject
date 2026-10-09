import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface IMaintenance {
  carId: string;
  type: string;
  date: Date;
  cost: number;
}

const maintenanceSchema = new Schema<IMaintenance>(
  {
    carId: { type: String, required: true },
    type: { type: String, required: true, enum: ['oil change', 'tyres', 'nct', 'brakes', 'repair'] },
    date: { type: Date, required: true },
    cost: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const MaintenanceModel = model<IMaintenance>('Maintenance', maintenanceSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateMaintenanceInput:
 *       type: object
 *       required:
 *         - carId
 *         - type
 *         - date
 *         - cost
 *       properties:
 *         carId:
 *           type: string
 *           example: 6702a1b2c3d4e5f6a7b8c9d0
 *         type:
 *           type: string
 *           enum: [oil change, tyres, nct, brakes, repair]
 *           example: oil change
 *         date:
 *           type: string
 *           example: 2026-09-15
 *         cost:
 *           type: number
 *           example: 85
 */
export const createMaintenanceZSchema = z.object({
  carId: z.string().min(1),
  type: z.enum(['oil change', 'tyres', 'nct', 'brakes', 'repair']),
  date: z.coerce.date(),
  cost: z.number().min(0),
});

export const updateMaintenanceZSchema = z.object({
  carId: z.string().min(1),
  type: z.enum(['oil change', 'tyres', 'nct', 'brakes', 'repair']),
  date: z.coerce.date(),
  cost: z.number().min(0),
});