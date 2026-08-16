import mongoose from 'mongoose';
import { connectDB } from '../configs/db.config';
import { seedPermissions } from './permissions.seed';
import { seedRoles } from './roles.seed';
import { seedSuperAdmin } from './users.seed';

const runSeed = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to database
    await connectDB();

    // Step 1: Seed permissions
    console.log('--- Seeding Permissions ---');
    const permissionMap = await seedPermissions();

    // Step 2: Seed roles with permission references
    console.log('\n--- Seeding Roles ---');
    const roleMap = await seedRoles(permissionMap);

    // Step 3: Seed Super Admin user
    console.log('\n--- Seeding Super Admin ---');
    await seedSuperAdmin(roleMap);

    console.log('\n🎉 Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  }
};

runSeed();
