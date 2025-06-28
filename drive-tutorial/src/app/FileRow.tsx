import { FileIcon } from "lucide-react";
import type { File } from "~/server/db/schema";

const FILE_WEIGHTS = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
};

type Unit = keyof typeof FILE_WEIGHTS;

export default function FileRow({ file }: { file: File }) {
  let prev: [Unit, number] = ["B", 1];
  Object.entries(FILE_WEIGHTS).filter(([key, value]) => {
    if (file.size < value) {
      return prev;
    }
    prev = [key as Unit, value];
  });

  const [unit, size] = prev;

  return (
    <li className="border-b border-gray-700 px-6 py-4 hover:bg-gray-700">
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
        <div className="col-span-3 text-gray-400">{"File"}</div>
        <div className="col-span-3 text-gray-400">
          {Math.ceil(file.size / size)} {unit}
        </div>
      </div>
    </li>
  );
}
