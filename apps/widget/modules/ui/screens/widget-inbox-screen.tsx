"use client";

import { useInboxScreen } from "@/modules/hooks/use-inbox-screen";
import { ConversationStatusIcon } from "@repo/ui/components/custom/conversation-status-icon";
import { InfiniteScrollTrigger } from "@repo/ui/components/custom/infinite-scroll-trigger";
import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";
import { cn } from "@repo/ui/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import { ArrowLeftIcon } from "lucide-react";
import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

export const WidgetInboxScreen = () => {
  const { onBack, onSelect, conversations } = useInboxScreen();

  const { topElementRef, canLoadMore, isLoadingMore, onLoadMore } =
    useInfiniteScroll({
      status: conversations.status,
      loadMore: conversations.loadMore,
      loadSize: 5,
      observerEnabled: false,
    });

  return (
    <>
      <WidgetHeader className="h-16">
        <div className="flex flex-row justify-between z-50">
          <div className="flex items-center gap-x-2">
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7 group"
              onClick={onBack}
            >
              <ArrowLeftIcon className="size-4 shrink-0 text-zinc-300 group-hover:text-foreground" />
            </Button>
            <Label className="text-white">Inbox</Label>
          </div>
          <div className="flex items-center gap-x-2">
            <ThemeToggle
              className="size-7 bg-transparent border-none"
              iconClassName="text-zinc-300 group-hover:text-foreground"
            />
          </div>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col gap-y-3 p-4 overflow-y-auto">
        {conversations?.results.length > 0 &&
          conversations?.results.map((conversation) => (
            <Button
              key={conversation._id}
              variant="outline"
              className={cn("h-20 w-full justify-between group")}
              onClick={() => onSelect(conversation._id)}
            >
              <div className="flex w-full flex-col gap-4 overflow-hidden text-start">
                <div className="flex w-full items-center justify-between gap-x-4">
                  <p className="text-muted-foreground text-xs font-medium">
                    Chat
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatDistanceToNowStrict(
                      new Date(conversation._creationTime),
                      { addSuffix: true }
                    )}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between gap-x-4">
                  <p className="truncate text-sm">
                    {conversation.lastMessage?.text}
                  </p>
                  <ConversationStatusIcon
                    status={conversation.status}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </div>
              </div>
            </Button>
          ))}

        <InfiniteScrollTrigger
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={onLoadMore}
          ref={topElementRef}
        />
      </div>

      <WidgetFooter />
    </>
  );
};
