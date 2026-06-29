'use client';

import ChatMessage from "@/components/chats/chatBase/models/ChatMessage";
import APIContext from "@/contexts/4HandsAPI";
import AuthUserContext from "@/contexts/AuthUser";
import { useContext, useRef, useState } from "react";

export default function useChat(chatLabel) {
   const [history, setHistory] = useState([]);
   const [loading, setLoading] = useState(false);
   const [socket, setSocket] = useState(null);
   const [chatId, setChatId] = useState(null);
   const instance = useContext(APIContext);
   const auth = useContext(AuthUserContext);
   const startChatPromiseRef = useRef(null);
   const messages = useRef(new Map());
   const socketRef = useRef(null);
   const chatIdRef = useRef(null);

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
      if (!preventRerender) {
         setHistory(Array.from(messages.current.values()));
      }

      return newMessage;
   }

   const handleEditMessage = (messageId, chunk) => {
      const message = messages.current.get(messageId);

      if (message) {
         const updatedMessage = message.appendChunk(chunk).setStatus('writing', 'Writing response...');
         messages.current.set(messageId, updatedMessage);
      } else {
         const newMessage = newHistoryItem({
            messageId,
            role: 'assistant',
            content: chunk
         }, true);

         newMessage.setStatus('writing', 'Writing response...');
         messages.current.set(messageId, newMessage);
      }

      setHistory(Array.from(messages.current.values()));
   }

   const handleMessageStatus = (messageId, status, label) => {
      const message = messages.current.get(messageId);

      if (message) {
         message.setStatus(status, label);
         messages.current.set(messageId, message);
      } else {
         const newMessage = newHistoryItem({
            messageId,
            role: 'assistant',
            content: ''
         }, true);

         newMessage.setStatus(status, label);
         messages.current.set(messageId, newMessage);
      }

      setHistory(Array.from(messages.current.values()));
   }

   const connect = async () => {
      if (socketRef.current) {
         console.log('Already connected to chat socket');
         return socketRef.current;
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

               this.listenTo('message_status', (data) => {
                  const { messageId, status, label } = data;

                  handleMessageStatus(messageId, status, label);
               });

               this.listenTo('message_end', (data) => {
                  const { messageId, finalOutput } = data;
                  const chatMessage = messages.current.get(messageId);

                  if (chatMessage) {
                     chatMessage.content = finalOutput;
                     chatMessage.setStatus('done', 'Done');
                     messages.current.set(messageId, chatMessage);
                  } else {
                     const newMessage = new ChatMessage({
                        id: messageId,
                        role: 'assistant',
                        content: finalOutput
                     });

                     newMessage.setStatus('done', 'Done');

                     messages.current.set(messageId, newMessage);
                  }

                  setHistory(Array.from(messages.current.values()));
               });

               this.listenTo('message_error', (data) => {
                  const { roomId, error } = data;
                  const lastAssistantMessage = Array.from(messages.current.values())
                     .filter((message) => message.role === 'assistant')
                     .at(-1);

                  if (!lastAssistantMessage) {
                     return;
                  }

                  lastAssistantMessage.setStatus('error', error?.message || `Error in chat ${roomId}`);
                  messages.current.set(lastAssistantMessage.id, lastAssistantMessage);
                  setHistory(Array.from(messages.current.values()));
               });

               socketRef.current = this;
               setSocket(this);
               resolve(this);
            },
            onDisconnect: () => {
               console.log('Disconnected from chat socket');

               socketRef.current = null;
               chatIdRef.current = null;
               startChatPromiseRef.current = null;

               setSocket(null);
               setChatId(null);
            },
            onError: (error) => {
               console.error('Error in chat socket:', error);
               reject(error);
            }
         });
      });
   }

   async function startChat(chatName, context, options = { welcomeMessage: 'Welcome to CandlePilot! I am your assistant.' }) {
      if (chatIdRef.current) {
         return chatIdRef.current;
      }

      if (startChatPromiseRef.current) {
         return startChatPromiseRef.current;
      }

      setLoading(true);
      startChatPromiseRef.current = (async () => {
         try {
            const connected = await connect();

            return await new Promise((resolve, reject) => {
               const payload = {
                  userUID: auth?.user?._id,
                  label: chatLabel,
                  chatName,
                  context,
                  options
               };

               connected.sendTo('start-chat', payload, (response) => {
                  if (response.error) {
                     reject(new Error(response.error));
                     return;
                  }

                  chatIdRef.current = response.chatId;
                  setChatId(response.chatId);
                  resolve(response);
               });
            });
         } catch (error) {
            throw new Error('Error starting ai chat: ' + error.message);
         } finally {
            startChatPromiseRef.current = null;
            setLoading(false);
         }
      })();

      return startChatPromiseRef.current;
   }

   async function sendMessage(message, agentId, stream) {
      const activeSocket = socketRef.current;
      const activeChatId = chatIdRef.current;

      if (!activeSocket) {
         throw new Error('Socket is not connected. Please start the chat first.');
      }

      if (!activeChatId) {
         throw new Error('Chat is not initialized yet. Please wait for the chat to open.');
      }

      activeSocket.sendTo('message-in', { roomId: activeChatId, message, agentId, stream }, (response) => {
         if (response.error) {
            console.error('Error sending message:', response.error);
            return;
         }
      });
   }

   return { socket, chatId, history, loading, connect, startChat, newHistoryItem, sendMessage };
}
