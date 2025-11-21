"use client";

import { cn } from "@repo/ui/lib/utils";

export const ConversationViewSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-background animate-pulse">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-sidebar p-2.5 shadow-xs">
        <div className="flex items-center gap-x-1">
          <div className="h-8 w-8 rounded-md bg-muted" />
          <div className="h-8 w-8 rounded-md bg-muted" />
        </div>

        <div className="h-8 w-24 rounded-md bg-muted" />
      </header>

      {/* Conversation container */}
      <div className="max-h-[calc(100vh-180px)] flex flex-col flex-1 gap-y-4 overflow-hidden p-4">
        {/* Top loading indicators (infinite scroll trigger area) */}
        <div className="flex justify-center">
          <div className="size-6 rounded-full bg-muted" />
        </div>

        {/* Several message bubbles */}
        <div className="space-y-6">
          <SkeletonMessage direction="left" />
          <SkeletonMessage direction="right" />
          <SkeletonMessage direction="left" />
          <SkeletonMessage direction="right" />
          <SkeletonMessage direction="left" />
          <SkeletonMessage direction="right" />
          <SkeletonMessage direction="left" />
          <SkeletonMessage direction="right" />
          <SkeletonMessage direction="left" />
          <SkeletonMessage direction="right" />
        </div>
      </div>

      {/* Footer input */}
      <div className="border-t p-2">
        <div className="rounded-lg border bg-card p-3 flex flex-col gap-y-3">
          <div className="h-16 w-full rounded-md bg-muted" />

          <div className="flex items-center justify-between">
            <div className="h-8 w-20 rounded-md bg-muted" />
            <div className="h-8 w-8 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonMessage = ({ direction }: { direction: "left" | "right" }) => {
  const isLeft = direction === "left";

  return (
    <div
      className={cn(
        "flex items-start gap-x-3",
        isLeft ? "justify-start" : "justify-end"
      )}
    >
      {/* Avatar */}
      {isLeft && <div className="h-10 w-10 rounded-full bg-muted" />}

      {/* Message bubble */}
      <div
        className={cn(
          "rounded-lg bg-muted",
          isLeft ? "rounded-tl-none" : "rounded-tr-none"
        )}
        style={{ width: `${Math.floor(Math.random() * 40) + 50}%`, height: 40 }}
      />

      {/* Avatar (assistant reversed view) */}
      {!isLeft && <div className="h-10 w-10 rounded-full bg-muted" />}
    </div>
  );
};
