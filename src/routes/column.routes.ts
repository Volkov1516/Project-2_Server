import { Router } from "express";
import {
  createColumnController,
  readColumnController,
  updateColumnController,
  deleteColumnController,
  readColumnsByComponentIdController,
} from "../controllers/column.controller";

const router = Router();

router.post("/", createColumnController);
router.get("/:id", readColumnController);
router.patch("/:id", updateColumnController);
router.delete("/:id", deleteColumnController);

router.get("/by-component/:componentId", readColumnsByComponentIdController);

export default router;
