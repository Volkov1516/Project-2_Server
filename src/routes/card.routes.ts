import { Router } from "express";
import {
  createCardController,
  readCardController,
  updateCardController,
  deleteCardController,
  readCardByProjectIdController,
} from "../controllers/card.controller";

const router = Router();

router.post("/", createCardController);
router.get("/:id", readCardController);
router.patch("/:id", updateCardController);
router.delete("/:id", deleteCardController);

router.get("/by-component/:componentId", readCardByProjectIdController);

export default router;
