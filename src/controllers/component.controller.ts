import { Request, Response, NextFunction } from "express";
import { registerTelegramWebhook } from "../services/telegramService";

import {
  createComponentModel,
  readComponentModel,
  updateComponentModel,
  deleteComponentModel,
} from "../models/component.model";

export const createComponentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const component = await createComponentModel(req.body);
    res.status(201).json(component);
  } catch (error) {
    next(error);
  }
};

export const readComponentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const component = await readComponentModel(req.params.id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json(component);
  } catch (error) {
    next(error);
  }
};

export const updateComponentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const existingComponent = await readComponentModel(req.params.id);

    // if (!existingComponent) {
    //   return res.status(404).json({ message: 'Component not found' });
    // }

    // if (req.body.telegramKey && req.body.telegramKey !== existingComponent.telegramKey) {
    //   await registerTelegramWebhook(req.body.telegramKey, req.params.id);
    // }

    const updateComponent = await updateComponentModel(req.params.id, req.body);

    res.json(updateComponent);
  } catch (error) {
    next(error);
  }
};

export const deleteComponentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteComponentModel(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
