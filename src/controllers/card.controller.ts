import { Request, Response, NextFunction } from 'express';
import { createCardModel, readCardModel, updateCardModel, deleteCardModel } from '../models/card.model';

export const createCardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await createCardModel(req.body);
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
}

export const readCardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await readCardModel(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
};

export const updateCardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await updateCardModel(req.params.id, req.body);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
};

export const deleteCardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteCardModel(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
