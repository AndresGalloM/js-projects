import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "./ui/dropdown-menu";
import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuPortal,
} from "./ui/context-menu";
import { MenuType } from "./Menu";

type Components = {
  Portal: typeof ContextMenuPortal;
  Content: typeof ContextMenuContent;
  Group: typeof ContextMenuGroup;
  Item: typeof ContextMenuItem;
};

export function getMenuComponents(type: MenuType): Components {
  if (type === MenuType.context) {
    return {
      Portal: ContextMenuPortal,
      Content: ContextMenuContent,
      Group: ContextMenuGroup,
      Item: ContextMenuItem,
    };
  }

  return {
    Portal: DropdownMenuPortal,
    Content: DropdownMenuContent,
    Group: DropdownMenuGroup,
    Item: DropdownMenuItem,
  };
}
