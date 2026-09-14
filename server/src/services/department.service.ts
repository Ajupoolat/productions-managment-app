import * as departmentRepo from '../repositories/department.repository';
import { IDepartment } from '../models/department.model';

export const createDepartment = async (data: Partial<IDepartment>) => {
  return await departmentRepo.create(data);
};

export const getDepartmentsByProduction = async (productionId: string) => {
  return await departmentRepo.findAllByProductionId(productionId);
};

export const updateDepartment = async (id: string, data: Partial<IDepartment>) => {
  return await departmentRepo.update(id, data);
};

export const deleteDepartment = async (id: string) => {
  await departmentRepo.remove(id);
};
