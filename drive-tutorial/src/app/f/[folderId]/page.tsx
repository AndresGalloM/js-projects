import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import ContentDrive from "~/app/ContentDrive";
import {
  filesPromise,
  foldersPromise,
  getBreadCrumbs,
  getFolderById,
  getRootFolderUser,
} from "~/server/db/queries";

export default async function Drive({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { userId } = await auth();
  const { folderId } = await params;

  if (!userId) {
    return redirect("/");
  }

  const { data: folder, error } = z.coerce.number().safeParse(folderId);
  if (error) {
    throw new Error("Invalid folder id");
  }

  const existFolder = await getFolderById(folder, userId);
  if (!existFolder) {
    throw new Error("Folder not found");
  }

  const [rootId, breadCrumbs, folders, files] = await Promise.all([
    getRootFolderUser(userId),
    getBreadCrumbs(folder),
    foldersPromise(folder),
    filesPromise(folder),
  ]);

  return (
    <ContentDrive
      rootFolderId={rootId!}
      currentFolderId={folder}
      breadCrumbs={breadCrumbs}
      folders={folders}
      files={files}
    />
  );
}
