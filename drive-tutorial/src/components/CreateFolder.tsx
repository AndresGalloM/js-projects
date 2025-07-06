"use client";

import { Folder } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useActionState, useEffect } from "react";
import { createFolder } from "~/server/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateFolder({
  parent,
  open,
  close,
}: {
  parent: number;
  open: boolean;
  close: () => void;
}) {
  const navigator = useRouter();
  const [state, formAction, loading] = useActionState(
    async (
      prevState: { success: boolean; message: string } | null,
      queryData: FormData,
    ) => {
      const result = toast.promise(createFolder(prevState, queryData), {
        loading: "Creating...",
        success: ({ success, message }) => {
          if (success) {
            navigator.refresh();
            close();
          }

          return {
            type: success ? "success" : "error",
            message,
          };
        },
        error: "Unexpected error",
      });
      const { success, message } = await result.unwrap();
      return { success, message };
    },
    null,
  );

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-row items-center">
            <Folder />
            <DialogTitle>New Folder</DialogTitle>
          </DialogHeader>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <label htmlFor="name-1">Name</label>
                <div>
                  <Input type="hidden" name="parent" value={parent} />
                  <Input id="name-1" name="name" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
