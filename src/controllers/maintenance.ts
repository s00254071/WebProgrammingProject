import { Request, Response } from 'express';
import { MaintenanceService } from '../service/maintenance';

const maintenanceService = new MaintenanceService();

export class MaintenanceController {

  /**
   * @openapi
   * /maintenance:
   *   get:
   *     summary: Retrieve all maintenance records
   *     tags:
   *       - Maintenance
   *     responses:
   *       200:
   *         description: Successfully retrieved maintenance records
   *       500:
   *         description: Internal server error
   */
  getAllMaintenance = async (_req: Request, res: Response): Promise<void> => {
    try {
      const records = await maintenanceService.getAllMaintenance();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching maintenance records', error });
    }
  };

  /**
   * @openapi
   * /maintenance/{id}:
   *   get:
   *     summary: Get a maintenance record by ID
   *     tags:
   *       - Maintenance
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Maintenance record found
   *       404:
   *         description: Maintenance record not found
   *       500:
   *         description: Internal server error
   */
  getMaintenanceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const record = await maintenanceService.getMaintenanceById(id);
      if (!record) {
        res.status(404).json({ message: 'Maintenance record not found' });
        return;
      }
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching maintenance record', error });
    }
  };

  /**
   * @openapi
   * /maintenance:
   *   post:
   *     summary: Create a new maintenance record
   *     tags:
   *       - Maintenance
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateMaintenanceInput'
   *     responses:
   *       201:
   *         description: Successfully created maintenance record
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  createMaintenance = async (req: Request, res: Response): Promise<void> => {
    try {
      const newRecord = await maintenanceService.createMaintenance(req.body);
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error inserting into MongoDB', error });
    }
  };

  /**
   * @openapi
   * /maintenance/{id}:
   *   put:
   *     summary: Update a maintenance record by ID
   *     tags:
   *       - Maintenance
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateMaintenanceInput'
   *     responses:
   *       200:
   *         description: Maintenance record updated
   *       400:
   *         description: Bad request
   *       404:
   *         description: Maintenance record not found
   *       500:
   *         description: Internal server error
   */
  updateMaintenance = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedRecord = await maintenanceService.updateMaintenance(id, req.body);
      if (!updatedRecord) {
        res.status(404).json({ message: 'Maintenance record not found' });
        return;
      }
      res.status(200).json(updatedRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error updating maintenance record', error });
    }
  };

  /**
   * @openapi
   * /maintenance/{id}:
   *   delete:
   *     summary: Delete a maintenance record by ID
   *     tags:
   *       - Maintenance
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Maintenance record deleted
   *       404:
   *         description: Maintenance record not found
   *       500:
   *         description: Internal server error
   */
  deleteMaintenance = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deletedRecord = await maintenanceService.deleteMaintenance(id);
      if (!deletedRecord) {
        res.status(404).json({ message: 'Maintenance record not found' });
        return;
      }
      res.status(200).json(deletedRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting maintenance record', error });
    }
  };

}