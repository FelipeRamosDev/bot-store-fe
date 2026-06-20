import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { Chat, Close } from "@mui/icons-material";
import { useChatContext } from "./ChatBase";

export default function ChatHeader({ title, icon = <Chat /> }) {
   const { setOpen } = useChatContext();

   return (
      <div className="chat-header">
         {icon}

         <h2 className="chat-header-title">{title}</h2>
         <RoundIconButton className="chat-header-close-button" Icon={Close} onClick={() => setOpen(false)} />
      </div>
   );
}
