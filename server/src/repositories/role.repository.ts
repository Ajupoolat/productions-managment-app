import { IRole, Role } from '../models/role.model';

export const findAllActiveRoles = async () => {
  return Role.find({ isActive: true }).select('-permissionIds').sort({ name: 1 });
};

export const findTalentRoles = async (roleName: string): Promise<IRole | null> => {
  return await Role.findOne({ name: roleName, isActive: true });
}