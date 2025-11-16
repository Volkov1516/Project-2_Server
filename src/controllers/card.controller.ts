import { Request, Response, NextFunction } from "express";
import {
  createCardModel,
  readCardModel,
  updateCardModel,
  deleteCardModel,
  readCardByComponentIdModel,
} from "../models/card.model";
import { readComponentModel } from "../models/component.model";
import { sendTelegramMessage } from "../services/telegram.service";
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

export const readCardByProjectIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { componentId } = req.params;
    if (!componentId) {
      return res.status(400).json({ message: "Card ID is required" });
    }

    const cards = await readCardByComponentIdModel(componentId);
    res.json(cards);
  } catch (error) {
    next(error);
  }
};

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

export const updateCardStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const { cardId, newColumnId, componentId } = req.body;
    console.log(req.body);

    if (!cardId || !newColumnId || !componentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const oldCard = await readCardModel(cardId);
    if (!oldCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    const updatedCard = await updateCardModel(cardId, {
      columnId: newColumnId,
      componentId,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    const component = await readComponentModel(componentId);

    if (component?.telegramKey && oldCard.telegramUserId) {
      console.log("Sending telegram message");
      // const message = `Card "${updatedCard.text}" moved from ${oldCard.column_id} to ${updatedCard.column_id}.`;
      await sendTelegramMessage(
        oldCard.telegramUserId,
        "Update Message",
        component.telegramKey,
      );
    }

    res.json(updatedCard);
  },
);
