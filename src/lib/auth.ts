import { randomUUID } from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_EXPIRY = 8 * 60 * 60 * 1000; // 8 hours

const activeSessions = new Map<string, { expiresAt: number }>();

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

export function createSession(): string {
  const token = randomUUID();
  activeSessions.set(token, {
    expiresAt: Date.now() + SESSION_EXPIRY,
  });
  return token;
}

export function validateSession(token: string): boolean {
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

export function clearSession(token: string): void {
  activeSessions.delete(token);
}
