import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_EXPIRY = 8 * 60 * 60 * 1000; // 8 hours in ms

function isValidToken(token: string): boolean {
  try {
    const [timestampStr, hmac] = token.split(":");
    const timestamp = Number(timestampStr);
    if (isNaN(timestamp) || !hmac) return false;
    if (Date.now() - timestamp > SESSION_EXPIRY) return false;
    const secret = process.env.ADMIN_PASSWORD || "admin123";
    const expected = createHmac("sha256", secret)
      .update(String(timestamp))
      .digest("hex");
    return hmac === expected;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token || !isValidToken(token)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
