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
    id: Date.now().toString(),
    ownerId: "...",
    name: data.name || "Untitled Project",
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
  if (project && data.name) project.name = data.name;
  return project;
};

export const deleteProjectModel = async (id: string): Promise<void> => {
  const index = projects.findIndex((p) => p.id === id);
  if (index !== -1) projects.splice(index, 1);
};
