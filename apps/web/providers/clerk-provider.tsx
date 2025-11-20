"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useResolvedTheme } from "@repo/ui/hooks/use-resolved-theme";
import React from "react";

export function ClerkClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useResolvedTheme();
  return (
    <ClerkProvider
      appearance={{
        theme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
