import Link from "next/link";
import { RightClickMenu } from "~/components/RightClickMenu";
import { ChevronRight } from "lucide-react";
import EmptyFolder from "~/components/EmptyFolder";
import FolderRow from "~/app/f/[folderId]/FolderRow";
import FileRow from "~/app/f/[folderId]/FileRow";
import { getInfo } from "~/server/actions";

export default async function Content({
  currentFolder,
}: {
  currentFolder: number;
}) {
  const { rootId, breadCrumbs, folders, files } = await getInfo(currentFolder);

  return (
    <RightClickMenu folderId={currentFolder}>
      <div className="flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/f/${rootId}`}
              className="e text-gray-300 hover:text-white"
            >
              My Drive
            </Link>
            {breadCrumbs.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-400" size={16} />
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
  );
}
