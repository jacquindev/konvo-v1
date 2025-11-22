"use client";

import { useFileUpload } from "@/modules/files/hooks/use-file-upload";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@repo/ui/components/registry/dropzone";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Spinner } from "@repo/ui/components/ui/spinner";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUploaded?: () => void;
}

export const UploadDialog = ({
  open,
  onOpenChange,
  onFileUploaded,
}: UploadDialogProps) => {
  const {
    uploadedFiles,
    isUploading,
    uploadForm,
    setUploadForm,
    handleFileDrop,
    handleUpload,
    handleCancel,
  } = useFileUpload({ onOpenChange, onFileUploaded });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg dark:bg-card/60 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload Document</DialogTitle>
          <DialogDescription>
            Upload documents to enrich your knowledge base and enable fast,
            AI-powered search and retrieval.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <Input
                id="category"
                placeholder="e.g., Documentation, Support, Product"
                value={uploadForm.category}
                onChange={(e) =>
                  setUploadForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                required
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="filename">
                Filename{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Input
                id="filename"
                placeholder="Overwrite your default filename"
                value={uploadForm.filename}
                onChange={(e) =>
                  setUploadForm((prev) => ({
                    ...prev,
                    filename: e.target.value,
                  }))
                }
                required={false}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Upload File</FieldLabel>
              <Dropzone
                accept={{
                  "application/pdf": [".pdf"],
                  "text/csv": [".csv"],
                  "text/plain": [".txt"],
                }}
                disabled={isUploading}
                maxFiles={1}
                onDrop={handleFileDrop}
                src={uploadedFiles}
              >
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
            </Field>
          </FieldGroup>
        </div>

        <DialogFooter>
          <Field
            orientation="horizontal"
            className="flex flex-1 justify-between mt-4"
          >
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isUploading ||
                uploadedFiles.length === 0 ||
                !uploadForm.category
              }
              onClick={handleUpload}
            >
              {isUploading ? (
                <>
                  <Spinner className="size-4" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
