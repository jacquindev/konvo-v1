import {
  Empty,
  EmptyContent,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import { Spinner } from "@repo/ui/components/ui/spinner";

export const LoadingView = () => {
  return (
    <Empty>
      <EmptyMedia variant="icon" className="size-12">
        <Spinner className="size-8 text-muted-foreground" />
      </EmptyMedia>
      <EmptyContent>
        <EmptyTitle className="text-muted-foreground animate-puls text-lg">
          Loading...
        </EmptyTitle>
      </EmptyContent>
    </Empty>
  );
};
