"use client";

import { FileUp, FolderPlus } from "lucide-react";
import { getMenuComponents } from "./MenuComponents";
import { UploadButton } from "./UploadThing";
import { useRouter } from "next/navigation";
import { CreateFolder } from "./CreateFolder";
import { useRef, useState } from "react";

export enum MenuType {
  "context",
  "dropdown",
}

export function Menu({ type, folderId }: { type: MenuType; folderId: number }) {
  const { Portal, Content, Group, Item } = getMenuComponents(type);
  const inputRef = useRef<HTMLDivElement>(null);
  const navigator = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <CreateFolder open={openDialog} close={closeDialog} parent={folderId} />
      )}

      <UploadButton
        endpoint={"imageUploader"}
        input={{ folderId }}
        content={{
          button: <div ref={inputRef}></div>,
        }}
        appearance={{
          allowedContent: {
            display: "none",
          },
          button: {
            background: "transparent",
            height: "auto",
            display: "block",
            color: "inherit",
          },
          container: {
            padding: 0,
            display: "none",
          },
        }}
        onClientUploadComplete={() => {
          navigator.refresh();
        }}
        onUploadError={() => {
          console.log("Error something went wrong");
        }}
      />

      <Portal>
        <Content align="start" side="right">
          <Group>
            <Item
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <>
                <FolderPlus />
                Create folder
              </>
            </Item>
            <Item
              onClick={() => {
                if (!inputRef.current) return;
                const input = inputRef.current
                  .previousSibling as HTMLInputElement;

                input.click();
              }}
            >
              <FileUp />
              Upload file
            </Item>
          </Group>
        </Content>
      </Portal>
    </>
  );
}
