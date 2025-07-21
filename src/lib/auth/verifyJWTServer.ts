// lib/auth/verifyJWTServer.ts
import axios from "axios";
import { apiEndpoints } from "@/api/endpoints";

const VERSION = "v1";
const PRIVACY = "public";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:80";

export const verifyJWTServer = async (token: string) => {

  const res = await axios.get(
    `${BASE_URL}/${PRIVACY}/api/${VERSION}${apiEndpoints.auth.verifyJWT}`,
    {
      headers: {
        Cookie: `accessToken=${token}`,
      },
      withCredentials: true,
    }
  );

  return res.data;
};
