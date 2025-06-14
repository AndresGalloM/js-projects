import { env } from "@/env";
import { Cookies, OAuthSchema } from "@/types";
import { z } from "zod";
import crypto from "crypto";
import { OAuthProvider } from "@/drizzle/schema";
import discordOAuthClient from "./discord";
import githubOAuthClient from "./github";

const OAUTH_STATE_KEY = "oauthState";
const COOKIE_EXPIRATION_SECONDS = 60 * 5;

export class OAuthClient<T> {
  private readonly provider: OAuthProvider;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: {
    auth: string;
    token: string;
    user: string;
  };
  private readonly userInfo: {
    schema: z.ZodSchema<T>;
    parse: (data: T) => OAuthSchema;
  };

  private tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  });

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: {
    provider: OAuthProvider;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    urls: {
      auth: string;
      token: string;
      user: string;
    };
    userInfo: {
      schema: z.ZodSchema<T>;
      parse: (data: T) => OAuthSchema;
    };
  }) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
    this.userInfo = userInfo;
  }

  private get redirectUrl() {
    return new URL(this.provider, env.OAUTH_REDIRECT_URL);
  }

  createAuthUrl(cookies: Pick<Cookies, "set">) {
    const url = new URL(this.urls.auth);
    const state = createState(cookies);

    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("scope", this.scopes.join(" "));
    url.searchParams.set("redirect_uri", this.redirectUrl.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("state", state);

    return url.toString();
  }

  async fetchUser(code: string, state: string, cookies: Pick<Cookies, "get">) {
    const isValidState = validateState(state, cookies);

    if (!isValidState) throw new Error("Invalid state");

    const { accessToken, tokenType } = await this.fetchToken(code);

    const user = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((rawUser) => {
        const { data: user, error } = this.userInfo.schema.safeParse(rawUser);

        if (error) throw new Error("Invalid user");

        return user;
      });

    return this.userInfo.parse(user);
  }

  private async fetchToken(code: string) {
    return fetch(this.urls.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, error } = this.tokenSchema.safeParse(rawData);

        if (error) throw new Error("Invalid Token");

        return {
          accessToken: data.access_token,
          tokenType: data.token_type,
        };
      });
  }
}

export function getOAuthClient(provider: OAuthProvider) {
  switch (provider) {
    case "discord":
      return discordOAuthClient();
    case "github":
      return githubOAuthClient();
    default:
      throw new Error("Invalid provider");
  }
}

function createState(cookies: Pick<Cookies, "set">) {
  const state = crypto.randomBytes(64).toString("hex");

  cookies.set(OAUTH_STATE_KEY, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  });

  return state;
}

function validateState(state: string, cookies: Pick<Cookies, "get">) {
  const cookieState = cookies.get(OAUTH_STATE_KEY)?.value;
  return state === cookieState;
}
