import BotValueForm from "@/components/forms/botValueForm/BotValueForm";
import ContentModal from "../base/contentModal/ContentModal";

/**
 * BotValueModal is a modal component for editing or creating bot values.
 * It conditionally renders the form based on the value type (primitive or dynamic).
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.botValue - The bot value object to be edited or displayed.
 * @param {Object} props.parentRule - The parent rule object, if any.
 * @param {boolean} props.editMode - Whether the modal is in edit mode or not.
 * @param {string} props.initView - The initial view to render inside the modal (e.g., "create").
 * @param {Object} props.bot - The bot object associated with the value.
 * @param {boolean} props.open - Whether the modal is open or closed.
 * @param {Function} [props.setModal] - A function to close or toggle the modal state.
 * 
 * @returns {JSX.Element} The BotValueModal component.
 */
export default function BotValueModal({ botValue, parentRule, editMode, initView, bot, open, setModal = () => {} }) {
   const isOpen = Boolean(open);
   const { slug, valueType, parentThreads } = Object(open);
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
            parentThreads={parentThreads}
            editMode={editMode}
            editData={botValue}
            onSuccess={() => setModal(null)} />
      </ContentModal>
   );
}

