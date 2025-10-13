import { Router } from "express";
import {
  createComponentController,
  readComponentsController,
  readComponentController,
  updateComponentController,
  deleteComponentController,
} from "../controllers/component.controller";

const router = Router();

router.post("/", createComponentController);
router.get("/", readComponentsController);
router.get("/:id", readComponentController);
router.patch("/:id", updateComponentController);
router.delete("/:id", deleteComponentController);

export default router;
