"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

export const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <ClerkPricingTable
        for="organization"
        appearance={{
          elements: {
            pricingTableCard:
              "border! border-card! rounded-lg! dark:border-border! shadow-sm! dark:shadow-sm!",
            pricingTableCardHeader: "bg-card! dark:bg-muted!",
            pricingTableCardBody: "bg-card! dark:bg-card!",
            pricingTableCardFooter: "bg-card! dark:bg-muted!",
            pricingTableCardFeatures: "bg-card! dark:bg-card!",
            pricingTableCardTitle: "text-lg!",
          },
        }}
      />
    </div>
  );
};
