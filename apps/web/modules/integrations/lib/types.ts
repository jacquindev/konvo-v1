export type Integration = {
  id: IntegrationId;
  title: string;
  icon: string;
};

export type IntegrationId = "html" | "javascript" | "nextjs" | "react";
