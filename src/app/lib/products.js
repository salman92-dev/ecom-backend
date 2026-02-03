import pool from "./db";

export async function getAllProducts() {
  const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return result.rows;
}