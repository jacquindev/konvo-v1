import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  hasVapiSecretsAtom,
  organizationIdAtom,
  screenAtom,
  widgetSettingsAtom,
} from "@/modules/lib/atoms";
import { api } from "@repo/backend/_generated/api";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

export const useSelectionScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const hasVapiSecrets = useAtomValue(hasVapiSecretsAtom);

  const createConversation = useMutation(api.public.conversations.create);
  const [isCreating, setIsCreating] = useState(false);

  const handleNewConversation = async () => {
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Missing organization ID");
      return;
    }

    if (!contactSessionId) {
      setScreen("auth");
      return;
    }

    setIsCreating(true);
    try {
      const conversationId = await createConversation({
        contactSessionId,
        organizationId,
      });

      setConversationId(conversationId);
      setScreen("chat");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError || error instanceof Error
          ? error.message
          : "Failed to create new conversation";

      console.error(errorMessage);
      setScreen("auth");
    } finally {
      setIsCreating(false);
    }
  };

  return {
    setScreen,
    handleNewConversation,
    isCreating,
    widgetSettings,
    hasVapiSecrets,
  };
};
