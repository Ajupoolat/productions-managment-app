import { Request, Response } from 'express';
import * as productionService from '../services/production.service';
import { asyncHandler } from '../utils/asyncHandler';
import { Types } from 'mongoose';

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
  const production = await productionService.getProductionById(req.params.id as string, req.user!);

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

export const assignCast = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const { userId, characterId } = req.body;

  const assignment = await productionService.assignCastMember(productionId as string, userId, characterId);

  res.status(201).json({
    success: true,
    message: 'Cast member assigned successfully',
    data: { assignment }
  });
});

export const assignCrew = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const { userId, departmentId, workId } = req.body;

  const assignment = await productionService.assignCrewMember(productionId as string, userId, departmentId, workId);

  res.status(201).json({
    success: true,
    message: 'Crew member assigned successfully',
    data: { assignment }
  });
});

export const getCastAssignments = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const assignments = await productionService.getCastAssignments(productionId as string);
  res.status(200).json({ success: true, data: { assignments } });
});

export const getCrewAssignments = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const assignments = await productionService.getCrewAssignments(productionId as string);
  res.status(200).json({ success: true, data: { assignments } });
});