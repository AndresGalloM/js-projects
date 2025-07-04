"use server";

import { auth } from "@clerk/nextjs/server";
import {
  filesPromise,
  foldersPromise,
  getBreadCrumbs,
  getFileById,
  getRootFolderUser,
  insertFolder,
  removeFileDB,
  removeFolderDB,
} from "./db/queries";
import { z } from "zod";
import { UTApi } from "uploadthing/server";

const utApi = new UTApi();

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

export async function deleteFileService(files: string | string[]) {
  const { success, deletedCount } = await utApi.deleteFiles(files);
  if (!success || !deletedCount) throw new Error("Error try later");
}

export async function removeFolder(folderId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { files, response } = await removeFolderDB(folderId);
  await deleteFileService(files);

  return response.affectedRows;
}

export async function removeFile(fileId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const file = await getFileById(fileId);
  if (!file) throw new Error("File not found");

  const [response] = await removeFileDB(fileId);
  await deleteFileService(file.key);

  return response.affectedRows;
}

export async function getInfo(folderId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const [rootId, breadCrumbs, folders, files] = await Promise.all([
    getRootFolderUser(userId),
    getBreadCrumbs(folderId),
    foldersPromise(folderId),
    filesPromise(folderId),
  ]);

  return { rootId, breadCrumbs, folders, files };
}
