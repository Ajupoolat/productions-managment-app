import { Types } from 'mongoose';
import { AppDocument } from '../models/document.model';

export const createMany = async (documents: any[]) => {
  return AppDocument.insertMany(documents);
};

export const deleteByOnboardingId = async (onboardingId: string | Types.ObjectId) => {
  return AppDocument.deleteMany({ onboardingId });
};

export const findByOnboardingId = async (onboardingId: string | Types.ObjectId) => {
  return AppDocument.find({ onboardingId });
};
