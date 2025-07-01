import { Folder } from "lucide-react";

export default function EmptyFolder() {
  return (
    <section className="my-20 flex flex-col items-center">
      <Folder size={90} />
      <h2 className="mt-4 text-3xl font-semibold">Empty folder</h2>
      <p className="text-gray-400">Use the new button to create a file</p>
    </section>
  );
}
