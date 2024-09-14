import './BotValuesModal.scss';
import BotValueForm from "@/components/forms/botValueForm/BotValueForm";
import ContentModal from "../base/contentModal/ContentModal";

export default function BotValueModal({ botValue, parentRule, editMode, initView, bot, open, setModal = () => {} }) {
   const isOpen = Boolean(open);
   const { slug, valueType, parentThread } = Object(open);
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
         <BotValueForm
            initView={initView}
            slug={slug}
            valueType={valueType}
            bot={bot}
            parentRule={parentRule}
            parentThread={parentThread}
            editMode={editMode}
            editData={botValue}
            onSuccess={() => setModal(null)} />
      </ContentModal>
   );
}

