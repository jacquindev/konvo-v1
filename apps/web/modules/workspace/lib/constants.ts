import {
  AudioWaveformIcon,
  DollarSignIcon,
  HomeIcon,
  InboxIcon,
  LibraryBigIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";

export const WORKSPACE_SIDEBAR_ITEMS = [
  {
    label: null,
    items: [{ title: "Dashboard", icon: HomeIcon, url: "/dashboard" }],
  },
  {
    label: "Customer Support",
    items: [
      { title: "Conversations", icon: InboxIcon, url: "/conversations" },
      { title: "Knowledge Base", icon: LibraryBigIcon, url: "/knowledge-base" },
    ],
  },
  {
    label: "Configuration",
    items: [
      {
        title: "Widget Customization",
        icon: SparklesIcon,
        url: "/customization",
      },
      { title: "Integrations", icon: ZapIcon, url: "/integrations" },
      {
        title: "Voice Assistant",
        icon: AudioWaveformIcon,
        url: "/plugins/vapi",
      },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Plans & Billing", icon: DollarSignIcon, url: "/billing" },
    ],
  },
];

export const WORKSPACE_BREADCRUMB_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  "knowledge-base": "Knowledge Base",
  customization: "Widget Customization",
  integrations: "Integrations",
  plugins: "Plugins",
  billing: "Plans & Billing",
};
