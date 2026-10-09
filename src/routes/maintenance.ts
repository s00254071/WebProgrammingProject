import { Router } from 'express';
import { MaintenanceController } from '../controllers/maintenance';
import { validate } from '../middleware/validate.middleware';
import { createMaintenanceZSchema, updateMaintenanceZSchema } from '../models/maintenance';

const router = Router();
const maintenanceController = new MaintenanceController();

router.get('/', maintenanceController.getAllMaintenance);
router.get('/:id', maintenanceController.getMaintenanceById);
router.post('/', validate(createMaintenanceZSchema), maintenanceController.createMaintenance);
router.put('/:id', validate(updateMaintenanceZSchema), maintenanceController.updateMaintenance);
router.delete('/:id', maintenanceController.deleteMaintenance);

export default router;