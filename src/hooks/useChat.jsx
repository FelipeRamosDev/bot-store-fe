'use client';

import ChatMessage from "@/components/chats/chatBase/models/ChatMessage";
import APIContext from "@/contexts/4HandsAPI";
import { useContext, useRef, useState } from "react";

export default function useChat(chatLabel) {
   const [history, setHistory] = useState([]);
   const [loading, setLoading] = useState(false);
   const [socket, setSocket] = useState(null);
   const [chatId, setChatId] = useState(null);
   const instance = useContext(APIContext);
   const messages = useRef(new Map());

   const newHistoryItem = (message, preventRerender = false) => {
      const { messageId, role, content } = message;

      if (messages.current.has(messageId)) {
         return;
      }

      const newMessage = new ChatMessage({
         id: messageId,
         role: role,
         content: content
      });

      messages.current.set(messageId, newMessage);
      {!preventRerender && setHistory(Array.from(messages.current.values()));}

      return newMessage;
   }

   const handleEditMessage = (messageId, chunk) => {
      const message = messages.current.get(messageId);

      if (message) {
         const updatedMessage = message.appendChunk(chunk);
         messages.current.set(messageId, updatedMessage);
      } else {
         const newMessage = newHistoryItem({
            messageId,
            role: 'assistant',
            content: chunk
         }, true);

         messages.current.set(messageId, newMessage);
      }

      setHistory(Array.from(messages.current.values()));
   }

   const connect = async () => {
      if (socket) {
         console.log('Already connected to chat socket');
         return socket;
      }

      return new Promise((resolve, reject) => {
         instance.createSocket({
            id: 'chat-socket',
            hostURL: instance.apiHost,
            port: 5050,
            routePath: '/chat',
            onConnect: function () {
               console.log('Connected to chat socket');

               this.listenTo('message_chunk', (data) => {
                  const { messageId, chunk } = data;

                  handleEditMessage(messageId, chunk);
               });

               this.listenTo('message_end', (data) => {
                  const { messageId, finalOutput } = data;
                  const chatMessage = messages.current.get(messageId);

                  if (chatMessage) {
                     chatMessage.content = finalOutput;
                     messages.current.set(messageId, chatMessage);
                  } else {
                     const newMessage = new ChatMessage({
                        id: messageId,
                        role: 'assistant',
                        content: finalOutput
                     });

                     messages.current.set(messageId, newMessage);
                  }

                  setHistory(Array.from(messages.current.values()));
               });

               setSocket(this);
               resolve(this);
            },
            onDisconnect: () => {
               console.log('Disconnected from chat socket');
               setSocket(null);
            },
            onError: (error) => {
               console.error('Error in chat socket:', error);
               reject(error);
            }
         });
      });
   }

   async function startChat(chatName) {
      setLoading(true);

      try {
         const connected = await connect();

         connected.sendTo('start-chat', { label: chatLabel, chatName }, (response) => {
            if (response.error) {
               throw new Error(response.error);
            }

            setChatId(response.chatId);
         });
      } catch (error) {
         throw new Error('Error starting ai chat: ' + error.message);
      } finally {
         setLoading(false);
      }
   }

   async function sendMessage(message, agentId, stream) {
      if (!socket) {
         throw new Error('Socket is not connected. Please start the chat first.');
      }


      socket.sendTo('message-in', { roomId: chatId, message, agentId, stream }, (response) => {
         if (response.error) {
            console.error('Error sending message:', response.error);
            return;
         }
      });
   }

   return { history, loading, connect, startChat, newHistoryItem, sendMessage };
}
