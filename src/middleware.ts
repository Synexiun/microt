import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_EXPIRY = 8 * 60 * 60 * 1000; // 8 hours in ms

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD environment variable is not set");
  return secret;
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    const [timestampStr, hmac] = token.split(":");
    const timestamp = Number(timestampStr);
    if (isNaN(timestamp) || !hmac) return false;
    if (Date.now() - timestamp > SESSION_EXPIRY) return false;

    const secret = getSecret();
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(String(timestamp))
    );
    const expected = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hmac === expected;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/admin") && pathname !== "/api/admin/auth";

  if (isAdminPage || isAdminApi) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token || !(await isValidToken(token))) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // CSRF: for state-mutating admin API requests, verify origin matches host
    if (isAdminApi && request.method !== "GET") {
      const origin = request.headers.get("origin");
      const host = request.headers.get("host");
      if (origin && host && !origin.includes(host)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
