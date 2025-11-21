import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/lib/atoms";
import { INITIAL_NUM_ITEMS } from "@/modules/lib/constants";
import {
  WidgetChatSchema,
  type WidgetChatSchemaValues,
} from "@/modules/schemas/widget-chat.schema";
import { useThreadMessages } from "@convex-dev/agent/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@repo/backend/_generated/api";
import { useAction, useQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

export const useChatScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };

  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
      : "skip"
  );

  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversation?.threadId && contactSessionId
      ? {
          threadId: conversation.threadId,
          contactSessionId,
        }
      : "skip",
    { initialNumItems: INITIAL_NUM_ITEMS }
  );

  const form = useForm<WidgetChatSchemaValues>({
    resolver: zodResolver(WidgetChatSchema),
    defaultValues: { message: "" },
  });

  const createMessage = useAction(api.public.messages.create);

  const onSubmit = async (values: WidgetChatSchemaValues) => {
    if (!conversation || !contactSessionId) return;
    form.reset();

    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
      contactSessionId,
    });
  };

  return {
    conversation,
    messages,
    form,
    onBack,
    onSubmit,
  };
};
