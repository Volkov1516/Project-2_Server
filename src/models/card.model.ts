import { v4 as uuidv4 } from "uuid";

type Card = {
  id: string | number;
  userId?: string;
  userFirstName?: string;
  userLastName?: string;
  componentId?: string;
  origin?: string;
  text?: string;
  status: string;
};

const cards: Card[] = [];

export const createCardModel = async (data: Partial<Card>): Promise<Card> => {
  const card = {
    id: data.id || uuidv4(),
    userId: data.userId,
    userFirstName: data.userFirstName,
    userLastName: data.userLastName,
    componentId: data.componentId,
    orign: data.origin || "telegram",
    text: data.text,
    status: data.status || "thread",
  };
  console.log(card);

  cards.push(card);
  return card;
};

export const readCardModel = async (id: string): Promise<Card | undefined> => {
  return cards.find((c) => c.id === id);
};

export const updateCardModel = async (
  id: string,
  data: Partial<Card>,
): Promise<Card | undefined> => {
  const card = cards.find((c) => c.id === id);
  if (card) Object.assign(card, data); // Allows partial updates
  return card;
};

export const deleteCardModel = async (id: string): Promise<boolean> => {
  const index = cards.findIndex((p) => p.id === id);
  if (index === -1) return false;
  cards.splice(index, 1);
  return true;
};
