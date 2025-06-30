import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function MenuItem({ remove }: { remove: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-8 rounded-full text-white hover:bg-gray-700 hover:text-white"
          variant="ghost"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="left">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Pencil />
            Change name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={remove}>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
