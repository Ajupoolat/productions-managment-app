import { Request, Response } from 'express';
import * as workService from '../services/work.service';
import { asyncHandler } from '../utils/asyncHandler';

export const createWork = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const work = await workService.createWork({ ...req.body, productionId });
  res.status(201).json({ success: true, data: { work } });
});

export const getWorks = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const works = await workService.getWorksByProduction(productionId);
  res.status(200).json({ success: true, data: { works } });
});

export const updateWork = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const work = await workService.updateWork(id, req.body);
  res.status(200).json({ success: true, data: { work } });
});

export const deleteWork = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await workService.deleteWork(id);
  res.status(200).json({ success: true, data: null });
});
