import { v4 as uuidv4 } from "uuid";

type Component = {
  id: string;
  projectId: string;
  parentId?: string;
  telegramKey?: string;
  name: string;
};

const components: Component[] = [];

export const createComponentModel = async (
  data: Partial<Component>,
): Promise<Component> => {
  const { projectId, parentId, name = "untitled", telegramKey } = data;

  if (!projectId) {
    throw new Error("Project ID is required to create a component");
  }

  const component = {
    id: uuidv4(),
    projectId,
    ...(parentId && { parentId }),
    name: name || "untitled",
    ...(telegramKey && { telegramKey }),
  };

  components.push(component);
  return component;
};

export const readComponentModel = async (
  id: string,
): Promise<Component | undefined> => {
  return components.find((c) => c.id === id);
};

export const updateComponentModel = async (
  id: string,
  data: Partial<Component>,
): Promise<Component | undefined> => {
  const component = components.find((c) => c.id === id);
  if (component) Object.assign(component, data); // Allows partial updates
  return component;
};

export const deleteComponentModel = async (id: string): Promise<boolean> => {
  const index = components.findIndex((c) => c.id === id);
  if (index === -1) return false;
  components.splice(index, 1);
  return true;
};
