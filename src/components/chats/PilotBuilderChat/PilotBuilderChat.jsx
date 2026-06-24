'use client';

import { ChatBase } from '..';
import { Handyman } from '@mui/icons-material';
import useChat from '@/hooks/useChat';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';

export default function PilotBuilderChat({ type = 'create' }) {
   const { history, startChat, newHistoryItem, sendMessage } = useChat('strategy-assistant');
   const agentId = (type === 'create') ? 'pilot-builder' : 'pilot-editor';
   const query = useContext(DBQueryContext);

   const onOpen = async () => {
      const chatName = type === 'create' ? 'Pilot Builder Chat' : 'Pilot Editor Chat';

      if (type === 'edit' && query) {
         const { doc } = query;

         await startChat(chatName, { pilot: doc });
      } else if (type === 'create') {
         await startChat(chatName);
      }
   };

   const onSubmit = async ({ message }) => {
      await sendMessage(message, agentId, true);
   };

   return (
      <ChatBase
         history={history}
         headerIcon={<Handyman />}
         headerTitle={type === 'create' ? "Pilot Builder" : "Pilot Editor"}
         newHistoryItem={newHistoryItem}
         onSubmit={onSubmit}
         onOpen={onOpen}
      />
   );
}
