"use client";

import { Folder as FolderIcon } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { MenuItem } from "~/components/MenuItem";
import { formatter } from "~/lib/utils";
import { removeFolder } from "~/server/actions";
import type { Folder } from "~/server/db/schema";

export default function FolderRow({ folder }: { folder: Folder }) {
  const navigator = useRouter();
  const deleteFolder = async () => {
    try {
      const affectedRows = await removeFolder(folder.id);

      if (affectedRows) {
        navigator.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") return redirect("/");
      }
    }
  };

  return (
    <li className="border-b border-gray-700 px-6 py-4 last:border-b-0 hover:bg-gray-700/25">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">
          {formatter.format(folder.createdAt)}
        </div>
        <div className="col-span-2 text-gray-400"></div>
        <div className="col-span-1 flex justify-end text-gray-400">
          <MenuItem remove={deleteFolder} />
        </div>
      </div>
    </li>
  );
}
