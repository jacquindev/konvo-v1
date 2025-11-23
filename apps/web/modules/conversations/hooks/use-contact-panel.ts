import { getCountryFromTimezone } from "@/lib/utils";
import { api } from "@repo/backend/_generated/api";
import type { Id } from "@repo/backend/_generated/dataModel";
import Bowser from "bowser";
import { useQuery } from "convex/react";
import { LucideIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

type InfoItem = {
  label: string;
  value: string | React.ReactNode;
  className?: string;
};

export type InfoSection = {
  id: string;
  icon: LucideIcon;
  title: string;
  items: InfoItem[];
};

export const useContactPanel = () => {
  const { conversationId } = useParams<{
    conversationId: Id<"conversations">;
  }>();

  const contactSession = useQuery(
    api.private.contactSessions.getOneByConversationId,
    { conversationId }
  );

  const parseUserAgent = useMemo(() => {
    return (userAgent?: string) => {
      if (!userAgent) {
        return { browser: "Unknown", os: "Unknown", device: "Unknown" };
      }

      const browser = Bowser.getParser(userAgent);
      const result = browser.getResult();

      return {
        browser: result.browser.name || "Unknown",
        browserVersion: result.browser.version || "",
        os: result.os.name || "Unknown",
        osVersion: result.os.version || "",
        device: result.platform.type || "desktop",
        deviceVendor: result.platform.vendor || "",
        deviceModel: result.platform.model || "",
      };
    };
  }, []);

  const userAgentInfo = useMemo(
    () => parseUserAgent(contactSession?.metadata?.userAgent),
    [contactSession?.metadata?.userAgent, parseUserAgent]
  );

  const countryInfo = useMemo(() => {
    return getCountryFromTimezone(contactSession?.metadata?.timezone);
  }, [contactSession?.metadata?.timezone]);

  return {
    contactSession,
    countryInfo,
    userAgentInfo,
  };
};
