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

type Components<T extends MenuType> = T extends MenuType.context
  ? {
      Portal: typeof ContextMenuPortal;
      Content: typeof ContextMenuContent;
      Group: typeof ContextMenuGroup;
      Item: typeof ContextMenuItem;
    }
  : {
      Portal: typeof DropdownMenuPortal;
      Content: typeof DropdownMenuContent;
      Group: typeof DropdownMenuGroup;
      Item: typeof DropdownMenuItem;
    };

export function getMenuComponents<T extends MenuType>(
  type: MenuType,
): Components<T> {
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
