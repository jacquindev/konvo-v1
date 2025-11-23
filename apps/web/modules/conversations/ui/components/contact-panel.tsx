"use client";

import { getCountryFlagUrl } from "@/lib/utils";
import {
  type InfoSection,
  useContactPanel,
} from "@/modules/conversations/hooks/use-contact-panel";
import { DicebearAvatar } from "@repo/ui/components/custom/dicebear-avatar";
import { LoadingView } from "@repo/ui/components/custom/loading-view";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { Button } from "@repo/ui/components/ui/button";
import { ClockIcon, GlobeIcon, MailIcon, MonitorIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export const ContactPanel = () => {
  const { contactSession, countryInfo, userAgentInfo } = useContactPanel();

  const userInfoSections: InfoSection[] = useMemo(() => {
    if (!contactSession?.metadata) {
      return [];
    }

    return [
      {
        id: "device-info",
        icon: MonitorIcon,
        title: "Device Information",
        items: [
          {
            label: "Browser",
            value:
              userAgentInfo.browser +
              (userAgentInfo.browserVersion
                ? ` ${userAgentInfo.browserVersion}`
                : ""),
          },
          {
            label: "OS",
            value:
              userAgentInfo.os +
              (userAgentInfo.osVersion ? ` ${userAgentInfo.osVersion}` : ""),
          },
          {
            label: "Device",
            value:
              userAgentInfo.device +
              (userAgentInfo.deviceModel
                ? ` - ${userAgentInfo.deviceModel}`
                : ""),
            className: "capitalize",
          },
          {
            label: "Screen",
            value: contactSession?.metadata.screenResolution,
          },
          {
            label: "Viewport",
            value: contactSession?.metadata.viewportSize,
          },
          {
            label: "Cookies",
            value: contactSession?.metadata.cookieEnabled
              ? "Enabled"
              : "Disabled",
          },
        ],
      },
      {
        id: "location-info",
        icon: GlobeIcon,
        title: "Location & Language",
        items: [
          ...(countryInfo
            ? [
                {
                  label: "Country",
                  value: countryInfo.name,
                },
                {
                  label: "Language",
                  value: contactSession?.metadata.language,
                },
                {
                  label: "Timezone",
                  value: contactSession?.metadata.timezone,
                },
              ]
            : []),
        ],
      },
      {
        id: "section-details",
        title: "Section Details",
        icon: ClockIcon,
        items: [
          {
            label: "Session Start",
            value: contactSession?._creationTime
              ? new Date(contactSession._creationTime).toLocaleString()
              : "",
          },
        ],
      },
    ];
  }, [
    contactSession?._creationTime,
    contactSession?.metadata,
    countryInfo,
    userAgentInfo.browser,
    userAgentInfo.browserVersion,
    userAgentInfo.device,
    userAgentInfo.deviceModel,
    userAgentInfo.os,
    userAgentInfo.osVersion,
  ]);

  if (contactSession === null) {
    return null;
  }

  if (contactSession === undefined) {
    return <LoadingView />;
  }

  return (
    <div className="size-full flex flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex flex-col gap-y-4 p-4">
        <div className="flex items-center gap-4">
          <DicebearAvatar
            size={52}
            seed={contactSession._id}
            badgeImageUrl={
              countryInfo?.code
                ? getCountryFlagUrl(countryInfo.code)
                : undefined
            }
          />
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-x-2">
              <h4 className="font-medium line-clamp-1">
                {contactSession.name}
              </h4>
            </div>
            <p className="line-clamp-1 text-muted-foreground text-sm">
              {contactSession.email}
            </p>
          </div>
        </div>
        <Button asChild size="lg" className="w-full">
          <Link href={`mailto:${contactSession.email}`}>
            <MailIcon />
            Send Email
          </Link>
        </Button>
      </div>

      <div>
        {contactSession.metadata && (
          <Accordion
            className="w-full rounded-none border-y"
            type="single"
            collapsible
          >
            {userInfoSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="rounded-none outline-zone has-focus-visible:z-10 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
              >
                <AccordionTrigger className="w-full flex flex-1 items-start justify-between gap-4 rounded-none bg-sidebar-accent p-4 text-left font-medium outline-none transition-all hover:no-underline disabled:pointer-events-none disabled:opacity-50">
                  <div className="flex items-center gap-4">
                    <section.icon className="size-4 shrink-0" />
                    <span>{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <div className="space-y-2 text-sm">
                    {section.items.map((item) => (
                      <div
                        key={`${section.id}-${item.label}`}
                        className="flex justify-between"
                      >
                        <span className="text-muted-foreground">
                          {item.label}:
                        </span>
                        <span className={item.className}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
