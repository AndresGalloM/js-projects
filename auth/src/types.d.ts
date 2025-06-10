import { z } from "zod";
import { signInSchema, signUpSchema } from "./auth/schema";
import { sessionSchema } from "./auth/session";

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;

export type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserDB>>,
  undefined
>;
export type User = z.infer<typeof sessionSchema>;

export type ActionState = {
  message: string;
};
