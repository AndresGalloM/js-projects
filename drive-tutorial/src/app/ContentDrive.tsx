"use client";

import FolderRow from "./FolderRow";
import FileRow from "./FileRow";
import type { Folder, File } from "~/server/db/schema";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { ChevronRight } from "lucide-react";

import { MenuNewThing } from "~/components/MenuNewThing";
import { RightClickMenu } from "~/components/RightClickMenu";
import EmptyFolder from "~/components/EmptyFolder";

export default function ContentDrive({
  rootFolderId,
  currentFolderId,
  breadCrumbs,
  folders,
  files,
}: {
  rootFolderId: number;
  currentFolderId: number;
  breadCrumbs: Folder[];
  folders: Folder[];
  files: File[];
}) {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <MenuNewThing folderId={currentFolderId} />

          <UserButton
            fallback={
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-700" />
            }
            appearance={{
              variables: {
                colorText: "#f3f4f6",
                colorPrimary: "#f3f4f6",
                colorNeutral: "#f3f4f6",
                colorBackground: "#1f2937",
              },
              elements: {
                userButtonAvatarBox: {
                  width: "32px",
                  height: "32px",
                },
              },
            }}
          />
        </header>
        <RightClickMenu folderId={currentFolderId}>
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Link
                  href={`/f/${rootFolderId}`}
                  className="e text-gray-300 hover:text-white"
                >
                  My Drive
                </Link>
                {breadCrumbs.map((folder) => (
                  <div key={folder.id} className="flex items-center">
                    <ChevronRight className="m-2 text-gray-400" size={16} />
                    <Link
                      href={`/f/${folder.id}`}
                      className="e text-gray-300 hover:text-white"
                    >
                      {folder.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {files.length === 0 && folders.length === 0 ? (
              <EmptyFolder />
            ) : (
              <div className="rounded-lg bg-gray-800 shadow-xl">
                <div className="border-b border-gray-700 px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-3">Created</div>
                    <div className="col-span-3">Size</div>
                  </div>
                </div>
                <ul>
                  {folders.map((folder) => (
                    <FolderRow key={folder.id} folder={folder} />
                  ))}

                  {files.map((file) => (
                    <FileRow key={file.id} file={file} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </RightClickMenu>
      </div>
    </div>
  );
}
