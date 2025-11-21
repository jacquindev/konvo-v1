import { ConversationView } from "@/modules/conversations/ui/views/conversation-view";
import type { Id } from "@repo/backend/_generated/dataModel";

type Props = {
  params: Promise<{ conversationId: string }>;
};

const Page = async ({ params }: Props) => {
  const { conversationId } = await params;

  return (
    <ConversationView conversationId={conversationId as Id<"conversations">} />
  );
};

export default Page;
