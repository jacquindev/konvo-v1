"use client";

import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/utils";
import { useConversationsPanel } from "@/modules/conversations/hooks/use-conversations-panel";
import { ConversationStatusIcon } from "@repo/ui/components/custom/conversation-status-icon";
import { DicebearAvatar } from "@repo/ui/components/custom/dicebear-avatar";
import { InfiniteScrollTrigger } from "@repo/ui/components/custom/infinite-scroll-trigger";
import { Label } from "@repo/ui/components/ui/label";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";
import { cn } from "@repo/ui/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
  ListIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const conversationsFilteredItems = [
  { value: "all", icon: ListIcon, label: "All" },
  { value: "unresolved", icon: ArrowRightIcon, label: "Unresolved" },
  { value: "escalated", icon: ArrowUpIcon, label: "Escalated" },
  { value: "resolved", icon: CheckIcon, label: "Resolved" },
];

export const ConversationsPanel = () => {
  const pathname = usePathname();

  const { conversations, statusFilter, onSelectStatus } =
    useConversationsPanel();

  const {
    topElementRef,
    canLoadMore,
    onLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: INITIAL_NUM_ITEMS,
  });

  return (
    <div className="flex flex-col w-full h-screen bg-sidebar text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b px-2 py-4">
        <Label className="text-lg">Conversations</Label>
        <Select
          defaultValue="all"
          onValueChange={onSelectStatus}
          value={statusFilter}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Filter Conversations"
              className="truncate"
            />
          </SelectTrigger>
          <SelectContent>
            {conversationsFilteredItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <div className="flex items-center gap-3">
                  <item.icon className="shrink-0 size-4" />
                  <span>{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoadingFirstPage ? (
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
          <div className="relative flex w-full min-w-0 flex-col p-2">
            <div className="w-full space-y-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg p-4"
                >
                  <Skeleton className="size-10 shrink-0 rounded-full" />
                  <div className="min-w-0 flex-1">
                    <div className="flex w-full items-center gap-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="ml-auto h-3 w-12 shrink-0" />
                    </div>
                    <div className="mt-2">
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="max-h-[calc(100vh-53px)]">
          <div className="flex flex-1 flex-col w-full">
            {conversations.results.map((conversation) => {
              const isActive = pathname === `conversations/${conversation._id}`;

              const isLastMessageFromOperator =
                conversation.lastMessage?.message?.role !== "user";

              const userCountry = getCountryFromTimezone(
                conversation.contactSession.metadata?.timezone
              );

              const userCountryFlag = userCountry?.code
                ? getCountryFlagUrl(userCountry.code)
                : undefined;

              return (
                <Link
                  key={conversation._id}
                  href={`/conversations/${conversation._id}`}
                  className={cn(
                    "group relative flex cursor-pointer items-start gap-3 border-b p-3 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
                    !!isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-[3px] rounded-r-full bg-primary opacity-0 transition-opacity",
                      isActive && "opacity-100"
                    )}
                  />
                  <DicebearAvatar
                    seed={conversation.contactSession._id}
                    badgeImageUrl={userCountryFlag}
                    size={40}
                  />
                  <div className="flex-1">
                    <div className="flex w-full items-center gap-2">
                      <span className="font-medium truncate text-sm">
                        {conversation.contactSession.name}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground shrink-0">
                        {formatDistanceToNowStrict(
                          new Date(conversation._creationTime),
                          { addSuffix: true }
                        )}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="flex w-0 grow items-center gap-1">
                        {isLastMessageFromOperator && (
                          <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "line-clamp-1 text-muted-foreground text-sm",
                            !isLastMessageFromOperator &&
                              "font-semibold text-foreground"
                          )}
                        >
                          {conversation.lastMessage?.text}
                        </span>
                      </div>
                      <ConversationStatusIcon
                        status={conversation.status}
                        className={cn(
                          "group-hover:opacity-100 size-6",
                          isActive ? "opacity-100" : "opacity-70"
                        )}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}

            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              ref={topElementRef}
              onLoadMore={onLoadMore}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
