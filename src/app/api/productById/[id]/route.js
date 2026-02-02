import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

async function getId(context) {
  const params = await context.params; // unwrap promise if Edge
  const id = params.id;
  return id;
}

// GET /api/products/:id
export async function GET(req, context) {
  try {
    const id = await getId(context);

    const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
    if (result.rows.length === 0)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /products/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT /api/products/:id
export async function PUT(req, context) {
  try {
    const id = await getId(context);
    const body = await req.json();
    const { title, price, image, color } = body;

    const result = await pool.query(
      "UPDATE products SET title=$1, price=$2, image=$3, color=$4 WHERE id=$5 RETURNING *",
      [title, price, image, color, id]
    );

    if (result.rows.length === 0)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /products/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/products/:id
export async function DELETE(req, context) {
  try {
    const id = await getId(context);

    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ success: true, deleted: result.rows[0] });
  } catch (error) {
    console.error("DELETE /products/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
