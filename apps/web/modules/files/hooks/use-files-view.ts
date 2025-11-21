import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import { api } from "@repo/backend/_generated/api";
import type { PublicFile } from "@repo/backend/lib/convertEntryToPublicFile";
import { usePaginatedQuery } from "convex/react";
import { useState } from "react";

export const useFilesView = () => {
  const files = usePaginatedQuery(
    api.private.files.list,
    {},
    { initialNumItems: INITIAL_NUM_ITEMS }
  );

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null);

  const handleSelectFile = (file: PublicFile) => {
    setSelectedFile(file);
    setDeleteDialogOpen(true);
  };

  const handleFileDeleted = () => {
    setSelectedFile(null);
  };

  return {
    files,
    uploadDialogOpen,
    setUploadDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedFile,
    handleSelectFile,
    handleFileDeleted,
  };
};
