import { ConversationLayout } from "@/modules/conversations/ui/layouts/conversation-layout";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return <ConversationLayout>{children}</ConversationLayout>;
};

export default Layout;
