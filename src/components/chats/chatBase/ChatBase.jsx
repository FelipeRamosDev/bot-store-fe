'use client';

import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { parseCSS } from "@/helpers/parser";
import { ChatRounded } from "@mui/icons-material";
import { Fab } from "@mui/material";
import AuthUserContext from "@/contexts/AuthUser";
import EnableAIModal from "@/components/modals/enableAIModal/EnableAIModal";

export const ChatContext = createContext();
const CHAT_FLOATING_POSITION_KEY = 'chat-base-floating-position';
const CHAT_FLOATING_SIZE_KEY = 'chat-base-floating-size';
const DEFAULT_FLOATING_SIZE = { width: 400, height: 600 };
const MIN_FLOATING_WIDTH = 320;
const MIN_FLOATING_HEIGHT = 420;

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
   requireSubscription = false,
   initialChatType = 'sidebar',
   children
}) {
   const auth = useContext(AuthUserContext);
   const [open, setOpen] = useState(false);
   const [position, setPosition] = useState(null);
   const [size, setSize] = useState(null);
   const [isDragging, setIsDragging] = useState(false);
   const [isMobile, setIsMobile] = useState(true);
   const [chatType, setChatType] = useState(initialChatType);
   const [isMinimized, setIsMinimized] = useState(false);
   const [enableAIModalOpen, setEnableAIModalOpen] = useState(false);
   const dragRef = useRef(null);
   const chatBaseRef = useRef(null);
   const openCSS = open && 'open';
   const containerCSS = parseCSS(['chat-base-container'], [className, openCSS, chatType, isMinimized && 'minimized', isMobile && 'is-mobile']);
   const isFloating = containerCSS.split(' ').includes('floating');

   const clampPositionToViewport = (nextPosition) => {
      if (!nextPosition) {
         return null;
      }

      const chatElement = chatBaseRef.current;
      const width = size?.width ?? chatElement?.offsetWidth ?? DEFAULT_FLOATING_SIZE.width;
      const height = size?.height ?? chatElement?.offsetHeight ?? DEFAULT_FLOATING_SIZE.height;
      const maxX = Math.max(0, window.innerWidth - width);
      const maxY = Math.max(0, window.innerHeight - height);

      return {
         x: Math.min(Math.max(0, nextPosition.x), maxX),
         y: Math.min(Math.max(0, nextPosition.y), maxY),
      };
   };

   const clampSizeToViewport = (nextSize) => {
      if (!nextSize) {
         return null;
      }

      const maxWidth = Math.max(MIN_FLOATING_WIDTH, window.innerWidth);
      const maxHeight = Math.max(MIN_FLOATING_HEIGHT, window.innerHeight);

      return {
         width: Math.min(Math.max(MIN_FLOATING_WIDTH, nextSize.width), maxWidth),
         height: Math.min(Math.max(MIN_FLOATING_HEIGHT, nextSize.height), maxHeight),
      };
   };

   const handleOpen = async () => {
      const { user } = auth || {};

      try {
         if (requireSubscription && user && !user.aiUsageEnabled) {
            setEnableAIModalOpen(true);
            return;
         }

         if (onOpen) {
            await onOpen();
         }

         setOpen(prev => !prev);
      } catch (error) {
         throw error;
      }
   }

   const handleDragStart = (event) => {
      if (!open || !isFloating) {
         return;
      }

      if (event.pointerType === 'mouse' && event.button !== 0) {
         return;
      }

      if (!event.target.closest('.chat-header')) {
         return;
      }

      if (event.target.closest('.chat-header-button, button, [role="button"], a, input, textarea, select')) {
         return;
      }

      const chatElement = chatBaseRef.current;

      if (!chatElement) {
         return;
      }

      const rect = chatElement.getBoundingClientRect();

      dragRef.current = {
         pointerId: event.pointerId,
         offsetX: event.clientX - rect.left,
         offsetY: event.clientY - rect.top,
      };

      setIsDragging(true);
      chatElement.setPointerCapture(event.pointerId);
      event.preventDefault();
   };

   const handleDragMove = (event) => {
      if (!isDragging || !dragRef.current || dragRef.current.pointerId !== event.pointerId) {
         return;
      }

      const chatElement = chatBaseRef.current;

      if (!chatElement) {
         return;
      }

      const rect = chatElement.getBoundingClientRect();
      const maxX = Math.max(0, window.innerWidth - rect.width);
      const maxY = Math.max(0, window.innerHeight - rect.height);

      const nextX = Math.min(Math.max(0, event.clientX - dragRef.current.offsetX), maxX);
      const nextY = Math.min(Math.max(0, event.clientY - dragRef.current.offsetY), maxY);

      setPosition({ x: nextX, y: nextY });
   };

   const handleDragEnd = (event) => {
      if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) {
         return;
      }

      const chatElement = chatBaseRef.current;

      if (chatElement?.hasPointerCapture(event.pointerId)) {
         chatElement.releasePointerCapture(event.pointerId);
      }

      dragRef.current = null;
      setIsDragging(false);
   };

   useEffect(() => {
      if (open) {
         return;
      }

      dragRef.current = null;
      setIsDragging(false);
   }, [open]);

   useEffect(() => {
      if (!isFloating) {
         return;
      }

      try {
         const storedPosition = window.localStorage.getItem(CHAT_FLOATING_POSITION_KEY);
         const storedSize = window.localStorage.getItem(CHAT_FLOATING_SIZE_KEY);

         if (storedPosition) {
            const parsedPosition = JSON.parse(storedPosition);

            if (typeof parsedPosition?.x === 'number' && typeof parsedPosition?.y === 'number') {
               setPosition(parsedPosition);
            } else {
               window.localStorage.removeItem(CHAT_FLOATING_POSITION_KEY);
            }
         }

         if (storedSize) {
            const parsedSize = JSON.parse(storedSize);

            if (typeof parsedSize?.width === 'number' && typeof parsedSize?.height === 'number') {
               setSize(parsedSize);
            } else {
               window.localStorage.removeItem(CHAT_FLOATING_SIZE_KEY);
            }
         }
      } catch {
         window.localStorage.removeItem(CHAT_FLOATING_POSITION_KEY);
         window.localStorage.removeItem(CHAT_FLOATING_SIZE_KEY);
      }
   }, [isFloating]);

   useEffect(() => {
      if (!isFloating || !position) {
         return;
      }

      window.localStorage.setItem(CHAT_FLOATING_POSITION_KEY, JSON.stringify(position));
   }, [isFloating, position]);

   useEffect(() => {
      if (!isFloating || !size) {
         return;
      }

      window.localStorage.setItem(CHAT_FLOATING_SIZE_KEY, JSON.stringify(size));
   }, [isFloating, size]);

   useEffect(() => {
      if (!open || !isFloating) {
         return;
      }

      const chatElement = chatBaseRef.current;

      if (!chatElement) {
         return;
      }

      const observer = new ResizeObserver((entries) => {
         const entry = entries[0];

         if (!entry) {
            return;
         }

         const nextSize = clampSizeToViewport({
            width: Math.round(entry.contentRect.width),
            height: Math.round(entry.contentRect.height),
         });

         setSize((prev) => {
            if (prev?.width === nextSize.width && prev?.height === nextSize.height) {
               return prev;
            }

            return nextSize;
         });
      });

      observer.observe(chatElement);

      return () => {
         observer.disconnect();
      };
   }, [open, isFloating]);

   useEffect(() => {
      if (!open || !isFloating) {
         return;
      }

      const keepInViewport = () => {
         setSize((prev) => {
            if (!prev) {
               return prev;
            }

            const clamped = clampSizeToViewport(prev);

            if (clamped.width === prev.width && clamped.height === prev.height) {
               return prev;
            }

            return clamped;
         });

         setPosition((prev) => {
            if (!prev) {
               return prev;
            }

            const clamped = clampPositionToViewport(prev);

            if (clamped.x === prev.x && clamped.y === prev.y) {
               return prev;
            }

            return clamped;
         });
      };

      keepInViewport();
      window.addEventListener('resize', keepInViewport);

      return () => {
         window.removeEventListener('resize', keepInViewport);
      };
   }, [open, isFloating, position, size]);

   const floatingStyle = isFloating
      ? {
         ...(position
            ? {
               top: `${position.y}px`,
               left: `${position.x}px`,
               right: 'auto',
               bottom: 'auto',
            }
            : {}),
         ...(size
            ? {
               width: `${size.width}px`,
               height: `${size.height}px`,
            }
            : {}),
      }
      : undefined;


   const handleBackdropClick = (event) => {
      if (event.target === event.currentTarget) {
         setOpen(false);
      }
   };

   useLayoutEffect(() => {
      if (isMobile !== (window.innerWidth <= 768)) {
         setIsMobile(window.innerWidth <= 768);
      }
   }, [open]);

   useEffect(() => {
      const handleResize = () => {
         if (isMobile !== (window.innerWidth <= 768)) {
            setIsMobile(window.innerWidth <= 768);
         }
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [isMobile]);

   return (
      <ChatContext.Provider value={{
         className,
         open,
         setOpen,
         chatType,
         setChatType,
         isMinimized,
         setIsMinimized,
         history,
         onSubmit,
         newHistoryItem
      }}>
         <div className={containerCSS}>
            <div className="chat-page-content">
               {children}
            </div>

            {open && <div className="chat-base-sidebar" onClick={handleBackdropClick}>
               <div
                  className={parseCSS(['chat-base'], [isFloating && 'draggable', isFloating && 'resizable', isDragging && 'dragging'])}
                  ref={chatBaseRef}
                  onPointerDown={handleDragStart}
                  onPointerMove={handleDragMove}
                  onPointerUp={handleDragEnd}
                  onPointerCancel={handleDragEnd}
                  style={floatingStyle}
               >
                  <ChatHeader title={headerTitle} icon={headerIcon} isMobile={isMobile} />

                  <div className="chat-content">
                     <ChatHistory />
                     <ChatInput />
                  </div>
               </div>
            </div>}
         </div>

         <Fab
            className={parseCSS(['chat-toggle-button', openCSS])}
            variant={floatButtonLabel ? !isMobile ? 'extended' : 'circular' : 'circular'}
            onClick={handleOpen}
         >
            <ChatRounded className="chat-toggle-icon" /> {!isMobile && floatButtonLabel}
         </Fab>

         <EnableAIModal open={enableAIModalOpen} onClose={() => setEnableAIModalOpen(false)} />
      </ChatContext.Provider>
   );
}
