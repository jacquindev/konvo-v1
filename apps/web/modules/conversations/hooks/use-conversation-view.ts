import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import {
  ConversationSchema,
  type ConversationSchemaValues,
} from "@/modules/conversations/schemas/conversation.schema";
import { useThreadMessages } from "@convex-dev/agent/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@repo/backend/_generated/api";
import type { Doc, Id } from "@repo/backend/_generated/dataModel";
import { useAction, useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useConversationView = (conversationId: Id<"conversations">) => {
  const conversation = useQuery(api.private.conversations.getOne, {
    conversationId,
  });

  const messages = useThreadMessages(
    api.private.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: INITIAL_NUM_ITEMS }
  );

  const form = useForm<ConversationSchemaValues>({
    resolver: zodResolver(ConversationSchema),
    defaultValues: { message: "" },
  });

  const createMessage = useMutation(api.private.messages.create);
  const onSubmit = async (values: ConversationSchemaValues) => {
    try {
      await createMessage({
        conversationId,
        prompt: values.message,
      });

      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Failed to create message";

      toast.error(errorMessage);
    }
  };

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const updateConversationStatus = useMutation(
    api.private.conversations.updateStatus
  );
  const onUpdateStatus = async () => {
    if (!conversation) return;

    setIsUpdatingStatus(true);

    let newStatus: Doc<"conversations">["status"];

    // Cycle through states: unresolved -> escalated -> resolved -> unresolved
    if (conversation.status === "unresolved") {
      newStatus = "escalated";
    } else if (conversation.status === "escalated") {
      newStatus = "resolved";
    } else {
      newStatus = "unresolved";
    }

    try {
      await updateConversationStatus({
        conversationId,
        status: newStatus,
      });
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Failed to update conversation status";
      toast.error(errorMessage);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const [isEnhancingResponse, setIsEnhancingResponse] = useState(false);
  const enhanceResponse = useAction(api.private.messages.enhanceResponse);
  const handleEnhanceResponse = async () => {
    setIsEnhancingResponse(true);
    const currentPrompt = form.getValues("message");

    try {
      const response = await enhanceResponse({ prompt: currentPrompt });
      form.setValue("message", response);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? error.message
          : "Failed to enhance response";
      toast.error(errorMessage);
    } finally {
      setIsEnhancingResponse(false);
    }
  };

  return {
    conversation,
    messages,
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    onUpdateStatus,
    isUpdatingStatus,
    handleEnhanceResponse,
    isEnhancingResponse,
  };
};
