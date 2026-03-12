import { randomUUID } from "crypto";
import { kv } from "@vercel/kv";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_EXPIRY = 8 * 60 * 60; // 8 hours in seconds (for KV TTL)

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

export async function createSession(): Promise<string> {
  const token = randomUUID();
  await kv.set(`session:${token}`, { createdAt: Date.now() }, { ex: SESSION_EXPIRY });
  return token;
}

export async function validateSession(token: string): Promise<boolean> {
  const session = await kv.get(`session:${token}`);
  return session !== null;
}

export async function clearSession(token: string): Promise<void> {
  await kv.del(`session:${token}`);
}
