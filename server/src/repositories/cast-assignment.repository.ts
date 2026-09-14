import { CastAssignment, ICastAssignment } from '../models/cast-assignment.model';

import { Types } from 'mongoose';

export const create = async (data: Partial<ICastAssignment>): Promise<ICastAssignment> => {
  return await CastAssignment.create(data);
};

export const findAllByProductionId = async (productionId: string | Types.ObjectId): Promise<ICastAssignment[]> => {
  return await CastAssignment.find({ productionId })
    .populate('userId', 'fullName email')
    .populate('characterId', 'name description')
    .sort({ createdAt: -1 });
};
