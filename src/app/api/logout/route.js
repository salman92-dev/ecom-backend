import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  console.log(cookieStore);

  // Delete the token cookie
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expires immediately
  });

  return Response.json({ success: true });
}
