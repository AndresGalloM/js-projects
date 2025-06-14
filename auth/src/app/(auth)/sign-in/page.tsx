"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ActionState } from "@/types";
import { signIn } from "@/auth/actions";
import FormButton from "@/app/components/FormButton";
import OAuthClients from "@/app/components/OAuthClients";

const initialState: ActionState = {
  message: "",
};

export default function SignInPage() {
  const [state, formAction] = useActionState(signIn, initialState);

  return (
    <section className="max-w-[300px] w-full">
      <h2 className="text-2xl mb-4">Sign in</h2>

      <form action={formAction} className="flex flex-col gap-4">
        {/* {error && <p className="text-destructive">{error}</p>} */}
        <OAuthClients />
        <label className="flex flex-col">
          <span className="mb-1.5">Email</span>
          <input
            name="email"
            type="email"
            className="border px-3 py-2 rounded-md"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1.5">Password</span>
          <input
            name="password"
            type="password"
            className="border px-3 py-2 rounded-md"
          />
        </label>

        {state?.message && <p className="text-destructive">{state.message}</p>}

        <div className="flex gap-3 items-center">
          <FormButton label="Sign In" />
          <Link href="/sign-up">Sign Up</Link>
        </div>
      </form>
    </section>
  );
}
