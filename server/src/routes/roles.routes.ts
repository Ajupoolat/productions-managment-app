import { Router } from 'express';
import * as roleController from '../controllers/role.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { SystemRole } from '../constants/roles';
const router = Router();

// Protect all role routes - only Admins/Super Admins should fetch roles for now
router.use(protect);
router.use(restrictTo(SystemRole.SUPER_ADMIN));

router.get('/', roleController.getAllRoles);

export default router;
