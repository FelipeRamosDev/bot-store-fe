'use client';

import { ChatBase } from '..';
import { Handyman } from '@mui/icons-material';
import useChat from '@/hooks/useChat';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import configs from '@/config.json';

export default function PilotBuilderChat({ type = 'create' }) {
   const { history, startChat, newHistoryItem, sendMessage } = useChat('strategy-assistant');
   const agentId = (type === 'create') ? 'pilot-builder' : 'pilot-editor';
   const query = useContext(DBQueryContext);

   const onOpen = async () => {
      const chatName = type === 'create' ? 'Pilot Builder Chat' : 'Pilot Editor Chat';
      let chatRes;

      try {
         if (type === 'edit' && query) {
            const { doc } = query;

            chatRes = await startChat(chatName, { pilot: doc }, {
               welcomeMessage: configs.chat.pilotEditorWelcome
            });
         } else if (type === 'create') {
            chatRes = await startChat(chatName, null, {
               welcomeMessage: configs.chat.pilotBuilderWelcome
            });
         }

         if (!chatRes || chatRes.error) {
            throw new Error(chatRes?.message || 'Failed to start chat');
         }

         if (chatRes.welcomeMessage) {
            newHistoryItem({
               messageId: `welcome-${Date.now()}`,
               role: 'assistant',
               content: chatRes.welcomeMessage,
            });
         }
      } catch (error) {
         console.error('Error starting chat:', error);
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
