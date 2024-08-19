import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateSlotForm from '@/components/forms/createSlotForm/CreateSlotForm';

export default function CreateSlotModal({ editMode, title, open, setOpen = () => {}, slot }) {
   if (!title && editMode) {
      title = 'Edit Slot';
   }

   if (!title && !editMode) {
      title = 'Create Slot';
   }

   return <ContentModal
      title={title}
      padding="m"
      size="x-large"
      open={open}
      onClose={() => setOpen(false)}
   >
      <CreateSlotForm editMode={editMode} slot={slot} onSuccess={() => setOpen(false)} />
   </ContentModal>
}
