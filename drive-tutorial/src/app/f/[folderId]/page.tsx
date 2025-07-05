import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import ContentDrive from "~/app/f/[folderId]/ContentDrive";
import { getFolderById } from "~/server/db/queries";

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

  return <ContentDrive currentFolderId={folder} />;
}
