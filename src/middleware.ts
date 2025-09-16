import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

const defaultRoutes = ["/", "/pricing"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isDefaultRoute = defaultRoutes.includes(pathname);

  const cookies = request.cookies.getAll();

  const supabaseAuthCookie = cookies.find((c) =>
    /^sb-[^-]+-auth-token(\.\d+)?$/.test(c.name),
  );

  const supabaseOAuthCookie = cookies.find((c) =>
    /^sb-[^-]+-auth-token-code-verifier$/.test(c.name),
  );

  const hasSession = !!supabaseAuthCookie?.value;
  const isInOAuthFlow = !!supabaseOAuthCookie?.value;

  // Redirect logged-in users away from auth routes
  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Exclude Next.js internals, API routes, and favicon
  const isExcluded =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname.includes("."); // Any file in /public (e.g., images, svg, etc.)

  // Redirect unauthenticated users trying to access protected routes
  if (
    !isExcluded &&
    !isAuthRoute &&
    !isDefaultRoute &&
    !hasSession &&
    !isInOAuthFlow
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
