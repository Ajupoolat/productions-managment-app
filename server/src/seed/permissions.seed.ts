import { Permission } from '../models/permission.model';
import { PERMISSIONS } from '../constants/permissions';

/**
 * Seeds all permissions using upsert to ensure idempotency.
 * Returns a Map of permission key → ObjectId for role seeding.
 */
export const seedPermissions = async (): Promise<Map<string, any>> => {
  const permissionMap = new Map<string, any>();

  for (const perm of PERMISSIONS) {
    const permission = await Permission.findOneAndUpdate(
      { key: perm.key },
      {
        key: perm.key,
        module: perm.module,
        action: perm.action,
        description: perm.description,
      },
      { upsert: true, new: true }
    );

    permissionMap.set(perm.key, permission._id);
  }

  console.log(`✅ Seeded ${permissionMap.size} permissions`);
  return permissionMap;
};
