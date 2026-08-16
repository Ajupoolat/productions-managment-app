import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { ContractorType } from '../constants/contractor-types';
import { UserStatus } from '../constants/user-status';
import { SystemRole } from '../constants/roles';
import env from '../configs/env.config';

/**
 * Seeds the development Super Admin user.
 * Uses ADMIN_EMAIL and ADMIN_PASSWORD from environment variables.
 * Links the user to the SUPER_ADMIN role via roleId.
 */
export const seedSuperAdmin = async (roleMap: Map<string, any>): Promise<void> => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tendagon.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

  const superAdminRoleId = roleMap.get(SystemRole.SUPER_ADMIN);

  if (!superAdminRoleId) {
    console.error('❌ SUPER_ADMIN role not found. Cannot seed Super Admin user.');
    return;
  }

  // Check if admin already exists
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    // Update roleId if it changed
    if (String(existingAdmin.roleId) !== String(superAdminRoleId)) {
      existingAdmin.roleId = superAdminRoleId;
      await existingAdmin.save();
      console.log(`✅ Super Admin user updated with correct roleId`);
    } else {
      console.log(`✅ Super Admin user already exists (${adminEmail})`);
    }
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  await User.create({
    fullName: 'Super Admin',
    email: adminEmail,
    password: hashedPassword,
    contractorType: ContractorType.TCS_TEAM,
    roleId: superAdminRoleId,
    status: UserStatus.ACTIVE,
    isActive: true,
  });

  console.log(`✅ Super Admin user created (${adminEmail})`);
};
