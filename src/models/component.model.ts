import pool from "../db";

type Component = {
  id: string;
  projectId: string;
  parentId?: string;
  name: string;
  telegramKey?: string;
};

export const createComponentModel = async (
  data: Partial<Component>,
): Promise<Component> => {
  const {
    projectId,
    parentId = null,
    name = "untitled",
    telegramKey = null,
  } = data;

  if (!projectId) {
    throw new Error("Project ID is required to create a component");
  }

  const result = await pool.query(
    `
    INSERT INTO components (project_id, parent_id, name, telegram_key)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [projectId, parentId, name, telegramKey],
  );

  return result.rows[0];
};

export const readComponentModel = async (
  id: string,
): Promise<Component | undefined> => {
  const result = await pool.query(`SELECT * FROM components WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
};

export const readComponentsModel = async (): Promise<Component[]> => {
  const result = await pool.query("SELECT * FROM components");
  return result.rows;
};

export const updateComponentModel = async (
  id: string,
  data: Partial<Component>,
): Promise<Component | undefined> => {
  const { parentId, name, telegramKey } = data;

  const result = await pool.query(
    `
    UPDATE components
    SET
      parent_id = COALESCE($1, parent_id),
      name = COALESCE($2, name),
      telegram_key = COALESCE($3, telegram_key)
    WHERE id = $4
    RETURNING *
    `,
    [parentId ?? null, name ?? null, telegramKey ?? null, id],
  );

  return result.rows[0];
};

export const deleteComponentModel = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM components WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};
