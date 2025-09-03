type Column = {
  id: string;
  componentId: string;
  name: string;
  position: number;
}

const columns: Column[] = [];

export const createColumnModel = async (data: Partial<Column>): Promise<Column> => {
  const column = { id: Date.now().toString(), componentId: data.componentId || '...', name: data.name || 'Untitled Column', position: data.position || 0 };
  columns.push(column);
  return column;
};

export const readColumnModel = async (id: string): Promise<Column | undefined> => {
  return columns.find(c => c.id === id);
}

export const updateColumnModel = async (id: string, data: Partial<Column>): Promise<Column | undefined> => {
  const column = columns.find(c => c.id === id);
  if (column) {
    if (data.name !== undefined) column.name = data.name;
    if (data.position !== undefined) column.position = data.position;
  }
  return column;
};

export const deleteColumnModel = async (id: string): Promise<void> => {
  const index = columns.findIndex(c => c.id === id);
  if (index !== -1) columns.splice(index, 1);
};
