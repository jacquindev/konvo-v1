"use client";

import { useSelectionScreen } from "@/modules/hooks/use-selection-screen";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import { cn } from "@repo/ui/lib/utils";
import {
  ChevronRightIcon,
  MessageSquareTextIcon,
  MicIcon,
  PhoneIcon,
} from "lucide-react";
import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

export const WidgetSelectionScreen = () => {
  const { handleNewConversation, isCreating } = useSelectionScreen();

  const selectItems = [
    {
      id: "start-chat",
      title: "Start Chat",
      icon: MessageSquareTextIcon,
      action: handleNewConversation,
      disabled: isCreating,
    },
    {
      id: "start-voice-call",
      title: "Start Voice Call",
      icon: MicIcon,
      action: () => {},
      disabled: false,
    },
    {
      id: "call-us",
      title: "Call Us",
      icon: PhoneIcon,
      action: () => {},
      disabled: false,
    },
  ];

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 font-semibold">
          <p className="text-3xl">Hi there 👋</p>
          <p className="text-lg">Let&apos;s get started!</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
        {selectItems.map((item) => (
          <Item
            key={item.id}
            variant="muted"
            className={cn(
              "border border-border hover:bg-secondary/60 cursor-pointer hover:scale-102 transition-all duration-300",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={item.action}
          >
            <ItemMedia variant="icon">
              <item.icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="text-muted-foreground size-4 shrink-0" />
            </ItemActions>
          </Item>
        ))}
      </div>

      <WidgetFooter />
    </>
  );
};
