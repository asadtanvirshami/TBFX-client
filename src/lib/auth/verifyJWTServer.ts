// lib/auth/verifyJWTServer.ts

import { apiEndpoints } from "@/api/endpoints";

const VERSION = "v1";
const PRIVACY = "public";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";
export const verifyJWTServer = async (token: string) => {
  const res = await fetch(
    `${BASE_URL}/${PRIVACY}/api/${VERSION}${apiEndpoints.auth.verifyJWT}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );
  return res.json();
};
