"use client";

import { FileIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { MenuItem } from "~/components/MenuItem";
import { fileSize, formatter } from "~/lib/utils";
import { removeFile } from "~/server/actions";
import type { File } from "~/server/db/schema";

export default function FileRow({ file }: { file: File }) {
  const navigator = useRouter();
  const [unit, size] = fileSize(file.size);

  const deleteFile = async () => {
    try {
      toast.promise(removeFile(file.id), {
        loading: "Deleting...",
        success: (affectedRows) => {
          if (affectedRows) {
            navigator.refresh();
            return {
              message: "Deleted file",
            };
          }

          return {
            message: "The folder couldn't be deleted",
          };
        },
        error: "Unexpected error",
      });
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
          <a
            href={file.url ?? "#"}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">
          {formatter.format(file.createdAt)}
        </div>
        <div className="col-span-2 text-gray-400">
          {size} {unit}
        </div>
        <div className="col-span-1 flex justify-end text-gray-400">
          <MenuItem remove={deleteFile} />
        </div>
      </div>
    </li>
  );
}
