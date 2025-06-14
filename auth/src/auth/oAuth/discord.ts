import { env } from "@/env";
import { OAuthClient } from "./base";
import { z } from "zod";

export default function discordOAuthClient() {
  return new OAuthClient({
    provider: "discord",
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    scopes: ["email", "identify"],
    urls: {
      auth: "https://discord.com/oauth2/authorize",
      token: "https://discord.com/api/oauth2/token",
      user: "https://discord.com/api/users/@me",
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        email: z.string().email().nullable(),
        username: z.string(),
        global_name: z.string(),
      }),
      parse: (user) => ({
        id: user.id,
        email: user.email,
        name: user.global_name ?? user.username,
      }),
    },
  });
}
