import * as characterRepo from '../repositories/character.repository';
import { ICharacter } from '../models/character.model';

export const createCharacter = async (data: Partial<ICharacter>) => {
  return await characterRepo.create(data);
};

export const getCharactersByProduction = async (productionId: string) => {
  return await characterRepo.findAllByProductionId(productionId);
};

export const updateCharacter = async (id: string, data: Partial<ICharacter>) => {
  return await characterRepo.update(id, data);
};

export const deleteCharacter = async (id: string) => {
  await characterRepo.remove(id);
};
