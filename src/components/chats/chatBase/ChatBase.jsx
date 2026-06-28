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
   className,
   history = [],
   onSubmit,
   onOpen,
   headerTitle,
   headerIcon,
   floatButtonLabel,
   newHistoryItem,
   elevation = 30,
   children
}) {
   const [open, setOpen] = useState(false);
   const openCSS = open && 'open';

   const handleOpen = async () => {
      if (onOpen) await onOpen();
      setOpen(prev => !prev);
   }

   return (
      <ChatContext.Provider value={{ className, open, setOpen, history, onSubmit, newHistoryItem }}>
         <div className={parseCSS([ 'chat-base-container', className, openCSS ])}>
            <div className="chat-page-content">
               {children}
            </div>

            {open && <div className="chat-base-sidebar">
               <div className="chat-base" elevation={elevation}>
                  <ChatHeader title={headerTitle} icon={headerIcon} />

                  <div className="chat-content">
                     <ChatHistory />
                     <ChatInput />
                  </div>
               </div>
            </div>}
         </div>

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
