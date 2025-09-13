import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";

export const telegramWebhookController = asyncHandler(
  async (req: Request, res: Response) => {
    const componentId = req.params.componentId;
    const data = req.body;

    console.log(`Telegram message for component ${componentId}:`, data);

    res.sendStatus(200);
  },
);
