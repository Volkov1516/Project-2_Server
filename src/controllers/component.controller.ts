import { Request, Response, NextFunction } from "express";
import {
  createComponentModel,
  readComponentModel,
  readComponentsModel,
  updateComponentModel,
  deleteComponentModel,
} from "../models/component.model";
import { asyncHandler } from "../utils/asyncHandler";
import { registerTelegramWebhook } from "../services/telegram.service";

export const createComponentController = asyncHandler(
  async (req: Request, res: Response) => {
    const component = await createComponentModel(req.body);
    res.status(201).json(component);
  },
);

export const readComponentController = asyncHandler(
  async (req: Request, res: Response) => {
    const component = await readComponentModel(req.params.id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json(component);
  },
);

export const readComponentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const components = await readComponentsModel();
    if (!components) {
      return res.status(404).json({ message: "Components not found" });
    }
    res.json(components);
  },
);

export const updateComponentController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.params.id);
    console.log(req.body.telegramKey);

    const existingComponent = await readComponentModel(req.params.id);

    if (!existingComponent) {
      return res.status(404).json({ message: "Component not found" });
    }

    if (
      req.body.telegramKey &&
      req.body.telegramKey !== existingComponent.telegramKey
    ) {
      await registerTelegramWebhook(req.body.telegramKey, req.params.id);
    }

    const updatedComponent = await updateComponentModel(
      req.params.id,
      req.body,
    );
    res.json(updatedComponent);
  },
);

export const deleteComponentController = asyncHandler(
  async (req: Request, res: Response) => {
    const deleted = await deleteComponentModel(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.status(204).send();
  },
);
