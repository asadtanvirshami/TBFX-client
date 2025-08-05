import { NextRequest, NextResponse } from "next/server";
import { verifyJWTServer } from "@/lib/auth/verifyJWTServer";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];
const PROTECTED_PREFIXES = ["/dashboard", "/protected-route"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  console.log("Token from cookie:", token);

  // Always allow public routes
  if (PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  let session = null;

  // Try to verify token
  if (token) {
    try {
      session = await verifyJWTServer(token);
    } catch (err) {
      console.error("JWT verification failed:", err); // Useful for debugging
      // Continue with session = null
    }
  }

  // Handle protected routes
  if (
    PROTECTED_PREFIXES.some((prefix) => req.nextUrl.pathname.startsWith(prefix))
  ) {
    if (session?.valid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next(); // Fallback
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/protected-route/:path*",
  ],
};
