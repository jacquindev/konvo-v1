import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import React from "react";

interface InfiniteScrollTriggerProps {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
}

export const InfiniteScrollTrigger = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollTriggerProps
>(
  (
    {
      canLoadMore,
      isLoadingMore,
      onLoadMore,
      loadMoreText = "Load more",
      noMoreText = "No more items",
      className,
    },
    ref
  ) => {
    let text = loadMoreText;

    if (isLoadingMore) {
      text = "Loading...";
    } else if (!canLoadMore) {
      text = noMoreText;
    }

    return (
      <div
        className={cn("flex w-full justify-center py-2", className)}
        ref={ref}
      >
        <Button
          disabled={!canLoadMore || isLoadingMore}
          onClick={onLoadMore}
          size="sm"
          variant="ghost"
        >
          {text}
        </Button>
      </div>
    );
  }
);

InfiniteScrollTrigger.displayName = "InfiniteScrollTrigger";
