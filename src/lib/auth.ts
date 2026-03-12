import { createHmac } from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_EXPIRY = 8 * 60 * 60; // 8 hours in seconds

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

// Stateless signed cookie — no database needed
export function createSession(): string {
  const timestamp = Date.now();
  const secret = process.env.ADMIN_PASSWORD || "admin123";
  const hmac = createHmac("sha256", secret)
    .update(String(timestamp))
    .digest("hex");
  return `${timestamp}:${hmac}`;
}

export function validateSession(token: string): boolean {
  try {
    const [timestampStr, hmac] = token.split(":");
    const timestamp = Number(timestampStr);
    if (isNaN(timestamp) || !hmac) return false;
    // Check expiry
    if (Date.now() - timestamp > SESSION_EXPIRY * 1000) return false;
    // Verify signature
    const secret = process.env.ADMIN_PASSWORD || "admin123";
    const expected = createHmac("sha256", secret)
      .update(String(timestamp))
      .digest("hex");
    return hmac === expected;
  } catch {
    return false;
  }
}
