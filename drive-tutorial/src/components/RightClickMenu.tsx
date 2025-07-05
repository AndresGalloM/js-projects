"use client";

import { type JSX } from "react";
import { Menu, MenuType } from "./Menu";
import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";

export function RightClickMenu({
  children,
  folderId,
}: {
  children: JSX.Element;
  folderId: number;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <Menu type={MenuType.context} folderId={folderId} />
    </ContextMenu>
  );
}
