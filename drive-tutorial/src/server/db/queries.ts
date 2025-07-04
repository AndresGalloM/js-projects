import {
  and,
  desc,
  eq,
  inArray,
  isNull,
  type ExtractTablesWithRelations,
} from "drizzle-orm";
import { db } from ".";
import { filesTable, foldersTable, type File, type Folder } from "./schema";
import type { SingleStoreTransaction } from "drizzle-orm/singlestore-core";
import type {
  SingleStoreDriverPreparedQueryHKT,
  SingleStoreDriverQueryResultHKT,
} from "drizzle-orm/singlestore";
import type * as schema from "./schema";

export function foldersPromise(folder: number) {
  return db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.parent, folder))
    .orderBy(desc(foldersTable.createdAt));
}

export function filesPromise(file: number) {
  return db
    .select()
    .from(filesTable)
    .where(eq(filesTable.parent, file))
    .orderBy(desc(filesTable.createdAt));
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

export async function getFileById(fileId: number) {
  const [file] = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.id, fileId));

  return file;
}

export async function insertFile(file: Omit<File, "id" | "createdAt">) {
  return await db.insert(filesTable).values({ ...file });
}

export async function removeFileDB(fileId: number) {
  return await db.delete(filesTable).where(eq(filesTable.id, fileId));
}

export async function insertFolder(folder: Omit<Folder, "id" | "createdAt">) {
  const [newFolder] = await db
    .insert(foldersTable)
    .values({ ...folder })
    .$returningId();

  return newFolder?.id;
}

// async function removeFoldersFolders(folderId: number) {
//   await db.delete(foldersTable).where(eq(foldersTable.parent, folderId));
// }

// async function removeFoldersFiles(fileId: number) {
//   await db.delete(filesTable).where(eq(filesTable.parent, fileId));
// }

async function getSubFolders(
  folderId: number,
  tx: SingleStoreTransaction<
    SingleStoreDriverQueryResultHKT,
    SingleStoreDriverPreparedQueryHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
  >,
) {
  const subFolders: number[] = [];

  const response = await tx
    .select({ id: foldersTable.id })
    .from(foldersTable)
    .where(eq(foldersTable.parent, folderId));

  const folders = response.map((folder) => folder.id);

  for (const id of folders) {
    subFolders.push(...(await getSubFolders(id, tx)));
  }

  subFolders.push(...folders);
  return subFolders;
}

export async function removeFolderDB(folderId: number) {
  const response = await db.transaction(async (tx) => {
    const subFolders = await getSubFolders(folderId, tx);
    subFolders.push(folderId);

    const files = await tx
      .select({ key: filesTable.key })
      .from(filesTable)
      .where(inArray(filesTable.parent, subFolders));

    await tx.delete(filesTable).where(inArray(filesTable.parent, subFolders));
    await tx
      .delete(foldersTable)
      .where(inArray(foldersTable.parent, subFolders));

    const [response] = await tx
      .delete(foldersTable)
      .where(eq(foldersTable.id, folderId));

    return { files: files.map((file) => file.key), response };
  });

  return response;
}
