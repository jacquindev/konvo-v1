"use client";

import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";

export const WidgetFooter = () => {
  const screen = "selection";

  return (
    <footer className="flex items-center justify-between border-t">
      <Button
        className="flex-1 h-14 rounded-none"
        variant="secondary"
        onClick={() => {}}
      >
        <HomeIcon
          fill="currentColor"
          fillOpacity={screen === "selection" ? 0.3 : 0}
          className={cn("size-5", screen === "selection" && "text-primary")}
        />
      </Button>
      <Button
        className="flex-1 h-14 rounded-none"
        variant="secondary"
        onClick={() => {}}
      >
        <InboxIcon
          fill="currentColor"
          fillOpacity={0}
          className={cn("size-5")}
        />
      </Button>
    </footer>
  );
};
