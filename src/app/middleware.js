import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("Middleware token:", token);
  if (!token && req.nextUrl.pathname.startsWith("/products")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/products/:path*"]
};
