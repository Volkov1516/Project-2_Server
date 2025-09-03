type Card = {
  id: string;
  userId: string;
  componentId: string;
  columnId: string;
  status: string;
  text: string;
};

const cards: Card[] = [];

export const createCardModel = async (data: Partial<Card>): Promise<Card> => {
  const card = { id: Date.now().toString(),  userId: data.userId || '...', componentId: data.componentId || '...', columnId: data.columnId || '...', status: data.status || 'todo', text: data.text || '' };
  cards.push(card);
  return card;
};

export const readCardModel = async (id: string): Promise<Card | undefined> => {
  return cards.find(c => c.id === id);
}

export const updateCardModel = async (id: string, data: Partial<Card>): Promise<Card | undefined> => {
  const card = cards.find(c => c.id === id);
  if (card) {
    if (data.text !== undefined) card.text = data.text;
    if (data.status !== undefined) card.status = data.status;
    if (data.columnId !== undefined) card.columnId = data.columnId;
  }
  return card;
};

export const deleteCardModel = async (id: string): Promise<void> => {
  const index = cards.findIndex(c => c.id === id);
  if (index !== -1) cards.splice(index, 1);
};
