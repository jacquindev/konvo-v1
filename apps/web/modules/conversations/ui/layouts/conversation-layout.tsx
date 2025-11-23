import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";
import React from "react";
import { ContactPanel } from "../components/contact-panel";

export const ConversationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
      <ResizablePanel className="h-full" defaultSize={60}>
        <div className="flex flex-col flex-1 h-full">{children}</div>
      </ResizablePanel>
      <ResizableHandle className="hidden lg:block" />
      <ResizablePanel
        defaultSize={40}
        maxSize={40}
        collapsible
        className="hidden lg:block"
      >
        <ContactPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
