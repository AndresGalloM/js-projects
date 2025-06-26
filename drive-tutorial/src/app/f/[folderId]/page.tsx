import { eq } from "drizzle-orm";
import { z } from "zod";
import ContentDrive from "~/app/ContentDrive";
import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";

async function getBreadCrumbs(folderId: number) {
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

export default async function Folder({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const { data: folder, error } = z.coerce.number().safeParse(folderId);

  if (error) {
    //Do something
    return;
  }

  const breadCrumbsPromise = getBreadCrumbs(folder);

  const foldersPromise = db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.parent, folder));

  const filesPromise = db
    .select()
    .from(filesTable)
    .where(eq(filesTable.parent, folder));

  const [breadCrumbs, folders, files] = await Promise.all([
    breadCrumbsPromise,
    foldersPromise,
    filesPromise,
  ]);

  return (
    <ContentDrive breadCrumbs={breadCrumbs} folders={folders} files={files} />
  );
}
