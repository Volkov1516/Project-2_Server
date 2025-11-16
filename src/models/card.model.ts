import pool from "../db";

type Card = {
  id: string;
  componentId: number | string;
  columnId?: number | string;
  telegramUserId?: string;
  telegramUserName?: string;
  origin?: string;
  text?: string;
};

export const createCardModel = async (data: Partial<Card>): Promise<Card> => {
  const {
    componentId = null,
    columnId = null,
    telegramUserId = null,
    telegramUserName = null,
    origin = "telegram",
    text = null,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO cards
      (component_id, column_id, telegram_user_id, telegram_user_name, origin, text, position)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [componentId, columnId, telegramUserId, telegramUserName, origin, text, 0],
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
    `SELECT * FROM cards WHERE component_id = $1`,
    [componentId],
  );
  return result.rows as Card[];
};

export const updateCardModel = async (
  id: number | string,
  data: Partial<Card>,
): Promise<Card | undefined> => {
  const {
    componentId,
    columnId,
    telegramUserId,
    telegramUserName,
    origin,
    text,
  } = data;

  const result = await pool.query(
    `
    UPDATE cards
    SET
      component_id = COALESCE($2, component_id),
      column_id = COALESCE($3, column_id),
      telegram_user_id = COALESCE($4, telegram_user_id),
      telegram_user_name = COALESCE($5, telegram_user_name),
      origin = COALESCE($6, origin),
      text = COALESCE($7, text)
    WHERE id = $1
    RETURNING *
    `,
    [
      id,
      componentId ?? null,
      columnId ?? null,
      telegramUserId ?? null,
      telegramUserName ?? null,
      origin ?? null,
      text ?? null,
    ],
  );

  return result.rows[0];
};

export const deleteCardModel = async (
  id: number | string,
): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM cards WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};
