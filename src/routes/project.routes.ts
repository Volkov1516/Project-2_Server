import { Router } from 'express';
import { createProject, readProject, updateProject, deleteProject } from '../controllers/project.controller';

const router = Router();

router.post('/', createProject);
router.get('/:id', readProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
