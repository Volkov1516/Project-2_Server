import { createCardModel } from "../models/card.model";
import { io } from "../index";

export const createCardService = async (data: {
  id?: string;
  userId?: string;
  userFirstName?: string;
  userLastName?: string;
  componentId?: string;
  origin?: string;
  text?: string;
  status: string;
}) => {
  const card = await createCardModel(data);
  io.emit("newCard", card);
  return card;
};
