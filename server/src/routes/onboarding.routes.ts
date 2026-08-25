import { Router } from 'express';
import * as onboardingController from '../controllers/onboarding.controller';
import { validateInputs } from '../middlewares/validate.middleware';
import { protect } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/permission.middleware';
import { onboardingApplicationSchema, onboardingReviewSchema } from '../dto/onboarding/onboarding.dto';
import { uploadDocuments, parseFormData } from '../middlewares/upload.middleware';

const router = Router();


router.use(protect); 
router.get('/me', onboardingController.getMyApplication);




router.post(
  '/',
  uploadDocuments.array('documents', 2),
  parseFormData,
  validateInputs(onboardingApplicationSchema),
  onboardingController.submitApplication
);


router.use('/admin', requirePermission('onboarding.view'));

router.get('/admin', onboardingController.getAllApplications);
router.get('/admin/:id', onboardingController.getApplicationById);

router.patch(
  '/admin/:id/review',
  requirePermission('onboarding.approve', 'onboarding.reject'),
  validateInputs(onboardingReviewSchema),
  onboardingController.reviewApplication
);

export default router;
