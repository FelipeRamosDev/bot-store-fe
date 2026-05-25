import CreateBotForm from "@/components/forms/createBot/CreateBot";
import ContentModal from "../base/contentModal/ContentModal";
import { useRouter } from "next/navigation";

/**
 * CreateBotModal is a modal component for creating a new bot.
 * It wraps the `CreateBotForm` component inside a modal layout.
 *
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.bot - The current bot data
 * @param {boolean} props.open - Determines whether the modal is open.
 * @param {Function} props.setModal - Function to control the modal state (open/close).
 * 
 * @returns {JSX.Element} The CreateBotModal component.
 */
export default function CreateBotModal({ bot, open, setModal }) {
   const nav = useRouter();

   return (
      <ContentModal
         title="Create Bot"
         open={open}
         padding="s"
         size="small"
         onClose={() => setModal(false)}
      >
         <CreateBotForm
            editData={bot}
            onSuccess={(created) => {
               setModal(false);

               if (created?.index) {
                  nav.push(`/dashboard/bots/${created?.index}`);
               }
            }}
         />
      </ContentModal>
   );
}
