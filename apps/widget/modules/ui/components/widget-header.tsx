import { BackgroundGradientAnimation } from "@repo/ui/components/registry/background-gradient-animation";
import { cn } from "@repo/ui/lib/utils";
import React from "react";

export const WidgetHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <BackgroundGradientAnimation
      size="100%"
      containerClassName={cn(
        "max-h-[105px] overflow-hidden p-4 z-50 text-foreground",
        className
      )}
    >
      {children}
    </BackgroundGradientAnimation>
  );
};
