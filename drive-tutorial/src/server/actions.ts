"use server";

import { auth } from "@clerk/nextjs/server";
import { insertFolder, removeFolderDB } from "./db/queries";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is empty"),
  parent: z.coerce.number({ message: "Error try later" }).min(1),
});

export async function createFolder(
  _: { message: string } | null,
  queryData: FormData,
) {
  const { userId } = await auth();
  const data = Object.fromEntries(queryData.entries());

  const { data: folder, error } = schema.safeParse(data);

  if (error) {
    return { message: error.issues[0]!.message, call: true };
  }

  const newFolder = {
    name: folder.name,
    parent: folder.parent,
    ownerId: userId!,
  };

  await insertFolder(newFolder);

  return { message: "", call: true };
}

export async function removeFolder(folderId: number) {
  const [response] = await removeFolderDB(folderId);

  return response.affectedRows;
}
