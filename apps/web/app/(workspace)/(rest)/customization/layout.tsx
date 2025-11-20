import { WorkspaceHeader } from "@/modules/workspace/ui/components/workspace-header";
import { SparklesIcon } from "lucide-react";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceHeader
        icon={SparklesIcon}
        title="Widget Customization"
        description="Customize how your chat widget looks and behaves for your customers."
      />

      {children}
    </>
  );
};

export default Layout;
