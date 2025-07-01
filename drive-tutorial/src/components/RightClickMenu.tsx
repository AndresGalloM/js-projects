import { useState, type JSX } from "react";
import { Menu, MenuType } from "./Menu";
import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";

export function RightClickMenu({
  children,
  folderId,
}: {
  children: JSX.Element;
  folderId: number;
}) {
  const [key, setKey] = useState(0);

  return (
    <ContextMenu
      key={key}
      onOpenChange={(open) => {
        if (!open) {
          setKey((prev) => prev + 1);
        }
      }}
    >
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <Menu type={MenuType.context} folderId={folderId} />
    </ContextMenu>
  );
}
