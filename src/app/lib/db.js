import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,              // keep low for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
