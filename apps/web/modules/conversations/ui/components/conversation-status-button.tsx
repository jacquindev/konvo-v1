import type { Doc } from "@repo/backend/_generated/dataModel";
import { statusConfig } from "@repo/ui/components/custom/conversation-status-icon";
import { Hint } from "@repo/ui/components/custom/hint";
import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

interface ConversationStatusButtonProps {
  status: Doc<"conversations">["status"];
  onClick: () => void;
  disabled?: boolean;
}

export const ConversationStatusButton = ({
  status,
  onClick,
  disabled,
}: ConversationStatusButtonProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Hint text={config.text} align="end">
      <Button
        type="button"
        className={cn(
          "rounded-full text-white hover:opacity-80 transition-opacity duration-300 drop-shadow-sm",
          config.bgColor
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className="size-4 shrink-0 stroke-3" />
        <span className="capitalize">{status}</span>
      </Button>
    </Hint>
  );
};
