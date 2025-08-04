// lib/auth/getAccessTokenFromHeaders.ts
import { headers } from "next/headers";
import { parse } from "cookie";

export async function getAccessTokenFromHeaders(): Promise<string | null> {
  const headersList = await headers();
  const rawCookie = headersList.get("cookie") ?? "";
  const cookiesParsed = parse(rawCookie);
  return cookiesParsed["accessToken"] || " ";
}
