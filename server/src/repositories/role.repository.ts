import { Role } from '../models/role.model';

export const findAllActiveRoles = async () => {
  return Role.find({ isActive: true }).select('-permissionIds').sort({ name: 1 });
};
