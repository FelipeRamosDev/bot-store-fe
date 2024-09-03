import CreateBotForm from "@/components/forms/createBot/CreateBot";
import ContentModal from "../base/contentModal/ContentModal";

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
