"use client";

import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import { useConversationView } from "@/modules/conversations/hooks/use-conversation-view";
import { toUIMessages } from "@convex-dev/agent";
import type { Id } from "@repo/backend/_generated/dataModel";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@repo/ui/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@repo/ui/components/ai-elements/prompt-input";
import { DicebearAvatar } from "@repo/ui/components/custom/dicebear-avatar";
import { InfiniteScrollTrigger } from "@repo/ui/components/custom/infinite-scroll-trigger";
import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import { Button } from "@repo/ui/components/ui/button";
import { Form, FormField } from "@repo/ui/components/ui/form";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { useInfiniteScroll } from "@repo/ui/hooks/use-infinite-scroll";
import { cn } from "@repo/ui/lib/utils";
import { MoreHorizontalIcon, Wand2Icon } from "lucide-react";
import { ConversationStatusButton } from "../components/conversation-status-button";
import { ConversationViewSkeleton } from "../components/conversation-view-skeleton";

interface ConversationViewProps {
  conversationId: Id<"conversations">;
}

export const ConversationView = ({ conversationId }: ConversationViewProps) => {
  const {
    conversation,
    messages,
    form,
    onSubmit,
    isSubmitting,
    isValid,
    onUpdateStatus,
    isUpdatingStatus,
    handleEnhanceResponse,
    isEnhancingResponse,
  } = useConversationView(conversationId);

  const {
    topElementRef,
    canLoadMore,
    onLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: messages.status,
    loadMore: messages.loadMore,
    loadSize: INITIAL_NUM_ITEMS,
  });

  return conversation === undefined || isLoadingFirstPage ? (
    <ConversationViewSkeleton />
  ) : (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center justify-between border-b bg-sidebar p-2.5 shadow-xs">
        <div className="flex items-center gap-x-1">
          <Button size="icon-sm" variant="ghost">
            <MoreHorizontalIcon />
          </Button>
          <ThemeToggle size="icon-sm" variant="ghost" />
        </div>
        <ConversationStatusButton
          status={conversation.status}
          onClick={onUpdateStatus}
          disabled={isUpdatingStatus}
        />
      </header>

      <Conversation className="max-h-[calc(100vh-180px)]">
        <InfiniteScrollTrigger
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={onLoadMore}
          ref={topElementRef}
        />
        <ConversationContent>
          {toUIMessages(messages.results ?? [])?.map((message) => (
            <Message
              key={message.id}
              // In reverse (we are watching from "assistant" perspective)
              from={message.role === "user" ? "assistant" : "user"}
            >
              <div className="flex gap-x-2">
                {message.role === "user" && (
                  <DicebearAvatar
                    seed={conversation?.contactSession._id ?? "user"}
                    size={40}
                  />
                )}
                <MessageContent
                  className={cn(
                    "group-[.is-assistant]:bg-card group-[.is-assistant]:px-4 group-[.is-assistant]:py-3 group-[.is-assistant]:rounded-lg group-[.is-assistant]:text-foreground group-[.is-assistant]:border group-[.is-assistant]:border-card dark:group-[.is-assistant]:border-border"
                  )}
                >
                  <MessageResponse>{message.text}</MessageResponse>
                </MessageContent>
              </div>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="p-2">
        <Form {...form}>
          <PromptInput onSubmit={() => form.handleSubmit(onSubmit)()}>
            <PromptInputBody>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <PromptInputTextarea
                    value={field.value}
                    onChange={field.onChange}
                    disabled={
                      conversation?.status === "resolved" ||
                      isSubmitting ||
                      isEnhancingResponse
                    }
                    placeholder={
                      conversation?.status === "resolved"
                        ? "This conversation has been resolved"
                        : "Type your response as an operator..."
                    }
                  />
                )}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton
                  onClick={handleEnhanceResponse}
                  disabled={
                    conversation?.status === "resolved" ||
                    isEnhancingResponse ||
                    isSubmitting ||
                    !isValid
                  }
                  size="sm"
                >
                  {isEnhancingResponse ? (
                    <>
                      <Spinner className="size-4" />
                      <span>Enhancing...</span>
                    </>
                  ) : (
                    <>
                      <Wand2Icon size={16} className="shrink-0" />
                      <span>Enhance</span>
                    </>
                  )}
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit
                type="submit"
                disabled={
                  conversation?.status === "resolved" ||
                  isSubmitting ||
                  !isValid ||
                  isEnhancingResponse
                }
              />
            </PromptInputFooter>
          </PromptInput>
        </Form>
      </div>
    </div>
  );
};
