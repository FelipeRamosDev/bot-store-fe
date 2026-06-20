'use client';

import { Handyman } from "@mui/icons-material";
import { ChatBase } from "..";
import useChat from "@/hooks/useChat";

export default function PilotBuilderChat() {
   const { history, startChat, newHistoryItem, sendMessage } = useChat('main-chat');

   const onOpen = async () => await startChat('Pilot Builder Chat');
   const onSubmit = async ({ message }) => await sendMessage(message, 'pilot-builder', true);

   return (
      <ChatBase
         history={history}
         headerIcon={<Handyman />}
         headerTitle="Pilot Builder"
         onSubmit={onSubmit}
         onOpen={onOpen}
         newHistoryItem={newHistoryItem}
      />
   );
}
