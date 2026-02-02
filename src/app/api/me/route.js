// /app/api/me/route.js
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ sync
    const token = cookieStore.get("token")?.value;
    const tokenverification = verifyToken(token);
    console.log("Token verification result:", tokenverification);

    if (!tokenverification) {
      return Response.json({ loggedIn: false });
    }

    const user = verifyToken(token); // handles expiry + validity

    if (!user) {
      return Response.json({ loggedIn: false });
    }

    return Response.json({
      loggedIn: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return Response.json({ loggedIn: false });
  }
}
