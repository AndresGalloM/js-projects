import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { foldersTable } from "~/server/db/schema";

export default function SandBox() {
  return (
    <form
      action={async () => {
        "use server";

        const { userId } = await auth();

        if (!userId) {
          return redirect("/");
        }

        const [root] = await db
          .insert(foldersTable)
          .values({
            name: "root",
            parent: null,
            ownerId: userId,
          })
          .$returningId();

        const folders = mockFolders.map((folder) => ({
          name: folder.name,
          parent: root!.id,
          ownerId: userId,
        }));

        await db.insert(foldersTable).values(folders);
      }}
    >
      <Button type="submit">Seed</Button>
    </form>
  );
}
