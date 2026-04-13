import { createHmac } from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_EXPIRY = 8 * 60 * 60; // 8 hours in seconds

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD environment variable is not set");
  return secret;
}

export function verifyPassword(password: string): boolean {
  return password === getSecret();
}

export function createSession(): string {
  const timestamp = Date.now();
  const secret = getSecret();
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
    if (Date.now() - timestamp > SESSION_EXPIRY * 1000) return false;
    const expected = createHmac("sha256", getSecret())
      .update(String(timestamp))
      .digest("hex");
    return hmac === expected;
  } catch {
    return false;
  }
}
