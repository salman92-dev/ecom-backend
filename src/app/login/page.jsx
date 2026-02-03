import LoginForm from "../components/loginForm";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "../lib/jwt";

export default async function LoginPage() {

  const Allcookies = await cookies();
  const token = Allcookies.get("token");
  const user = verifyToken(token?.value);
  if (user) {
    redirect("/products");
  }

  return <LoginForm />;
}
