import CreateBotForm from "@/components/forms/createBot/CreateBot";
import ContentModal from "../base/contentModal/ContentModal";

/**
 * CreateBotModal is a modal component for creating a new bot.
 * It wraps the `CreateBotForm` component inside a modal layout.
 *
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines whether the modal is open.
 * @param {Function} props.setModal - Function to control the modal state (open/close).
 * 
 * @returns {JSX.Element} The CreateBotModal component.
 */
export default function CreateBotModal({ open, setModal }) {
   return (
      <ContentModal
         title="Create Bot"
         open={open}
         padding="s"
         size="small"
         onClose={() => setModal(false)}
      >
         <CreateBotForm />
      </ContentModal>
   );
}
