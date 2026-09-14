import { CrewAssignment, ICrewAssignment } from '../models/crew-assignment.model';

import { Types } from 'mongoose';

export const create = async (data: Partial<ICrewAssignment>): Promise<ICrewAssignment> => {
  return await CrewAssignment.create(data);
};

export const findAllByProductionId = async (productionId: string | Types.ObjectId): Promise<ICrewAssignment[]> => {
  return await CrewAssignment.find({ productionId })
    .populate('userId', 'fullName email')
    .populate('departmentId', 'name')
    .populate('workId', 'title')
    .sort({ createdAt: -1 });
};
