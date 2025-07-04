import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { onBoarding } from "~/lib/onBoarding";
import { getRootFolderUser } from "~/server/db/queries";

export default async function Drive() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const root = await getRootFolderUser(userId);

  if (!root) {
    return redirect(await onBoarding());
  }

  return redirect(`/f/${root}`);
}
