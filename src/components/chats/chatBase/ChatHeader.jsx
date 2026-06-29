import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { Chat, Close, OpenInNew, KeyboardTab, Minimize } from "@mui/icons-material";
import { useChatContext } from "./ChatBase";

export default function ChatHeader({ title, icon = <Chat /> }) {
   const { setOpen, chatType, setChatType } = useChatContext();

   return (
      <div className="chat-header">
         {icon}
         <h2 className="chat-header-title">{title}</h2>

         {chatType === 'floating' && (
            <RoundIconButton
               className="chat-header-button"
               Icon={Minimize}
               onClick={() => setOpen(false)}
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
               className="chat-header-button"
               Icon={OpenInNew}
               onClick={() => setChatType('floating')}
            />
         )}


         {chatType === 'sidebar' && (
            <RoundIconButton
               className="chat-header-button"
               Icon={Close}
               onClick={() => setOpen(false)}
            />
         )}
      </div>
   );
}
