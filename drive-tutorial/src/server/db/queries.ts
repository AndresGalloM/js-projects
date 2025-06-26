import { eq } from "drizzle-orm";
import { db } from ".";
import { filesTable, foldersTable } from "./schema";

export function foldersPromise(folder: number) {
  return db.select().from(foldersTable).where(eq(foldersTable.parent, folder));
}

export function filesPromise(folder: number) {
  return db.select().from(filesTable).where(eq(filesTable.parent, folder));
}

export async function getBreadCrumbs(folderId: number) {
  const crumbs = [];
  let currentFolderId = folderId;

  while (currentFolderId !== 1125899906842625) {
    const [folder] = await db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.id, currentFolderId));

    if (!folder) break;

    crumbs.unshift(folder);
    currentFolderId = folder.parent ?? 0;
  }

  return crumbs;
}
