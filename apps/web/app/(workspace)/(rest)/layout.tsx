import { WorkspaceBreadcrumb } from "@/modules/workspace/ui/components/workspace-breadcrumb";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <WorkspaceBreadcrumb />
      <main className="h-full flex flex-1 flex-col">
        <div className="flex flex-col p-8">
          <div className="mx-auto w-full max-w-3xl lg:max-w-5xl">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
