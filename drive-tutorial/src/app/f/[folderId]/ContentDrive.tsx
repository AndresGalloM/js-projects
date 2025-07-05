import Header from "~/app/f/[folderId]/Header";
import Content from "~/app/f/[folderId]/Content";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function ContentDrive({
  currentFolderId,
}: {
  currentFolderId: number;
}) {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <Header currentFolder={currentFolderId} />

        <Suspense
          fallback={
            <div className="flex flex-col">
              <Skeleton className="mb-6 h-6 w-25 bg-gray-600" />
              <Skeleton className="h-[120px] w-full bg-gray-600" />
            </div>
          }
        >
          <Content currentFolder={currentFolderId} />
        </Suspense>
      </div>
    </div>
  );
}
