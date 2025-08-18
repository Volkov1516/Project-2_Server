import { Request, Response, NextFunction } from 'express';
import { createProjectModel, readProjectModel, updateProjectModel, deleteProjectModel } from '../models/project.model';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await createProjectModel(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const readProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await readProjectModel(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await updateProjectModel(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteProjectModel(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
