// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes
const publicRoutes = ["/login", "/sign-up", "/forgot-password"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public routes
  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublic) return NextResponse.next();

  // Check for Supabase access token cookie
  const token = request.cookies.get("sb-access-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token exists, allow access
  return NextResponse.next();
}

// Apply middleware to all pages except API, _next, static, favicon
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
