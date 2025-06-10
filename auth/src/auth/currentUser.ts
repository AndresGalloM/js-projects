import { cookies } from "next/headers";
import { getUserSessionId } from "./session";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { UserTable } from "@/drizzle/schema";
import { FullUser, User } from "@/types";

export function getCurrentUser(options?: {
  withFullUser?: false;
}): Promise<User>;
export function getCurrentUser(options: {
  withFullUser: true;
}): Promise<FullUser>;

export async function getCurrentUser({ withFullUser = false } = {}) {
  const user = await getUserSessionId(await cookies());

  if (!user) return null;

  if (!withFullUser) return user;

  return await getUserDB(user.id);
}

async function getUserDB(id: string) {
  return db.query.UserTable.findFirst({
    columns: { id: true, name: true, role: true, email: true },
    where: eq(UserTable.id, id),
  });
}
