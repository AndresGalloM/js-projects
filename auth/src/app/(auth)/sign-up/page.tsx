"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ActionState } from "@/types";
import { signUp } from "@/auth/actions";
import FormButton from "@/app/components/FormButton";

const initialState: ActionState = {
  message: "",
};

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUp, initialState);

  return (
    <section className="max-w-[300px] w-full">
      <h2 className="text-2xl mb-4">Sign up</h2>

      <form action={formAction} className="flex flex-col gap-4">
        {/* {error && <p className="text-destructive">{error}</p>} */}
        <div className=" flex gap-2">
          <button
            type="button"
            // onClick={async () => await oAuthSignIn("discord")}
          >
            Discord
          </button>
          <button
            type="button"
            // onClick={async () => await oAuthSignIn("github")}
          >
            GitHub
          </button>
        </div>
        <label className="flex flex-col">
          <span className="mb-1.5">Name</span>
          <input
            name="name"
            type="text"
            className="border px-3 py-2 rounded-md"
          />
        </label>
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
          <FormButton label="Sign Up" />
          <Link href="/sign-in">Sign In</Link>
        </div>
      </form>
    </section>
  );
}
