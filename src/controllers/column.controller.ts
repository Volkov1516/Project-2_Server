import { Request, Response, NextFunction } from 'express';
import { createColumnModel, readColumnModel, updateColumnModel, deleteColumnModel } from '../models/column.model';

export const createColumnController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await createColumnModel(req.body);
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
}

export const readColumnController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await readColumnModel(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
};

export const updateColumnController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await updateColumnModel(req.params.id, req.body);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
};

export const deleteColumnController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteColumnModel(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


