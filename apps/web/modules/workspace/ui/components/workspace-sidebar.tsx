"use client";

import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { WORKSPACE_SIDEBAR_ITEMS } from "../../lib/constants";

export const WorkspaceSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <Sidebar collapsible="icon" className="group border-none" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox: "w-full! h-8!",
                    avatarBox: "size-8! rounded!",
                    organizationSwitcherTrigger:
                      "w-full! justify-start! group-data-[collapsible=icon]:size-8! hover:bg-transparent!",
                    organizationPreview:
                      "group-data-[collapsible=icon]:justify-center! gap-2!",
                    organizationPreviewTextContainer:
                      "group-data-[collapsible=icon]:hidden! text-xs! font-semibold! text-sidebar-foreground!",
                    organizationSwitcherTriggerIcon:
                      "group-data-[collapsible=icon]:hidden! ml-auto! text-muted-foreground!",
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {WORKSPACE_SIDEBAR_ITEMS.map((item, index) => (
          <SidebarGroup key={index}>
            {item.label !== null && (
              <SidebarGroupLabel className="text-zinc-400 dark:text-zinc-500">
                {item.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = pathname.startsWith(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className={cn(
                          "text-zinc-700 dark:text-zinc-300 hover:text-foreground hover:scale-102 hover:shadow-sm transition-all duration-300",
                          isActive &&
                            "bg-linear-to-b from-primary/80 to-accent/30 shadow-sm drop-shadow-sm"
                        )}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={cn(
                              "size-4 shrink-0",
                              isActive &&
                                "dark:text-purple-300 text-purple-700 text-shadow-purple-400"
                            )}
                          />
                          <span
                            className={cn(
                              isActive &&
                                "dark:text-purple-300 text-purple-700 text-shadow-purple-400"
                            )}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="group-data-[collapsible=icon]:rounded-full"
            >
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "w-full! h-8!",
                    userButtonTrigger:
                      "w-full! group-data-[collapsible=icon]:size-8!",
                    userButtonOuterIdentifier:
                      "pl-0! group-data-[collapsible=icon]:hidden! size-8!",
                    avatarBox: "size-8!",
                  },
                }}
              />
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium leading-tight">
                  {user?.fullName}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
