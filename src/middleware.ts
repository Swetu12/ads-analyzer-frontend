import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const cookies = request.cookies.getAll();

  const supabaseAuthCookie = cookies.find((c) =>
    /^sb-[a-z0-9]+-auth-token\.\d+$/.test(c.name),
  );

  const supabaseOAuthCookie = cookies.find((c) =>
    /^sb-[a-z0-9]+-auth-token-code-verifier$/.test(c.name),
  );

  const hasSession = !!supabaseAuthCookie?.value;
  const isInOAuthFlow = !!supabaseOAuthCookie?.value;

  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isExcluded =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico";

  if (!isExcluded && !isAuthRoute && !hasSession && !isInOAuthFlow) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
