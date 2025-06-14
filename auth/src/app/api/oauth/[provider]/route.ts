import { getOAuthClient } from "@/auth/oAuth/base";
import { createUserSession } from "@/auth/session";
import { db } from "@/drizzle/db";
import {
  OAuthProvider,
  oAuthProviders,
  UserOAuthAccountTable,
  UserTable,
} from "@/drizzle/schema";
import { OAuthSchema } from "@/types";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider: rawProvider } = await params;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  const { data: provider, error } = z
    .enum(oAuthProviders)
    .safeParse(rawProvider);

  if (!code || error || !state) {
    redirect(
      `/sign-in?oauthError${encodeURIComponent(
        "Failed to connect. Please try again"
      )}`
    );
  }

  const oAuthClient = getOAuthClient(provider);

  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies());
    const user = await connectUserToAccount(oAuthUser, provider);
    await createUserSession(user, await cookies());
  } catch (error) {
    console.log(error);
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again"
      )}`
    );
  }

  redirect("/");
}

async function connectUserToAccount(
  oAuthUser: OAuthSchema,
  provider: OAuthProvider
) {
  return db.transaction(async (tx) => {
    let user;

    if (oAuthUser.email !== null) {
      user = await tx.query.UserTable.findFirst({
        columns: { id: true, role: true },
        where: eq(UserTable.email, oAuthUser.email),
      });
    }

    if (!user) {
      const [newUser] = await tx
        .insert(UserTable)
        .values({
          name: oAuthUser.name,
          email: oAuthUser.email,
        })
        .returning({ id: UserTable.id, role: UserTable.role });

      user = newUser;
    }

    await tx
      .insert(UserOAuthAccountTable)
      .values({
        provider: provider,
        providerAccountId: oAuthUser.id,
        userId: user.id,
      })
      .onConflictDoNothing();

    return user;
  });
}
