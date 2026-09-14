import { Department, IDepartment } from '../models/department.model';
import { Types } from 'mongoose';

export const create = async (data: Partial<IDepartment>): Promise<IDepartment> => {
  return await Department.create(data);
};

export const findAllByProductionId = async (productionId: string | Types.ObjectId): Promise<IDepartment[]> => {
  return await Department.find({ productionId }).sort({ name: 1 });
};

export const update = async (id: string | Types.ObjectId, data: Partial<IDepartment>): Promise<IDepartment | null> => {
  return await Department.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string | Types.ObjectId): Promise<void> => {
  await Department.findByIdAndDelete(id);
};
