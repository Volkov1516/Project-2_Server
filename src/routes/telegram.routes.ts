import { Router } from "express";
import { telegramWebhookController } from "../controllers/telegram.controller";

const router = Router();

router.post("/:componentId", telegramWebhookController);

export default router;
