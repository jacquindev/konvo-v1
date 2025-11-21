"use client";

import { INITIAL_NUM_ITEMS } from "@/lib/constants";
import { api } from "@repo/backend/_generated/api";
import { Button } from "@repo/ui/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import { usePaginatedQuery } from "convex/react";
import { ArrowUpRightIcon, PackageOpenIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: undefined },
    { initialNumItems: INITIAL_NUM_ITEMS }
  );

  if (conversations.results.length > 0) {
    router.push(`/conversations/${conversations.results[0]?._id}`);
  }

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

export default Page;
