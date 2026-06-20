import Markdown from "@/components/common/Markdown/Markdown";
import { parseCSS } from "@/helpers/parser";

export default function HistoryItem({ message }) {
   const isUser = message?.role === 'user';
   const userCSS = isUser ? 'user-message' : '';

   return (
      <div className={parseCSS('history-item', userCSS)}>
         <Markdown
            value={message?.content || '_Empty message_'}
         />

         <small className="history-item-time">{new Date(message?.createdAt).toLocaleTimeString()}</small>
      </div>
   );
}
