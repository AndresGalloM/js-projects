import { Folder as FolderIcon } from "lucide-react";
import type { Folder } from "~/lib/mock-data";

export default function FolderRow({
  folder,
  handleFolderClick,
}: {
  folder: Folder;
  handleFolderClick: () => void;
}) {
  return (
    <li className="border-b border-gray-700 px-6 py-4 hover:bg-gray-700">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <button
            onClick={() => handleFolderClick()}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </button>
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
