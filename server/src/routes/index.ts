import { Router } from 'express';
import authRoutes from './auth.routes';
import onboardingRoutes from './onboarding.routes';
import rolesRoutes from './roles.routes';

const router = Router();

// Mount all feature routes
router.use('/auth', authRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/roles', rolesRoutes);

export default router;
