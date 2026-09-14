import { Router } from 'express';
import authRoutes from './auth.routes';
import onboardingRoutes from './onboarding.routes';
import rolesRoutes from './roles.routes';
import productionsRoutes from './productions.routes';
import usersRoutes from './users.routes';

const router = Router();

// Mount all feature routes
router.use('/auth', authRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/roles', rolesRoutes);
router.use('/productions', productionsRoutes);
router.use('/users', usersRoutes);

export default router;
