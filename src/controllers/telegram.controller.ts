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
      userId: data.message.from.id,
      userFirstName: data.message.from?.first_name || "",
      userLastName: data.message.from?.last_name || "",
      componentId,
      orign: "telegram",
      text: data.message.text,
      status: "thread",
    };

    const updatedCard = createCardService(card);

    res.json(updatedCard);
  },
);
