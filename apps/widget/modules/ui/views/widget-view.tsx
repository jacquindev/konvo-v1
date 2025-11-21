"use client";

import { screenAtom } from "@/modules/lib/atoms";
import { WidgetScreen } from "@/modules/lib/types";
import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";

interface WidgetViewProps {
  organizationId: string | null;
}

export const WidgetView = ({ organizationId }: WidgetViewProps) => {
  const screen = useAtomValue(screenAtom);

  const renderScreenComponent = (screen: WidgetScreen) => {
    switch (screen) {
      case "auth":
        return <WidgetAuthScreen />;
      case "chat":
        return <WidgetChatScreen />;
      case "contact":
        return <p>TODO: Contact</p>;
      case "error":
        return <WidgetErrorScreen />;
      case "inbox":
        return <p>TODO: Inbox</p>;
      case "loading":
        return <WidgetLoadingScreen organizationId={organizationId} />;
      case "selection":
        return <WidgetSelectionScreen />;
      case "voice":
        return <p>TODO: Voice</p>;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen flex size-full flex-col overflow-hidden rounded-xl border shadow-md bg-background">
      {renderScreenComponent(screen)}
    </main>
  );
};
