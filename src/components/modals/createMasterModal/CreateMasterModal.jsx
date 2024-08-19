import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateMasterForm from '@/components/forms/createMasterForm/CreateMasterForm';

export default function CreateMasterModal({ editMode, title, open, setOpen = () => {}, master }) {
   if (!title && editMode) {
      title = 'Edit Master';
   }

   if (!title && !editMode) {
      title = 'Create Master';
   }

   return <ContentModal
      title={title}
      padding="m"
      size="x-large"
      open={open}
      onClose={() => setOpen(false)}
   >
      <CreateMasterForm editMode={editMode} master={master} onSuccess={() => setOpen(false)} />
   </ContentModal>
}
