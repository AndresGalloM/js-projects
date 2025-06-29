import { auth } from "@clerk/nextjs/server";
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
  const { data: folder, error } = z.coerce.number().safeParse(folderId);

  if (error) {
    //Do something
    return;
  }

  const existFolder = await getFolderById(folder);

  if (!existFolder) {
    // Handle the case where the folder does not exist
    console.log("Folder not found:", folder);
    return;
  }

  const [rootId, breadCrumbs, folders, files] = await Promise.all([
    getRootFolderUser(userId!),
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
