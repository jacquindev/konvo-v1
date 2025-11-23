"use client";

import { useVapi } from "@/modules/hooks/use-vapi";
import { screenAtom } from "@/modules/lib/atoms";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
} from "@repo/ui/components/ai-elements/message";
import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { cn } from "@repo/ui/lib/utils";
import { useSetAtom } from "jotai";
import { ArrowLeftIcon, MenuIcon, MicIcon, MicOffIcon } from "lucide-react";
import { WidgetHeader } from "../components/widget-header";

export const WidgetVoiceScreen = () => {
  const setScreen = useSetAtom(screenAtom);

  const {
    transcript,
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    endCall,
  } = useVapi();

  return (
    <>
      <WidgetHeader className="h-16">
        <div className="flex flex-row justify-between z-80">
          <div className="flex items-center gap-x-2">
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7 group"
              onClick={() => setScreen("selection")}
            >
              <ArrowLeftIcon className="size-4 shrink-0 text-zinc-300 group-hover:text-foreground" />
            </Button>
            <Label className="text-white">Voice Chat</Label>
          </div>
          <div className="flex items-center gap-x-2">
            <Button size="icon-sm" variant="ghost" className="size-7 group">
              <MenuIcon className="size-4 shrink-0 text-zinc-300 group-hover:text-foreground" />
            </Button>
            <ThemeToggle
              className="size-7 bg-transparent border-none"
              iconClassName="text-zinc-300 group-hover:text-foreground"
            />
          </div>
        </div>
      </WidgetHeader>

      {transcript.length > 0 ? (
        <Conversation className="h-full">
          <ConversationContent>
            {transcript.map((message, index) => (
              <Message
                key={`${message.role}-${index}-${message.text}`}
                from={message.role}
              >
                <MessageContent>{message.text}</MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center h-full gap-y-4">
          <div className="flex items-center justify-center rounded-full border bg-muted p-3 shadow-xs">
            <MicIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Transcript will appear here</p>
        </div>
      )}

      <div className="border-t bg-muted p-4 rounded-b-2xl overflow-hidden">
        <div className="flex flex-col items-center gap-y-4">
          {isConnected && (
            <div className="flex items-center gap-x-2">
              <div
                className={cn(
                  "size-4 rounded-full",
                  isSpeaking ? "animate-pulse bg-red-500" : "bg-green-500"
                )}
              />
              <span
                className={cn(
                  "text-muted-foreground text-sm",
                  isSpeaking && "animate-pulse"
                )}
              >
                {isSpeaking ? "Assistant Speaking..." : "Listening..."}
              </span>
            </div>
          )}
          <div className="flex w-full justify-center">
            {isConnected ? (
              <Button
                type="button"
                className="w-full"
                variant="destructive"
                size="lg"
                onClick={() => endCall()}
              >
                <MicOffIcon />
                End Call
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full"
                disabled={isConnecting}
                size="lg"
                onClick={() => startCall()}
              >
                <MicIcon />
                Start Call
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
