import { userRoles } from "@/drizzle/schema";
import { z } from "zod";
import crypto from "crypto";
import { redis } from "@/redis";
import { Cookies, User } from "@/types";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const REDIS_SESSION_KEY = "session";
const COOKIE_SESSION_KEY = "session-id";

export const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});

export function getUserSessionId(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  return getUserInfoSession(sessionId);
}

async function getUserInfoSession(sessionId: string) {
  const rawUser = await redis.get(`${REDIS_SESSION_KEY}:${sessionId}`);
  if (!rawUser) return null;

  const { success, data: user } = sessionSchema.safeParse(rawUser);
  return success ? user : null;
}

export async function createUserSession(user: User, cookies: Cookies) {
  const sessionId = crypto.randomBytes(512).toString("hex");
  await redis.set(
    `${REDIS_SESSION_KEY}:${sessionId}`,
    sessionSchema.parse(user),
    {
      ex: SESSION_EXPIRATION_SECONDS,
    }
  );

  setCookie(sessionId, cookies);
}

export async function updateUserSession(
  user: User,
  cookies: Pick<Cookies, "get" | "set">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return;

  await redis.set(
    `${REDIS_SESSION_KEY}:${sessionId}`,
    sessionSchema.parse(user),
    {
      ex: SESSION_EXPIRATION_SECONDS,
    }
  );

  setCookie(sessionId, cookies);
}

export async function removeUserSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  cookies.delete(COOKIE_SESSION_KEY);
  await redis.del(`${REDIS_SESSION_KEY}:${sessionId}`);
}

export function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}
