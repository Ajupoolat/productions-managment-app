import { IUser } from "../models/user.model";
import { AppError } from "../utils/AppError";
import * as roleRepo from '../repositories/role.repository'
import * as userRepo from '../repositories/user.repository'

/**
 * Get all active users with a specific role name (CAST or CREW).
 * 
 * @param roleName The role name ('CAST' or 'CREW') to filter users by.
 * @returns An array of user documents with populated role information.
 * @throws AppError if the role is not found.
 */
export const getTalentUsers = async (roleName: 'CAST' | 'CREW'): Promise<IUser[]> => {
    const role = await roleRepo.findTalentRoles(roleName);

    if (!role) {
        throw new AppError(`No talent role found with name${roleName}`,500);
    }

    return userRepo.findByRoleId(role._id);
}