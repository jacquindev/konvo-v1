import { api } from "@repo/backend/_generated/api";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";

export interface UseFileUploadProps {
  onOpenChange: (open: boolean) => void;
  onFileUploaded?: () => void;
}

export const useFileUpload = ({
  onOpenChange,
  onFileUploaded,
}: UseFileUploadProps) => {
  const addFile = useAction(api.private.files.addFile);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({ category: "", filename: "" });

  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      setUploadedFiles([file]);
      if (!uploadForm.filename) {
        setUploadForm((prev) => ({ ...prev, filename: file.name }));
      }
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setUploadedFiles([]);
    setUploadForm({ category: "", filename: "" });
  };

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      const blob = uploadedFiles[0];
      if (!blob) return;

      const filename = uploadForm.filename || blob.name;

      await addFile({
        filename,
        bytes: await blob.arrayBuffer(),
        mimeType: blob.type || "text/plain",
        category: uploadForm.category,
      });

      onFileUploaded?.();
      handleCancel();
    } catch (error) {
      const errorMessage =
        error instanceof Error || error instanceof ConvexError
          ? error.message
          : "Failed to upload file";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadedFiles,
    isUploading,
    uploadForm,
    setUploadForm,
    handleFileDrop,
    handleUpload,
    handleCancel,
  };
};
