import * as workRepo from '../repositories/work.repository';
import { IWork } from '../models/work.model';

export const createWork = async (data: Partial<IWork>) => {
  return await workRepo.create(data);
};

export const getWorksByProduction = async (productionId: string) => {
  return await workRepo.findAllByProductionId(productionId);
};

export const updateWork = async (id: string, data: Partial<IWork>) => {
  return await workRepo.update(id, data);
};

export const deleteWork = async (id: string) => {
  await workRepo.remove(id);
};
