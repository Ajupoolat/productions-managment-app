import { Router } from 'express';
import * as onboardingController from '../controllers/onboarding.controller';
import { validateInputs } from '../middlewares/validate.middleware';
import { protect } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/permission.middleware';
import { onboardingApplicationSchema, onboardingReviewSchema } from '../dto/onboarding/onboarding.dto';
import { uploadDocuments, parseFormData } from '../middlewares/upload.middleware';

const router = Router();

// ==========================================
// User Routes (Authenticated Users)
// ==========================================
router.use(protect); // All routes require authentication

router.get('/me', onboardingController.getMyApplication);



// In a real app, /me/submit and /me (PUT) might be separated, but for now we follow the simple requirement
// of creating/submitting the onboarding application.
router.post(
  '/',
  uploadDocuments.array('documents', 2),
  parseFormData,
  validateInputs(onboardingApplicationSchema),
  onboardingController.submitApplication
);

// ==========================================
// Admin Routes (Requires specific permissions)
// ==========================================
router.use('/admin', requirePermission('onboarding.view'));

router.get('/admin', onboardingController.getAllApplications);
router.get('/admin/:id', onboardingController.getApplicationById);

// Reviewing (Approve/Reject) requires a higher permission
router.patch(
  '/admin/:id/review',
  requirePermission('onboarding.approve', 'onboarding.reject'),
  validateInputs(onboardingReviewSchema),
  onboardingController.reviewApplication
);

export default router;
