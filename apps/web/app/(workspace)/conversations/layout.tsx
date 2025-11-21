import { ConversationsLayout } from "@/modules/conversations/ui/layouts/conversations-layout";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return <ConversationsLayout>{children}</ConversationsLayout>;
};

export default Layout;
