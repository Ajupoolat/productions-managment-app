import { Work, IWork } from '../models/work.model';
import { Types } from 'mongoose';

export const create = async (data: Partial<IWork>): Promise<IWork> => {
  return await Work.create(data);
};

export const findAllByProductionId = async (productionId: string | Types.ObjectId): Promise<IWork[]> => {
  return await Work.find({ productionId }).populate('departmentId', 'name').sort({ title: 1 });
};

export const update = async (id: string | Types.ObjectId, data: Partial<IWork>): Promise<IWork | null> => {
  return await Work.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string | Types.ObjectId): Promise<void> => {
  await Work.findByIdAndDelete(id);
};
