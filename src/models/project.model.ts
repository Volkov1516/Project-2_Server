import pool from "../db";

type Project = {
  id: string;
  ownerId: string;
  name: string;
};

export const createProjectModel = async (
  data: Partial<Project>,
): Promise<Project> => {
  console.log("DB_NAME =", process.env.DB_NAME);

  const result = await pool.query(
    "INSERT INTO projects (ownerId, name) VALUES ($1, $2) RETURNING *",
    [data.ownerId, data.name],
  );
  return result.rows[0];
};

export const readProjectsModel = async (
  ownerId?: string,
): Promise<Project[]> => {
  let query = "SELECT * FROM projects";
  const params: string[] = [];

  if (ownerId) {
    query += " WHERE ownerId = $1";
    params.push(ownerId);
  }

  const result = await pool.query(query, params);

  return result.rows;
};

export const readProjectModel = async (
  id: string,
): Promise<Project | undefined> => {
  const result = await pool.query("SELECT * FROM projects WHERE id=$1", [id]);
  return result.rows[0];
};

export const updateProjectModel = async (
  id: string,
  data: Partial<Project>,
): Promise<Project | undefined> => {
  const result = await pool.query(
    "UPDATE projects SET ownerId = COALESCE($1, ownerId), name = COALESCE($2, name) WHERE id=$3 RETURNING *",
    [data.ownerId, data.name, id],
  );
  return result.rows[0];
};

export const deleteProjectModel = async (id: string): Promise<boolean> => {
  const result = await pool.query("DELETE FROM projects WHERE id=$1", [id]);
  return (result.rowCount ?? 0) > 0;
};
