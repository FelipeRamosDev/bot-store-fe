import CreatePriceForm from "@/components/forms/createPriceForm/CreatePriceForm";
import ContentModal from "../base/contentModal/ContentModal";

export default function CreatePriceModal({ planUID, open, setModal = () => {} }) {
   const isOpen = Boolean(open);

   return (
      <ContentModal
         className="create-price-modal"
         title="Create Price"
         open={isOpen}
         padding="m"
         size="medium"
         onClose={() => setModal(null)}
      >
         <CreatePriceForm planUID={planUID} onSuccess={() => setModal(false)} />
      </ContentModal>
   );
}

