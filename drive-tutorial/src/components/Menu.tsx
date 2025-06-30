import { FileUp, FolderPlus } from "lucide-react";
import { getMenuComponents } from "./MenuComponents";
import { UploadButton } from "./UploadThing";
import { useRouter } from "next/navigation";
import { CreateFolder } from "./CreateFolder";
import { useState } from "react";

export enum MenuType {
  "context",
  "dropdown",
}

export function Menu({ type, folderId }: { type: MenuType; folderId: number }) {
  const { Portal, Content, Group, Item } = getMenuComponents(type);
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

      <Portal>
        <Content align="start" side="right">
          <Group>
            <Item
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <FolderPlus />
              Create folder
            </Item>
            <Item className="p-0">
              <UploadButton
                endpoint={"imageUploader"}
                input={{ folderId }}
                content={{
                  button: (
                    <Item>
                      <FileUp />
                      Upload file
                    </Item>
                  ),
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
                  },
                }}
                onClientUploadComplete={() => {
                  navigator.refresh();
                }}
              />
            </Item>
          </Group>
        </Content>
      </Portal>
    </>
  );
}
