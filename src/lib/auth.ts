import { randomUUID } from "crypto";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_EXPIRY = 8 * 60 * 60; // 8 hours in seconds

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return password === adminPassword;
}

export async function createSession(): Promise<string> {
  const token = randomUUID();
  await redis.set(`session:${token}`, JSON.stringify({ createdAt: Date.now() }), { ex: SESSION_EXPIRY });
  return token;
}

export async function validateSession(token: string): Promise<boolean> {
  const session = await redis.get(`session:${token}`);
  return session !== null;
}

export async function clearSession(token: string): Promise<void> {
  await redis.del(`session:${token}`);
}
