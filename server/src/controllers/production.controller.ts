import { Request, Response } from 'express';
import * as productionService from '../services/production.service';
import { asyncHandler } from '../utils/asyncHandler';

export const createProduction = asyncHandler(async (req: Request, res: Response) => {
  const productionManagerId = req.user!._id.toString();
  
  const production = await productionService.createProduction(
    req.body,
    productionManagerId
  );

  res.status(201).json({
    success: true,
    message: 'Production created successfully',
    data: { production },
  });
});

export const getProductions = asyncHandler(async (req: Request, res: Response) => {
  const { data: productions, meta } = await productionService.getProductions(req.query);

  res.status(200).json({
    success: true,
    data: { productions },
    meta
  });
});

export const getProductionById = asyncHandler(async (req: Request, res: Response) => {
  const production = await productionService.getProductionById(req.params.id as string);

  res.status(200).json({
    success: true,
    data: { production },
  });
});

export const updateProduction = asyncHandler(async (req: Request, res: Response) => {
  const managerId = req.user!._id.toString();
  const production = await productionService.updateProduction(
    req.params.id as string,
    req.body,
    managerId
  );

  res.status(200).json({
    success: true,
    message: 'Production updated successfully',
    data: { production },
  });
});

export const deleteProduction = asyncHandler(async (req: Request, res: Response) => {
  const managerId = req.user!._id.toString();
  await productionService.deleteProduction(req.params.id as string, managerId);

  res.status(200).json({
    success: true,
    message: 'Production deleted successfully',
    data: null,
  });
});