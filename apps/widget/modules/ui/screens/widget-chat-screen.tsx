"use client";

import { useChatScreen } from "@/modules/hooks/use-chat-screen";
import { toUIMessages } from "@convex-dev/agent";
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
import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Label } from "@repo/ui/components/ui/label";
import { cn } from "@repo/ui/lib/utils";
import { ArrowLeftIcon, MenuIcon, Wand2Icon } from "lucide-react";
import { WidgetHeader } from "../components/widget-header";

export const WidgetChatScreen = () => {
  const { conversation, messages, form, onBack, onSubmit } = useChatScreen();

  return (
    <>
      <WidgetHeader className="h-16">
        <div className="flex flex-row justify-between z-80">
          <div className="flex items-center gap-x-2">
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7 group"
              onClick={onBack}
            >
              <ArrowLeftIcon className="size-4 shrink-0 text-zinc-300 group-hover:text-foreground" />
            </Button>
            <Label className="text-white">Chat</Label>
          </div>
          <div className="flex items-center gap-x-2">
            <Button size="icon-sm" variant="ghost" className="size-7 group">
              <MenuIcon className="size-4 shrink-0 text-zinc-300 group-hover:text-foreground" />
            </Button>
            <ThemeToggle className="size-7 bg-transparent border-none text-zinc-300" />
          </div>
        </div>
      </WidgetHeader>
      <Conversation>
        <ConversationContent>
          {toUIMessages(messages.results ?? [])?.map((message) => {
            return (
              <Message
                key={message.id}
                from={message.role === "user" ? "user" : "assistant"}
              >
                <div className="flex gap-x-2">
                  {/* TODO: Add Avatar Component */}
                  <MessageContent
                    className={cn(
                      "group-[.is-assistant]:bg-card group-[.is-assistant]:px-4 group-[.is-assistant]:py-3 group-[.is-assistant]:rounded-lg group-[.is-assistant]:text-foreground group-[.is-assistant]:border group-[.is-assistant]:border-card"
                    )}
                  >
                    <MessageResponse>{message.text}</MessageResponse>
                  </MessageContent>
                </div>
              </Message>
            );
          })}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* TODO: Add suggestions */}
      <Form {...form}>
        <PromptInput
          onSubmit={() => form.handleSubmit(onSubmit)()}
          className="p-2"
        >
          <PromptInputBody>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex flex-1 w-full">
                  <FormControl>
                    <PromptInputTextarea
                      value={field.value}
                      onChange={field.onChange}
                      disabled={conversation?.status === "resolved"}
                      placeholder={
                        conversation?.status === "resolved"
                          ? "This conversation has been resolved."
                          : "Type a message..."
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton>
                <Wand2Icon size={16} />
                <span>Enhance</span>
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit
              type="submit"
              status="ready"
              disabled={conversation?.status === "resolved"}
            />
          </PromptInputFooter>
        </PromptInput>
      </Form>
    </>
  );
};
