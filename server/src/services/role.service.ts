import * as roleRepository from '../repositories/role.repository';

export const getAllRoles = async () => {
  return roleRepository.findAllActiveRoles();
};
