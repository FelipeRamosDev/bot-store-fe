import './BotValuesModal.scss';
import BotValueForm from "@/components/forms/botValueForm/BotValueForm";
import ContentModal from "../base/contentModal/ContentModal";

export default function BotValueModal({ bot, open, setModal = () => {} }) {
   const isOpen = Boolean(open);
   const { slug, valueType } = Object(open);
   let size = 'medium';
   let type = 'Dynamic Value';

   if (valueType === 'primitive') {
      size = 'small';
      type = 'Primitive Value';
   }

   return (
      <ContentModal
         className="bot-value-modal"
         title={type}
         open={isOpen}
         padding="s"
         size={size}
         onClose={() => setModal(null)}
      >
         <BotValueForm slug={slug} valueType={valueType} bot={bot} onSuccess={() => setModal(null)} />
      </ContentModal>
   );
}

