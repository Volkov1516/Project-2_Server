type Component = {
  id: string;
  projectId: string;
  parentId?: string;
  name: string;
};

const components: Component[] = [];

export const createComponentModel = async (data: Partial<Component>): Promise<Component> => {
  if (!data.projectId) {
    throw new Error('Project ID is required to create a component');
  }

  const component = { id: Date.now().toString(), projectId: data.projectId, name: data.name || 'Untitled Component' };
  components.push(component);
  return component;
}

export const readComponentModel = async (id: string): Promise<Component | undefined> => {
  return components.find(c => c.id === id);
};

export const updateComponentModel = async (id: string, data: Partial<Component>): Promise<Component | undefined> => {
  const component = components.find(c => c.id === id);
  if (component && data.name) component.name = data.name;
  return component;
};

export const deleteComponentModel = async (id: string): Promise<void> => {
  const index = components.findIndex(c => c.id === id);
  if (index !== -1) components.splice(index, 1);
};
