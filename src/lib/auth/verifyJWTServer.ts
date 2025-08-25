// lib/auth/verifyJWTServer.ts

import { apiEndpoints } from "@/api/endpoints";

const VERSION = "v1";
const PRIVACY = "public";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";
export const verifyJWTServer = async (accessToken: string) => {
  console.log(accessToken);

  const res = await fetch(
    `${BASE_URL}/${PRIVACY}/api/${VERSION}${apiEndpoints.auth.verifyJWT}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
      cache: "no-store",
      credentials: "include",
    }
  );
  return res.json();
};
