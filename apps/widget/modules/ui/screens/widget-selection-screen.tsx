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

const SelectableItem = ({
  icon: Icon,
  title,
  onClick,
  disabled,
}: {
  icon: React.ElementType;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <Item
    variant="muted"
    onClick={disabled ? undefined : onClick}
    className={cn(
      "border border-border hover:bg-secondary/60 cursor-pointer hover:scale-102 transition-all duration-300",
      disabled && "cursor-not-allowed opacity-50"
    )}
  >
    <ItemMedia variant="icon">
      <Icon />
    </ItemMedia>

    <ItemContent>
      <ItemTitle>{title}</ItemTitle>
    </ItemContent>

    <ItemActions>
      <ChevronRightIcon className="text-muted-foreground size-4 shrink-0" />
    </ItemActions>
  </Item>
);

export const WidgetSelectionScreen = () => {
  const {
    setScreen,
    handleNewConversation,
    isCreating,
    widgetSettings,
    hasVapiSecrets,
  } = useSelectionScreen();

  const items = [
    {
      id: "chat",
      title: "Start Chat",
      icon: MessageSquareTextIcon,
      onClick: handleNewConversation,
      showWhen: () => true,
    },
    {
      id: "voice",
      title: "Start Voice Call",
      icon: MicIcon,
      onClick: () => setScreen("voice"),
      showWhen: () =>
        hasVapiSecrets && !!widgetSettings?.vapiSettings?.assistantId,
    },
    {
      id: "phone",
      title: "Call Us",
      icon: PhoneIcon,
      onClick: () => {},
      showWhen: () =>
        hasVapiSecrets && !!widgetSettings?.vapiSettings?.phoneNumber,
    },
  ];

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 font-semibold text-white">
          <p className="text-3xl">Hi there 👋</p>
          <p className="text-lg">Let&apos;s get started!</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto overflow-x-hidden">
        {items
          .filter((item) => item.showWhen())
          .map((item) => (
            <SelectableItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              onClick={item.onClick}
              disabled={isCreating}
            />
          ))}
      </div>

      <WidgetFooter />
    </>
  );
};
