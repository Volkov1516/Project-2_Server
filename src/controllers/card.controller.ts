import { Request, Response } from "express";
import {
  createCardModel,
  readCardModel,
  updateCardModel,
  deleteCardModel,
} from "../models/card.model";
import { asyncHandler } from "../utils/asyncHandler";

export const createCardController = asyncHandler(
  async (req: Request, res: Response) => {
    const card = await createCardModel(req.body);
    res.status(201).json(card);
  },
);

export const readCardController = asyncHandler(
  async (req: Request, res: Response) => {
    const card = await readCardModel(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json(card);
  },
);

export const updateCardController = asyncHandler(
  async (req: Request, res: Response) => {
    const card = await updateCardModel(req.params.id, req.body);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json(card);
  },
);

export const deleteCardController = asyncHandler(
  async (req: Request, res: Response) => {
    const deleted = await deleteCardModel(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(204).send();
  },
);
