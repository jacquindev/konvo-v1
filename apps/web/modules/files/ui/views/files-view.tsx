"use client";

import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import { useFilesView } from "@/modules/files/hooks/use-files-view";
import { InfiniteScrollTrigger } from "@repo/ui/components/custom/infinite-scroll-trigger";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";
import { cn } from "@repo/ui/lib/utils";
import {
  FileTextIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { DeleteDialog } from "../components/delete-dialog";
import { UploadDialog } from "../components/upload-dialog";

export const FilesView = () => {
  const {
    files,
    uploadDialogOpen,
    setUploadDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedFile,
    handleSelectFile,
    handleFileDeleted,
  } = useFilesView();

  const {
    topElementRef,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
    onLoadMore,
  } = useInfiniteScroll({
    status: files.status,
    loadMore: files.loadMore,
    loadSize: INITIAL_NUM_ITEMS,
  });

  return (
    <>
      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        file={selectedFile}
        onDeleted={handleFileDeleted}
      />
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-end border-b px-6 py-4">
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="hover:scale-102 transition-all duration-300"
          >
            <PlusIcon />
            <span>Add New</span>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {["Name", "Type", "Size", "Actions"].map((item) => (
                <TableHead
                  key={item}
                  className={cn(
                    "px-6 py-4 font-medium",
                    (item === "Size" || item === "Actions") && "text-right"
                  )}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              if (isLoadingFirstPage) {
                return (
                  <TableRow>
                    <TableCell
                      className="h-24 text-center text-muted-foreground text-lg"
                      colSpan={4}
                    >
                      Loading files...
                    </TableCell>
                  </TableRow>
                );
              }

              if (files.results.length === 0) {
                return (
                  <TableRow>
                    <TableCell
                      className="h-24 text-center text-muted-foreground text-lg"
                      colSpan={4}
                    >
                      No files found
                    </TableCell>
                  </TableRow>
                );
              }

              return files.results.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-3">
                      <FileTextIcon className="size-5 shrink-0 text-muted-foreground" />
                      {file.name}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-muted-foreground uppercase">
                    {file.type}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-right">
                    <Badge
                      variant="secondary"
                      className="uppercase text-muted-foreground"
                    >
                      {file.size}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontalIcon className="size-4 shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="dark:bg-card/60 backdrop-blur-lg"
                        align="end"
                      >
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleSelectFile(file)}
                        >
                          <TrashIcon className="size-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ));
            })()}
          </TableBody>
        </Table>

        {!isLoadingFirstPage && files.results.length > 0 && (
          <div className="border-t p-2 bg-background">
            <InfiniteScrollTrigger
              ref={topElementRef}
              onLoadMore={onLoadMore}
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
            />
          </div>
        )}
      </div>
    </>
  );
};
