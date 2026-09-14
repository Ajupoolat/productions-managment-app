import { Request, Response } from 'express';
import * as departmentService from '../services/department.service';
import { asyncHandler } from '../utils/asyncHandler';

export const createDepartment = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const department = await departmentService.createDepartment({ ...req.body, productionId });
  res.status(201).json({ success: true, data: { department } });
});

export const getDepartments = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const departments = await departmentService.getDepartmentsByProduction(productionId);
  res.status(200).json({ success: true, data: { departments } });
});

export const updateDepartment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const department = await departmentService.updateDepartment(id, req.body);
  res.status(200).json({ success: true, data: { department } });
});

export const deleteDepartment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await departmentService.deleteDepartment(id);
  res.status(200).json({ success: true, data: null });
});
