import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /products error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, price, image,color } = body;

    if (!title || !price || !image || !color) {
      return NextResponse.json(
        { error: "Title, price, image, and color are required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "INSERT INTO products (title, price, image, color) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, price, image || null, color]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /products error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
