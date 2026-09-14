import { IProduction } from '../models/production.model';
import { CreateProductionInput } from '../dto/production/production.dto';
import { AppError } from '../utils/AppError';
import * as productionRepo from '../repositories/production.repository';
import * as castRepo from '../repositories/cast-assignment.repository';
import * as crewRepo from '../repositories/crew-assignment.repository';
import { CastAssignment } from '../models/cast-assignment.model';
import { CrewAssignment } from '../models/crew-assignment.model';
import { IUser } from '../models/user.model';
import { IRole } from '../models/role.model';
import { Types } from 'mongoose';
import { CastCrewAssignmentStatus } from '../constants/cast-crew-assigment-status';


export const createProduction = async (
  data: CreateProductionInput,
  productionManagerId: string
): Promise<IProduction> => {
  return await productionRepo.create(data, productionManagerId);
};

export const getProductions = async (query: any = {}): Promise<{ data: IProduction[], meta: any }> => {
  return await productionRepo.findAll(query);
};

export const getProductionById = async (id: string, user: IUser): Promise<IProduction> => {
  const production = await productionRepo.findById(id);

  if (!production) {
    throw new AppError('Production not found', 404);
  }

  // Security Check: If user is Cast or Crew, verify they are assigned to this production
  const roleName = (user.roleId as unknown as IRole)?.name;

  if (roleName === 'CAST') {
    const isAssigned = await CastAssignment.exists({ productionId: id, userId: user._id });
    if (!isAssigned) {
      throw new AppError('Forbidden: You are not assigned to this production.', 403);
    }
  } else if (roleName === 'CREW') {
    const isAssigned = await CrewAssignment.exists({ productionId: id, userId: user._id });
    if (!isAssigned) {
      throw new AppError('Forbidden: You are not assigned to this production.', 403);
    }
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

export const deleteProduction = async (id: string, managerId: string): Promise<void> => {
  const production = await productionRepo.findById(id);

  if (!production) {
    throw new AppError('Production not found', 404);
  }

  // Ensure only the manager who created it can delete it
  if (production?.productionManagerId?._id.toString() !== managerId) {
    throw new AppError('You do not have permission to delete this production', 403);
  }

  await productionRepo.deleteById(id);
};

export const assignCastMember = async (productionId: string|Types.ObjectId, userId: string|Types.ObjectId, characterId: string|Types.ObjectId) => {
  const assignment = await castRepo.create({
    productionId: productionId as Types.ObjectId,
    userId: userId as Types.ObjectId,
    characterId: characterId as Types.ObjectId,
    status: CastCrewAssignmentStatus.ACTIVE
  });
  return assignment;
};

export const assignCrewMember = async (productionId: string|Types.ObjectId, userId: string|Types.ObjectId, departmentId: string|Types.ObjectId, workId: string|Types.ObjectId) => {
  const assignment = await crewRepo.create({
    productionId: productionId as Types.ObjectId,
    userId: userId as Types.ObjectId,
    departmentId: departmentId as Types.ObjectId,
    workId: workId as Types.ObjectId,
    status: CastCrewAssignmentStatus.ACTIVE
  });
  return assignment;
};

export const getCastAssignments = async (productionId: string) => {
  return await castRepo.findAllByProductionId(productionId);
};

export const getCrewAssignments = async (productionId: string) => {
  return await crewRepo.findAllByProductionId(productionId);
};