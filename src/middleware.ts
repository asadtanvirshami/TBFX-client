// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJWTServer } from "@/lib/auth/verifyJWTServer";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];
const PROTECTED_PREFIXES = ["/dashboard", "/protected-route"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  console.log("Token from cookie:", token);

  if (PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const session = token ? verifyJWTServer(token) : null;

  if (
    PROTECTED_PREFIXES.some((prefix) => req.nextUrl.pathname.startsWith(prefix))
  ) {
    if (session) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
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
