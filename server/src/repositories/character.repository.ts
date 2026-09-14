import { Character, ICharacter } from '../models/character.model';
import { Types } from 'mongoose';

export const create = async (data: Partial<ICharacter>): Promise<ICharacter> => {
  return await Character.create(data);
};

export const findAllByProductionId = async (productionId: string | Types.ObjectId): Promise<ICharacter[]> => {
  return await Character.find({ productionId }).sort({ name: 1 });
};

export const update = async (id: string | Types.ObjectId, data: Partial<ICharacter>): Promise<ICharacter | null> => {
  return await Character.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string | Types.ObjectId): Promise<void> => {
  await Character.findByIdAndDelete(id);
};
