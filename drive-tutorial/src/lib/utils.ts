import { auth } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getRootFolderUser, insertFolder } from "~/server/db/queries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function onBoarding() {
  const { userId } = await auth();
  const root = await getRootFolderUser(userId!);

  if (!root) {
    const newRoot = await insertFolder({
      name: "root",
      parent: null,
      ownerId: userId!,
    });

    if (!newRoot) {
      console.log("Failed to create root folder");
      return "/";
    }

    return `/f/${newRoot}`;
  }

  return `/f/${root}`;
}
