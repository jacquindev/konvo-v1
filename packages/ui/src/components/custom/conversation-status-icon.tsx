import { cn } from "@repo/ui/lib/utils";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

interface ConversationStatusIconProps {
  status: "unresolved" | "escalated" | "resolved";
  className?: string;
}

export const statusConfig = {
  resolved: {
    icon: CheckIcon,
    bgColor: "bg-linear-to-br from-green-500 to-green-900",
    text: "Mark as 'Unresolved'",
  },
  unresolved: {
    icon: ArrowRightIcon,
    bgColor: "bg-linear-to-br from-red-500 to-red-900",
    text: "Mark as 'Escalated'",
  },
  escalated: {
    icon: ArrowUpIcon,
    bgColor: "bg-linear-to-br from-amber-500 to-amber-900",
    text: "Mark as 'Resolved'",
  },
} as const;

export const ConversationStatusIcon = ({
  status,
  className,
}: ConversationStatusIconProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full p-1.5",
        config.bgColor,
        className
      )}
    >
      <Icon className="text-white shrink-0 stroke-3 size-4" />
    </div>
  );
};
