import { Router } from 'express';
import { createProjectController, readProjectController, updateProjectController, deleteProjectController } from '../controllers/project.controller';

const router = Router();

router.post('/', createProjectController);
router.get('/:id', readProjectController);
router.patch('/:id', updateProjectController);
router.delete('/:id', deleteProjectController);

export default router;
