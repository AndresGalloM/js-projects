"use server";

import { ActionState, SignInSchema, SignUpSchema, User } from "@/types";
import { signInSchema, signUpSchema } from "./schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { UserTable } from "@/drizzle/schema";
import { comparePassword, generateSalt, hashPassword } from "./utils";
import {
  createUserSession,
  removeUserSession,
  updateUserSession,
} from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./currentUser";

export async function signIn(_: ActionState | undefined, formData: FormData) {
  const rawUser = Object.fromEntries(formData.entries()) as SignInSchema;
  const { data: inputUser, error } = signInSchema.safeParse(rawUser);

  if (error) {
    return {
      message: error.issues[0].message,
    };
  }

  const user = await db.query.UserTable.findFirst({
    columns: { id: true, password: true, salt: true, role: true },
    where: eq(UserTable.email, inputUser.email),
  });

  if (!user) {
    return {
      message: "User not found, please try signing up",
    };
  }

  const isCorrectPassword = await comparePassword({
    password: inputUser.password,
    hashedPassword: user.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) {
    return {
      message: "Password is not correct, please try again",
    };
  }

  await createUserSession(user, await cookies());

  redirect("/");
}

export async function signUp(_: ActionState | undefined, formData: FormData) {
  const rawUser = Object.fromEntries(formData.entries()) as SignUpSchema;
  const { data: user, error } = signUpSchema.safeParse(rawUser);

  if (error) {
    return {
      message: error.issues[0].message,
    };
  }

  const existingtUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, user.email),
  });

  if (existingtUser) {
    return {
      message: "User with this email already exists.",
    };
  }

  try {
    const salt = generateSalt();
    const HashedPassword = await hashPassword(user.password, salt);

    const [newUser] = await db
      .insert(UserTable)
      .values({
        ...user,
        password: HashedPassword,
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (!newUser) {
      return {
        message: "Unable to create user. Please try again later.",
      };
    }

    await createUserSession(newUser, await cookies());
  } catch {
    return {
      message: "Unable to create user. Please try again later.",
    };
  }

  redirect("/");
}

export async function signOut() {
  await removeUserSession(await cookies());

  redirect("/");
}

export async function toggleRole() {
  const user = await getCurrentUser();

  if (!user) return null;

  const [updatedUser]: User[] = await db
    .update(UserTable)
    .set({ role: user.role === "admin" ? "user" : "admin" })
    .where(eq(UserTable.id, user.id))
    .returning({ id: UserTable.id, role: UserTable.role });

  await updateUserSession(updatedUser, await cookies());
}
