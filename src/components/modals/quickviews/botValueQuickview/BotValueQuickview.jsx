import BotValueSingle from "@/components/tiles/bot/botValueSingle/BotValueSingle";
import ContentModal from "../../base/contentModal/ContentModal";

export default function BotValueQuickview({ botValue, onClose = () => {} }) {

   return (
      <ContentModal
         className="bot-value-quickview"
         padding="s"
         hideHeader
         size="small"
         open={!!botValue}
         onClose={onClose}
      >
         <BotValueSingle botValue={botValue} />
      </ContentModal>
   );
}
