import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/lib/atoms";
import { api } from "@repo/backend/_generated/api";
import type { Id } from "@repo/backend/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";

export const useInboxScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationaId = useSetAtom(conversationIdAtom);

  const onBack = () => {
    setScreen("selection");
  };

  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const conversations = usePaginatedQuery(
    api.public.conversations.getMany,
    contactSessionId ? { contactSessionId } : "skip",
    { initialNumItems: 5 }
  );

  const onSelect = (id: Id<"conversations">) => {
    setConversationaId(id);
    setScreen("chat");
  };

  return {
    onBack,
    onSelect,
    conversations,
  };
};
