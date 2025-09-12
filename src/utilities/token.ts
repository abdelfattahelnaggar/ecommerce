"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  const cookieName = process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token";
  const encodedToken = (await cookies()).get(cookieName)?.value;
  
  if (!encodedToken) {
    return null;
  }

  const decodedToken = await decode({
    token: encodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decodedToken?.accessToken;
}
