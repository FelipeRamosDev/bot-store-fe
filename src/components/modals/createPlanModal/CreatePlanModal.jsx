import CreatePlanForm from "@/components/forms/createPlanForm/CreatePlanForm";
import ContentModal from "../base/contentModal/ContentModal";

export default function CreatePlanModal({ open, setModal = () => {} }) {
   const isOpen = Boolean(open);

   return (
      <ContentModal
         className="create-plan-modal"
         title="Create Plan"
         open={isOpen}
         padding="m"
         size="medium"
         onClose={() => setModal(null)}
      >
         <CreatePlanForm onSuccess={() => setModal(false)} />
      </ContentModal>
   );
}

