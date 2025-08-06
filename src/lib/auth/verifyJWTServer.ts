// lib/auth/verifyJWTServer.ts
import axios from "axios";
import { apiEndpoints } from "@/api/endpoints";

const VERSION = "v1";
const PRIVACY = "public";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

export const verifyJWTServer = async () => {
  const res = await axios.get(
    `${BASE_URL}/${PRIVACY}/api/${VERSION}${apiEndpoints.auth.verifyJWT}`,
    {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      withCredentials: true,
    }
  );
  return res.data;
};
