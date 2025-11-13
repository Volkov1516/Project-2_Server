import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    console.log("Render Postgres connection successful!");
    client.release();
  } catch (err) {
    console.error("Render Postgres connection failed:", err);
    process.exit(1);
  }
}

testConnection();

export default pool;
