"use client";

import { useOrganization } from "@clerk/nextjs";
import React from "react";
import { AuthLayout } from "../layouts/auth-layout";
import { OrgSelectView } from "../views/org-select-view";

export const OrgGuard = ({ children }: { children: React.ReactNode }) => {
  const { organization } = useOrganization();

  if (!organization) {
    return (
      <AuthLayout>
        <OrgSelectView />
      </AuthLayout>
    );
  }

  return <>{children}</>;
};
