import { Router } from 'express';
import * as productionController from '../controllers/production.controller';
import { protect } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/permission.middleware';
import { validateInputs } from '../middlewares/validate.middleware';
import { createProductionSchema } from '../dto/production/production.dto';

const router = Router();

router.use(protect);

router.post(
  '/',
  requirePermission('productions.create'),
  validateInputs(createProductionSchema),
  productionController.createProduction
);

router.get(
  '/',
  requirePermission('productions.view'),
  productionController.getProductions
);

router.get(
  '/:id',
  requirePermission('productions.view'),
  productionController.getProductionById
);

router.put(
  '/:id',
  requirePermission('productions.update'),
  validateInputs(createProductionSchema),
  productionController.updateProduction
);

router.delete(
  '/:id',
  requirePermission('productions.update'),
  productionController.deleteProduction
);

export default router;