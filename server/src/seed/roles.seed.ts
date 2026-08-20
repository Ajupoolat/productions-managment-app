import { Role } from '../models/role.model';
import { SystemRole } from '../constants/roles';

/**
 * Role → Permission key mapping.
 * Each role receives exactly the permissions listed below.
 */
const ROLE_PERMISSIONS: Record<string, string[]> = {
  [SystemRole.SUPER_ADMIN]: [
    'users.view', 'users.update', 'users.deactivate',
    'roles.view', 'roles.create', 'roles.update',
    'permissions.view', 'permissions.manage',
    'onboarding.view', 'onboarding.review', 'onboarding.approve', 'onboarding.reject',
    'productions.view', 'productions.create', 'productions.update',
    'cast.view', 'cast.assign',
    'crew.view', 'crew.assign',
    'locations.view', 'locations.create', 'locations.update', 'locations.request', 'locations.approve',
    'funds.view', 'funds.request', 'funds.approve', 'funds.reject',
    'costumes.view', 'costumes.create', 'costumes.update', 'costumes.assign',
    'reports.view', 'audit_logs.view',
    'notifications.view',
  ],

  [SystemRole.PRODUCTION_MANAGER]: [
    'productions.view', 'productions.create', 'productions.update',
    'cast.view', 'cast.assign',
    'crew.view', 'crew.assign',
    'locations.view', 'locations.request',
    'funds.view', 'funds.request',
    'notifications.view',
  ],

  [SystemRole.FINANCE_MANAGER]: [
    'funds.view', 'funds.approve', 'funds.reject',
    'reports.view',
    'notifications.view',
  ],

  [SystemRole.LOCATION_MANAGER]: [
    'locations.view', 'locations.create', 'locations.update', 'locations.approve',
    'notifications.view',
  ],

  [SystemRole.COSTUME_MANAGER]: [
    'costumes.view', 'costumes.create', 'costumes.update', 'costumes.assign',
    'notifications.view',
  ],

  [SystemRole.CAST]: [
    'productions.view',
    'cast.view',
    'notifications.view',
  ],

  [SystemRole.CREW]: [
    'productions.view',
    'crew.view',
    'notifications.view',
  ],
};

/** Role descriptions */
const ROLE_DESCRIPTIONS: Record<string, string> = {
  [SystemRole.SUPER_ADMIN]: 'Full system access with all permissions',
  [SystemRole.PRODUCTION_MANAGER]: 'Manages productions, cast, crew, locations, and fund requests',
  [SystemRole.FINANCE_MANAGER]: 'Manages fund approvals and financial reports',
  [SystemRole.LOCATION_MANAGER]: 'Manages locations and location booking approvals',
  [SystemRole.COSTUME_MANAGER]: 'Manages costume inventory and assignments',
  [SystemRole.CAST]: 'Cast member with basic viewing permissions',
  [SystemRole.CREW]: 'Crew member with basic viewing permissions',
};

/**
 * Seeds all roles with their permission mappings using upsert.
 * Requires the permissionMap from seedPermissions().
 */
export const seedRoles = async (permissionMap: Map<string, any>): Promise<Map<string, any>> => {
  const roleMap = new Map<string, any>();

  for (const [roleName, permKeys] of Object.entries(ROLE_PERMISSIONS)) {
    // Resolve permission keys to ObjectIds
    const permissionIds = permKeys
      .map((key) => permissionMap.get(key))
      .filter(Boolean);

    const role = await Role.findOneAndUpdate(
      { name: roleName },
      {
        name: roleName,
        description: ROLE_DESCRIPTIONS[roleName],
        permissionIds,
        isActive: true,
      },
      { upsert: true, new: true }
    );

    roleMap.set(roleName, role._id);
    console.log(`  📋 Role "${roleName}" → ${permissionIds.length} permissions`);
  }

  console.log(`✅ Seeded ${roleMap.size} roles`);
  return roleMap;
};
