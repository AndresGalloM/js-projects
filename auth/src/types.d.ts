import { z } from "zod";
import { signInSchema, signUpSchema } from "./auth/schema";
import { sessionSchema } from "./auth/session";

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type OAuthSchema = {
  id: string;
  name: string;
  email: string | null;
};

export type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserDB>>,
  undefined
>;
export type User = z.infer<typeof sessionSchema>;

export type ActionState = {
  message: string;
};

export type Cookies = {
  set: (
    key: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};
