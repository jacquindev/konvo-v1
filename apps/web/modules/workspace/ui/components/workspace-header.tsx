import { cn } from "@repo/ui/lib/utils";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface WorkspaceHeaderProps {
  icon?: LucideIcon | string;
  iconClassName?: string;
  title: string;
  description: string;
}

export const WorkspaceHeader = ({
  icon: Icon,
  iconClassName,
  title,
  description,
}: WorkspaceHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center pb-8 pt-4 w-full animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed wrap-break-word">
          {description}
        </p>
      </div>

      {Icon && (
        <div className="relative size-12 shrink-0 flex items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-primary/80 dark:to-primary/60 drop-shadow-sm shadow-md">
          {typeof Icon === "string" ? (
            <Image
              src={Icon}
              alt="plugin"
              width={40}
              height={40}
              className={cn("size-full object-cover rounded-lg", iconClassName)}
            />
          ) : (
            <Icon
              className={cn(
                "size-7 dark:text-purple-300 text-purple-700 text-shadow-purple-400",
                iconClassName
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};
