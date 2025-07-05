import { UserButton } from "@clerk/nextjs";
import { MenuNewThing } from "~/components/MenuNewThing";

export default function Header({ currentFolder }: { currentFolder: number }) {
  return (
    <header className="mb-10 flex items-center justify-between">
      <MenuNewThing folderId={currentFolder} />

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
  );
}
