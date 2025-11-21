import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";
import React from "react";
import { ConversationsPanel } from "../components/conversations-panel";

export const ConversationsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full flex-1">
      <ResizablePanel defaultSize={30} maxSize={30} collapsible>
        <ConversationsPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};
