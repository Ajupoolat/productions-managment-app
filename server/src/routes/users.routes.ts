import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/permission.middleware';

const router = Router();

router.use(protect);

// Endpoint: GET /api/v1/users/talent?type=CAST
router.get(
  '/talent',
  requirePermission('cast.assign'), // Production managers with assign permission can fetch
  userController.getAvailableTalent
);

export default router;
