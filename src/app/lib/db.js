import { Pool } from "pg";

const globalForPg = globalThis;

const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

export default pool;
