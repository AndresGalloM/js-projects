import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    return redirect(`/drive`);
  }

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          Drive
        </h1>

        <SignInButton
          mode="modal"
          forceRedirectUrl={"/drive"}
          appearance={{
            variables: {
              colorText: "#f3f4f6",
              colorPrimary: "#f3f4f6",
              colorNeutral: "#f3f4f6",
              colorBackground: "#1f2937",
            },
          }}
        >
          <Button
            size="lg"
            className="border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
          >
            Get Started
          </Button>
        </SignInButton>
      </div>
    </div>
  );
}
