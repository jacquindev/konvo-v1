"use client";

import { WidgetView } from "@/modules/ui/views/widget-view";
import { use } from "react";

type Props = {
  searchParams: Promise<{ organizationId: string }>;
};

export default function Home({ searchParams }: Props) {
  const { organizationId } = use(searchParams);

  return <WidgetView organizationId={organizationId} />;
}
