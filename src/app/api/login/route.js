import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { signToken } from "@/app/lib/jwt";
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Get user
    const result = await pool.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = password === user.password;
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT
    const token = signToken(
      { id: user.id, email: user.email },
    );

    // Set cookie
    const res = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email }
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "development" ? false : true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
