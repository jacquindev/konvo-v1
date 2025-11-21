import { api } from "@repo/backend/_generated/api";
import type { PublicFile } from "@repo/backend/lib/convertEntryToPublicFile";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";

interface UseFileDelete {
  onOpenChange: (open: boolean) => void;
  file: PublicFile | null;
  onDeleted?: () => void;
}

export const useFileDelete = ({
  file,
  onOpenChange,
  onDeleted,
}: UseFileDelete) => {
  const deleteFile = useMutation(api.private.files.deleteFile);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!file) return;
    setIsDeleting(true);

    try {
      await deleteFile({ entryId: file.id });
      onDeleted?.();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error || error instanceof ConvexError
          ? error.message
          : "Failed to delete file";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
};
