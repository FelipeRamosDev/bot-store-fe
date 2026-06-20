import { useEffect, useRef } from "react";
import { useChatContext } from "./ChatBase";
import HistoryItem from "./HistoryItem";

export default function ChatHistory() {
   const { history } = useChatContext();
   const historyRef = useRef(null);

   useEffect(() => {
      if (!historyRef.current) {
         return;
      }

      historyRef.current.scrollTop = historyRef.current.scrollHeight;
   }, [history]);

   return (
      <div ref={historyRef} className="chat-history">
         {history.map(message => (
            <HistoryItem key={message.id} message={message} />
         ))}
      </div>
   );
}
