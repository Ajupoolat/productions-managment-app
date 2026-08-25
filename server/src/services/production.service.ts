import { IProduction } from '../models/production.model';
import { CreateProductionInput } from '../dto/production/production.dto';
import { AppError } from '../utils/AppError';
import * as productionRepo from '../repositories/production.repository';

export const createProduction = async (
  data: CreateProductionInput,
  productionManagerId: string
): Promise<IProduction> => {
  return await productionRepo.create(data, productionManagerId);
};

export const getProductions = async (query: any = {}): Promise<{ data: IProduction[], meta: any }> => {
  return await productionRepo.findAll(query);
};

export const getProductionById = async (id: string): Promise<IProduction> => {
  const production = await productionRepo.findById(id);

  if (!production) {
    throw new AppError('Production not found', 404);
  }

  return production;
};

export const updateProduction = async (
  id: string,
  data: Partial<CreateProductionInput>,
  managerId: string
): Promise<IProduction> => {
  const production = await productionRepo.findById(id);

  if (!production) {
    throw new AppError('Production not found', 404);
  }

  // Ensure only the assigned manager can update it
  if (production?.productionManagerId?._id.toString() !== managerId) {
    throw new AppError('Not authorized to update this production', 403);
  }

  const updated = await productionRepo.updateById(id, data);
  if (!updated) {
    throw new AppError('Failed to update production', 500);
  }
  return updated;
};

export const deleteProduction = async (
  id: string,
  managerId: string
): Promise<void> => {
  const production = await productionRepo.findById(id);

  if (!production) {
    throw new AppError('Production not found', 404);
  }

  // Ensure only the assigned manager can delete it
  if (production?.productionManagerId?._id.toString() !== managerId) {
    throw new AppError('Not authorized to delete this production', 403);
  }

  await productionRepo.deleteById(id);
};