import pool from "../db";

type Card = {
  id: string | number;
  userId?: string;
  userid?: string;
  userFirstName?: string;
  userLastName?: string;
  componentId?: string;
  origin?: string;
  text?: string;
  status: string;
  position?: number;
};

export const createCardModel = async (data: Partial<Card>): Promise<Card> => {
  const {
    userId = null,
    userFirstName = null,
    userLastName = null,
    componentId = null,
    origin = "telegram",
    text = null,
    status = "thread",
  } = data;

  const result = await pool.query(
    `
    INSERT INTO cards
      (userId, userFirstName, userLastName, componentId, origin, text, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [userId, userFirstName, userLastName, componentId, origin, text, status],
  );

  return result.rows[0];
};

export const readCardModel = async (id: string): Promise<Card | undefined> => {
  const result = await pool.query(`SELECT * FROM cards WHERE id = $1`, [id]);
  return result.rows[0];
};

export const readCardByComponentIdModel = async (
  componentId: string,
): Promise<Card[]> => {
  const result = await pool.query(
    `SELECT * FROM cards WHERE componentId = $1`,
    [componentId],
  );
  return result.rows as Card[];
};

export const updateCardModel = async (
  id: string,
  data: Partial<Card>,
): Promise<Card | undefined> => {
  const {
    userId,
    userFirstName,
    userLastName,
    componentId,
    origin,
    text,
    status,
  } = data;

  const result = await pool.query(
    `
    UPDATE cards
    SET
      userId = COALESCE($1, userId),
      userFirstName = COALESCE($2, userFirstName),
      userLastName = COALESCE($3, userLastName),
      componentId = COALESCE($4, componentId),
      origin = COALESCE($5, origin),
      text = COALESCE($6, text),
      status = COALESCE($7, status)
    WHERE id = $8
    RETURNING *
    `,
    [
      userId ?? null,
      userFirstName ?? null,
      userLastName ?? null,
      componentId ?? null,
      origin ?? null,
      text ?? null,
      status ?? null,
      id,
    ],
  );

  return result.rows[0];
};

export const deleteCardModel = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM cards WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};
