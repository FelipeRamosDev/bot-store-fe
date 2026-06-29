import Markdown from "@/components/common/Markdown/Markdown";
import Spinner from "@/components/load/spinner/Spinner";
import { parseCSS } from "@/helpers/parser";

export default function HistoryItem({ message }) {
   const isUser = message?.role === 'user';
   const userCSS = isUser ? 'user-message' : '';
   const shouldShowStatus = !isUser && message?.status && message?.status !== 'done';
   const hasContent = Boolean(message?.content?.trim?.());

   return (<>
      <div className={parseCSS('history-item', userCSS)}>
         {(hasContent || !shouldShowStatus) && (
            <Markdown
               value={message?.content || '_Empty message_'}
            />
         )}

         <small className="history-item-time">{new Date(message?.createdAt).toLocaleTimeString()}</small>
      </div>

      {shouldShowStatus && (
         <div className="history-item-status-container">
            <Spinner color="primary" />
            <small className={parseCSS('history-item-status', message?.status)}>{message?.statusLabel}</small>
         </div>
      )}
   </>);
}
