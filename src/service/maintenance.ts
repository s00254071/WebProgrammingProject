import { MaintenanceModel, IMaintenance } from '../models/maintenance'
import { HydratedDocument } from 'mongoose';

export class MaintenanceService {

  async getAllMaintenance(): Promise<IMaintenance[]> {
    return await MaintenanceModel.find().lean();
  }

  async getMaintenanceById(id: string): Promise<IMaintenance | null> {
    return await MaintenanceModel.findById(id).lean();
  }

  async createMaintenance(maintenanceData: IMaintenance): Promise<HydratedDocument<IMaintenance>> {
    const maintenance = new MaintenanceModel(maintenanceData);
    return await maintenance.save();
  }

  async updateMaintenance(id: string, maintenanceData: Partial<IMaintenance>): Promise<IMaintenance | null> {
    return await MaintenanceModel.findByIdAndUpdate(id, maintenanceData, { returnDocument: 'after' }).lean();
  }

  async deleteMaintenance(id: string): Promise<IMaintenance | null> {
    return await MaintenanceModel.findByIdAndDelete(id).lean();
  }

}