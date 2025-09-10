import { v4 as uuidv4 } from "uuid";

type Project = {
  id: string;
  ownerId: string;
  name: string;
};

const projects: Project[] = [];

export const createProjectModel = async (
  data: Partial<Project>,
): Promise<Project> => {
  const project = {
    id: uuidv4(),
    ownerId: data.ownerId || "unknown",
    name: data.name || "untitled",
  };
  projects.push(project);
  return project;
};

export const readProjectModel = async (
  id: string,
): Promise<Project | undefined> => {
  return projects.find((p) => p.id === id);
};

export const updateProjectModel = async (
  id: string,
  data: Partial<Project>,
): Promise<Project | undefined> => {
  const project = projects.find((p) => p.id === id);
  if (project) Object.assign(project, data); // Allows partial updates
  return project;
};

export const deleteProjectModel = async (id: string): Promise<boolean> => {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return false;
  projects.splice(index, 1);
  return true;
};
