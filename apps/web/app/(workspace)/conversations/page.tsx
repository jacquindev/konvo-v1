"use client";

import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import { ConversationsView } from "@/modules/conversations/ui/views/conversations-view";
import { api } from "@repo/backend/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: undefined },
    { initialNumItems: INITIAL_NUM_ITEMS }
  );

  if (conversations.results.length > 0) {
    router.push(`/conversations/${conversations.results[0]?._id}`);
  }

  return <ConversationsView />;
};

export default Page;
