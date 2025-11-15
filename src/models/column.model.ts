import pool from "../db";

type Column = {
  id: string;
  componentId: string;
  name: string;
  position: number;
};

export const createColumnModel = async (
  data: Partial<Column>,
): Promise<Column> => {
  const componentId = data.componentId || "...";
  const name = data.name || "Untitled Column";
  const position = data.position || 0;

  const result = await pool.query(
    `INSERT INTO columns (component_id, name, position)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [componentId, name, position],
  );

  return result.rows[0];
};

export const readColumnModel = async (
  id: string,
): Promise<Column | undefined> => {
  const result = await pool.query(`SELECT * FROM columns WHERE id = $1`, [id]);
  return result.rows[0] || null;
};

export const readColumnsByComponentIdModel = async (
  componentId: string,
): Promise<Column[]> => {
  const result = await pool.query(
    `SELECT * FROM columns WHERE component_id = $1 ORDER BY position ASC`,
    [componentId],
  );
  return result.rows as Column[];
};

export const updateColumnModel = async (
  id: string,
  data: Partial<Column>,
): Promise<Column | null> => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) {
    values.push(data.name);
    fields.push(`name = $${values.length}`);
  }
  if (data.position !== undefined) {
    values.push(data.position);
    fields.push(`position = $${values.length}`);
  }

  if (fields.length === 0) {
    const current = await readColumnModel(id);
    return current ?? null;
  }

  values.push(id);
  const query = `
    UPDATE columns SET ${fields.join(", ")}
    WHERE id = $${values.length}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

export const deleteColumnModel = async (id: string): Promise<void> => {
  await pool.query(`DELETE FROM columns WHERE id = $1`, [id]);
};
