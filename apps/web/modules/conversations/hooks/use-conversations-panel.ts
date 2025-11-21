import { statusFilterAtom } from "@/lib/atoms";
import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import { api } from "@repo/backend/_generated/api";
import { Doc } from "@repo/backend/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";

export const useConversationsPanel = () => {
  const statusFilter = useAtomValue(statusFilterAtom);
  const setStatusFilter = useSetAtom(statusFilterAtom);

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    {
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    {
      initialNumItems: INITIAL_NUM_ITEMS,
    }
  );

  const onSelectStatus = (value: Doc<"conversations">["status"] | "all") => {
    setStatusFilter(value);
  };

  return {
    conversations,
    statusFilter,
    onSelectStatus,
  };
};
