import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";
import React from "react";
import { WorkspaceSidebar } from "../components/workspace-sidebar";

export const WorkspaceLayout = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<typeof SidebarProvider>) => {
  return (
    <SidebarProvider {...props}>
      <WorkspaceSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};
