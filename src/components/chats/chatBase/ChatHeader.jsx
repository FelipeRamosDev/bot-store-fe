import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { Chat, Close, OpenInNew, KeyboardTab, Minimize, Expand } from "@mui/icons-material";
import { useChatContext } from "./ChatBase";

export default function ChatHeader({ title, icon = <Chat />, isMobile }) {
   const { setOpen, chatType, setChatType, isMinimized, setIsMinimized } = useChatContext();

   const handleMobileTabClick = () => {
      if (!isMobile) {
         return;
      }

      setIsMinimized(prev => !prev);
   }

   const handleMinimizeClick = (e) => {
      e.stopPropagation();
      setIsMinimized(true);
   }

   const handleExpandClick = (e) => {
      e.stopPropagation();
      setIsMinimized(false);
   }

   return (
      <div className="chat-header" onClick={handleMobileTabClick}>
         {icon}
         <h2 className="chat-header-title">{title}</h2>

         {((chatType === 'floating' || isMobile) && !isMinimized) && (
            <RoundIconButton
               className="chat-header-button"
               Icon={Minimize}
               onClick={handleMinimizeClick}
            />
         )}
         {((chatType === 'floating' || isMobile) && isMinimized) && (
            <RoundIconButton
               className="chat-header-button"
               Icon={Expand}
               onClick={handleExpandClick}
            />
         )}

         {chatType === 'floating' && (
            <RoundIconButton
               className="chat-header-button"
               Icon={KeyboardTab}
               onClick={() => setChatType('sidebar')}
            />
         )}

         {chatType === 'sidebar' && (
            <RoundIconButton
               className="chat-header-button hide-mobile"
               Icon={OpenInNew}
               onClick={() => setChatType('floating')}
            />
         )}

         {chatType === 'sidebar' && (
            <RoundIconButton
               className="chat-header-button hide-mobile"
               Icon={Close}
               onClick={() => setOpen(false)}
            />
         )}
      </div>
   );
}
