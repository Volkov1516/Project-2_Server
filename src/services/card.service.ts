import { createCardModel } from "../models/card.model";

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
  return card;
};
