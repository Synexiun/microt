import { cookies } from "next/headers";
import { validateSession, SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Returns true if the current request has a valid admin session cookie.
 * Use in API route handlers that need admin-only access.
 */
export async function isAdminRequest(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  return validateSession(token);
}
