import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateInputs } from '../middlewares/validate.middleware';
import { protect } from '../middlewares/auth.middleware';
import { registerSchema, loginSchema } from '../dto/auth/auth.dto';

const router = Router();

router.post('/register', validateInputs(registerSchema), authController.register);
router.post('/login', validateInputs(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', protect, authController.logoutHandler);

export default router;
