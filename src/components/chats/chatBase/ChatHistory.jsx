import { useChatContext } from "./ChatBase";
import HistoryItem from "./HistoryItem";

export default function ChatHistory() {
   const { history } = useChatContext();

   return (
      <div className="chat-history">
         {history.map(message => (
            <HistoryItem key={message.id} message={message} />
         ))}
      </div>
   );
}
