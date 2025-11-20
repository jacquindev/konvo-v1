import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
import { ZapIcon } from "lucide-react";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceHeader icon={ZapIcon} title="Integrations" description="" />

      {children}
    </>
  );
};

export default Layout;
