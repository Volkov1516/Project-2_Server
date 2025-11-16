import { Request, Response } from "express";
import { createCardService } from "../services/card.service";
import { asyncHandler } from "../utils/asyncHandler";

export const telegramWebhookController = asyncHandler(
  async (req: Request, res: Response) => {
    const componentId = req.params.componentId;
    const data = req.body;

    console.log(data);

    const card = {
      id: String(data.message.message_id),
      componentId,
      columnId: "thread",
      telegramUserId: data.message.from.id,
      telegramUserName: data.message.from?.first_name || "",
      origin: "telegram",
      text: data.message.text,
    };

    const updatedCard = createCardService(card);

    res.json(updatedCard);
  },
);
