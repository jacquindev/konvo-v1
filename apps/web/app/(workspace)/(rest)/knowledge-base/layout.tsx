import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
import { LibraryBigIcon } from "lucide-react";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceHeader
        icon={LibraryBigIcon}
        title="Knowledge Base"
        description="Upload and manage documents for your AI assistants."
      />

      {children}
    </>
  );
};

export default Layout;
