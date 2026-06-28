'use client';

import Card from "@/components/common/card/Card";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { createContext, useContext, useState } from "react";
import { parseCSS } from "@/helpers/parser";
import { ChatRounded } from "@mui/icons-material";
import { Fab } from "@mui/material";

export const ChatContext = createContext();

export function useChatContext() {
   return useContext(ChatContext);
}

export default function ChatBase({
   history = [],
   onSubmit,
   onOpen,
   headerTitle,
   headerIcon,
   floatButtonLabel,
   newHistoryItem,
   elevation = 30
}) {
   const [open, setOpen] = useState(false);
   const openCSS = open && 'open';

   const handleOpen = async () => {
      if (onOpen) await onOpen();
      setOpen(true);
   }

   return (
      <ChatContext.Provider value={{ open, setOpen, history, onSubmit, newHistoryItem }}>
         <Card className={parseCSS([ 'chat-base', openCSS ])} elevation={elevation}>
            <ChatHeader title={headerTitle} icon={headerIcon} />

            <div className="chat-content">
               <ChatHistory />
               <ChatInput />
            </div>
         </Card>

         <Fab
            className={parseCSS([ 'chat-toggle-button', openCSS ])}
            variant={floatButtonLabel ? 'extended' : 'circular'}
            onClick={handleOpen}
         >
            <ChatRounded className="chat-toggle-icon" /> {floatButtonLabel}
         </Fab>
      </ChatContext.Provider>
   );
}
