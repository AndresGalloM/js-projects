import { z } from "zod";
import ContentDrive from "~/app/ContentDrive";
import {
  filesPromise,
  foldersPromise,
  getBreadCrumbs,
} from "~/server/db/queries";

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

  const [breadCrumbs, folders, files] = await Promise.all([
    getBreadCrumbs(folder),
    foldersPromise(folder),
    filesPromise(folder),
  ]);

  return (
    <ContentDrive breadCrumbs={breadCrumbs} folders={folders} files={files} />
  );
}
