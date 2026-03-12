import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes, but NOT /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
