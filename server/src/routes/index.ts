import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Mount all feature routes
router.use('/auth', authRoutes);

export default router;
