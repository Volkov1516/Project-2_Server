import { Request, Response, NextFunction } from 'express';
import { createComponentModel, readComponentModel, updateComponentModel, deleteComponentModel } from '../models/component.model';

export const createComponentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const component = await createComponentModel(req.body);
    res.status(201).json(component);
  } catch (error) {
    next(error);
  }
}

export const readComponentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const component = await readComponentModel(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    next(error);
  }
};

export const updateComponentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const component = await updateComponentModel(req.params.id, req.body);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    next(error);
  }
};

export const deleteComponentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteComponentModel(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
