import { and, eq, isNull } from "drizzle-orm";
import { db } from ".";
import { filesTable, foldersTable, type File, type Folder } from "./schema";

export function foldersPromise(folder: number) {
  return db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.parent, folder))
    .orderBy(foldersTable.createdAt);
}

export function filesPromise(folder: number) {
  return db
    .select()
    .from(filesTable)
    .where(eq(filesTable.parent, folder))
    .orderBy(filesTable.createdAt);
}

export async function getBreadCrumbs(folderId: number) {
  const crumbs = [];
  let currentFolderId = folderId;

  while (currentFolderId !== null) {
    const [folder] = await db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.id, currentFolderId));

    if (folder?.parent == null) break;

    crumbs.unshift(folder);
    currentFolderId = folder.parent ?? 0;
  }

  return crumbs;
}

export async function getRootFolderUser(userId: string) {
  const [rootFolder] = await db
    .select({ id: foldersTable.id })
    .from(foldersTable)
    .where(and(eq(foldersTable.ownerId, userId), isNull(foldersTable.parent)));

  return rootFolder?.id;
}

export async function getFolderById(folderId: number) {
  const [folder] = await db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.id, folderId));

  return folder;
}

export async function insertFile(file: Omit<File, "id" | "createdAt">) {
  return await db.insert(filesTable).values({ ...file });
}

export async function insertFolder(folder: Omit<Folder, "id" | "createdAt">) {
  const [newFolder] = await db
    .insert(foldersTable)
    .values({ ...folder })
    .$returningId();

  return newFolder?.id;
}
