"use client";

import { useFileDelete } from "@/modules/files/hooks/use-file-delete";
import type { PublicFile } from "@repo/backend/lib/convertEntryToPublicFile";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/ui/alert-dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Spinner } from "@repo/ui/components/ui/spinner";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: PublicFile | null;
  onDeleted?: () => void;
}

export const DeleteDialog = ({
  open,
  onOpenChange,
  file,
  onDeleted,
}: DeleteDialogProps) => {
  const { isDeleting, handleDelete } = useFileDelete({
    onOpenChange,
    file,
    onDeleted,
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-lg dark:bg-card/60 backdrop-blur-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your file
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {file && (
          <div className="py-4">
            <div className="rounded-lg border bg-muted/60 p-4 space-y-2">
              <p className="font-medium">{file.name}</p>
              <div className="flex  justify-between">
                <p className="text-xs text-muted-foreground">
                  Type: {file.type.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Size: {file.size}
                </p>
              </div>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || !file}
          >
            {isDeleting ? (
              <>
                <Spinner className="size-4" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
