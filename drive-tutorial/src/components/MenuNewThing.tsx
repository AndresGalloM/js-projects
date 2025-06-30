import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Menu, MenuType } from "./Menu";

export function MenuNewThing({ folderId }: { folderId: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <Plus /> {"New"}
        </Button>
      </DropdownMenuTrigger>
      <Menu type={MenuType.dropdown} folderId={folderId} />
    </DropdownMenu>
  );
}
