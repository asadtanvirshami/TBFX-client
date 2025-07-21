import axios from "axios";
import { getCsrfToken } from "@/lib/csrf";

const VERSION = "v1";
const PRIVACY = "public";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:80";
console.log(BASE_URL);

const api = axios.create({
  baseURL: `${BASE_URL}/${PRIVACY}/api/${VERSION}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: request interceptor for CSRF token
api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();
  if (csrf) config.headers["X-CSRF-Token"] = csrf;
  return config;
});

export default api;
