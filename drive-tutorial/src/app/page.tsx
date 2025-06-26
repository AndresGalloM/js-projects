import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";
import ContentDrive from "./ContentDrive";

export default async function GoogleDriveClone() {
  const [root] = await db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.name, "root"));
  const folders = await db.select().from(foldersTable);
  const files = await db.select().from(filesTable);

  return <ContentDrive folders={folders} files={files} />;
}
