import { createCardModel } from "../models/card.model";
import { io } from "../index";

export const createCardService = async (data: {
  id: string;
  componentId: number | string;
  columnId?: number | string;
  telegramUserId?: string;
  telegramUserName?: string;
  origin?: string;
  text?: string;
}) => {
  const card = await createCardModel(data);
  io.emit("newCard", card);
  return card;
};
