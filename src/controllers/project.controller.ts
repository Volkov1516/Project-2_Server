import { Request, Response } from "express";
import {
  createProjectModel,
  readProjectsModel,
  readProjectModel,
  updateProjectModel,
  deleteProjectModel,
} from "../models/project.model";
import { asyncHandler } from "../utils/asyncHandler";

export const createProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await createProjectModel(req.body);
    res.status(201).json(project);
  },
);

export const readProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await readProjectModel(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  },
);

export const readProjectsController = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await readProjectsModel();
    if (!projects) {
      return res.status(404).json({ message: "Projects not found" });
    }
    res.json(projects);
  },
);

export const updateProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await updateProjectModel(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  },
);

export const deleteProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    const deleted = await deleteProjectModel(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(204).send();
  },
);
