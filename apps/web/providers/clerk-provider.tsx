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
        variables: {
          colorPrimary: theme === "dark" ? "#a48fff" : "#6e56cf",
          colorPrimaryForeground: theme === "dark" ? "#0f0f1a" : "#ffffff",
          colorMuted: theme === "dark" ? "#222244" : "#f0f0fa",
          colorMutedForeground: theme === "dark" ? "#a0a0c0" : "#6c6c8a",
          colorBackground: theme === "dark" ? "#0f0f1a" : "#f5f5ff",
          colorForeground: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorBorder: theme === "dark" ? "#303052" : "#e0e0f0",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
