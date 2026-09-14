import { Router } from 'express';
import * as productionController from '../controllers/production.controller';
import { protect } from '../middlewares/auth.middleware';
import { requirePermission } from '../middlewares/permission.middleware';
import { validateInputs } from '../middlewares/validate.middleware';
import { createProductionSchema } from '../dto/production/production.dto';
import {
  assignCastSchema,
  assignCrewSchema,
  characterSchema,
  departmentSchema,
  workSchema
} from '../dto/production/cast-crew.dto';
import * as characterController from '../controllers/character.controller';
import * as departmentController from '../controllers/department.controller';
import * as workController from '../controllers/work.controller';

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

// Endpoint: POST /api/v1/productions/:productionId/cast
router.post(
  '/:productionId/cast',
  requirePermission('cast.assign'),
  validateInputs(assignCastSchema),
  productionController.assignCast
);

// Endpoint: GET /api/v1/productions/:productionId/cast
router.get(
  '/:productionId/cast',
  requirePermission('productions.view'),
  productionController.getCastAssignments
);

// Endpoint: POST /api/v1/productions/:productionId/crew
router.post(
  '/:productionId/crew',
  requirePermission('crew.assign'),
  validateInputs(assignCrewSchema),
  productionController.assignCrew
);

// Endpoint: GET /api/v1/productions/:productionId/crew
router.get(
  '/:productionId/crew',
  requirePermission('productions.view'),
  productionController.getCrewAssignments
);

// Characters CRUD
router.post('/:productionId/characters', requirePermission('productions.update'), validateInputs(characterSchema), characterController.createCharacter);
router.get('/:productionId/characters', requirePermission('productions.view'), characterController.getCharacters);
router.put('/:productionId/characters/:id', requirePermission('productions.update'), validateInputs(characterSchema), characterController.updateCharacter);
router.delete('/:productionId/characters/:id', requirePermission('productions.update'), characterController.deleteCharacter);

// Departments CRUD
router.post('/:productionId/departments', requirePermission('productions.update'), validateInputs(departmentSchema), departmentController.createDepartment);
router.get('/:productionId/departments', requirePermission('productions.view'), departmentController.getDepartments);
router.put('/:productionId/departments/:id', requirePermission('productions.update'), validateInputs(departmentSchema), departmentController.updateDepartment);
router.delete('/:productionId/departments/:id', requirePermission('productions.update'), departmentController.deleteDepartment);

// Works CRUD
router.post('/:productionId/works', requirePermission('productions.update'), validateInputs(workSchema), workController.createWork);
router.get('/:productionId/works', requirePermission('productions.view'), workController.getWorks);
router.put('/:productionId/works/:id', requirePermission('productions.update'), validateInputs(workSchema), workController.updateWork);
router.delete('/:productionId/works/:id', requirePermission('productions.update'), workController.deleteWork);

export default router;