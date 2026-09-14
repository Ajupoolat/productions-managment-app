import { Request, Response } from 'express';
import * as characterService from '../services/character.service';
import { asyncHandler } from '../utils/asyncHandler';

export const createCharacter = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const character = await characterService.createCharacter({ ...req.body, productionId });
  res.status(201).json({ success: true, data: { character } });
});

export const getCharacters = asyncHandler(async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const characters = await characterService.getCharactersByProduction(productionId);
  res.status(200).json({ success: true, data: { characters } });
});

export const updateCharacter = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const character = await characterService.updateCharacter(id, req.body);
  res.status(200).json({ success: true, data: { character } });
});

export const deleteCharacter = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await characterService.deleteCharacter(id);
  res.status(200).json({ success: true, data: null });
});
