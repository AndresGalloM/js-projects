import { env } from "@/env";
import { OAuthClient } from "./base";
import { z } from "zod";

export default function githubOAuthClient() {
  return new OAuthClient({
    provider: "github",
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    scopes: ["user:email", "read:user"],
    urls: {
      auth: "https://github.com/login/oauth/authorize",
      token: "https://github.com/login/oauth/access_token",
      user: "https://api.github.com/user",
    },
    userInfo: {
      schema: z.object({
        id: z.number(),
        name: z.string().nullable(),
        login: z.string(),
        email: z.string().email(),
      }),
      parse: (user) => ({
        id: user.id.toString(),
        name: user.name ?? user.login,
        email: user.email,
      }),
    },
  });
}
