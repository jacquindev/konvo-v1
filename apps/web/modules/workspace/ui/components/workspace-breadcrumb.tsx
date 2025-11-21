"use client";

import { ThemeToggle } from "@repo/ui/components/theme/toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { Separator } from "@repo/ui/components/ui/separator";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import { WORKSPACE_BREADCRUMB_MAP } from "../../lib/constants";
import { formatSegment } from "../../lib/utils";

export const WorkspaceBreadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label =
      index === 0 && WORKSPACE_BREADCRUMB_MAP[seg]
        ? WORKSPACE_BREADCRUMB_MAP[seg]
        : formatSegment(seg);

    return { href, label };
  });

  return (
    <header className="flex bg-sidebar justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b shadow-xs">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((item, i) => (
              <React.Fragment key={i}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    className={cn(
                      i < crumbs.length - 1
                        ? "text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i < crumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 px-4">
        <ThemeToggle
          className="text-muted-foreground hover:text-foreground"
          variant="ghost"
          size="icon-sm"
        />
      </div>
    </header>
  );
};
