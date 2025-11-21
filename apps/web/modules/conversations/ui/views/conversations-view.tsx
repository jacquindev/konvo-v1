"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import { ArrowUpRightIcon, PackageOpenIcon } from "lucide-react";
import Link from "next/link";

export const ConversationsView = () => {
  return (
    <div className="flex flex-col flex-1 w-full h-screen items-center justify-center p-12">
      <Empty className="from-muted/50 to-background bg-linear-to-b from-30% rounded-2xl w-full">
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
        <EmptyContent>
          <EmptyTitle>No Conversations Yet</EmptyTitle>
          <EmptyDescription>
            You don&apos;t have any conversations yet. Get started by talking to
            a customer!
          </EmptyDescription>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <Link href="#">
            Learn More <ArrowUpRightIcon />
          </Link>
        </Button>
      </Empty>
    </div>
  );
};
