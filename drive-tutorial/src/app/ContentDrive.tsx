"use client";

import FolderRow from "./FolderRow";
import FileRow from "./FileRow";
import type { Folder, File } from "~/server/db/schema";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/UploadThing";
import { ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";

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
  const navigator = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <UploadButton
              endpoint={"imageUploader"}
              input={{ folderId: currentFolderId }}
              content={{
                button: <p>Nuevo</p>,
              }}
              appearance={{
                allowedContent: {
                  display: "none",
                },
              }}
              onClientUploadComplete={() => {
                navigator.refresh();
              }}
            />
          </div>

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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/f/${rootFolderId}`}
              className="text-gray-300 hover:text-white hover:underline"
            >
              My Drive
            </Link>
            {breadCrumbs.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="m-2 text-gray-400" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white hover:underline"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
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
      </div>
    </div>
  );
}
