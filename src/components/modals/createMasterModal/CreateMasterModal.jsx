import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateMasterForm from '@/components/forms/createMasterForm/CreateMasterForm';

/**
 * A modal component for creating or editing a master record.
 *
 * @param {Object} props - The properties to customize the modal.
 * @param {boolean} props.editMode - If true, the modal is in edit mode; otherwise, it's in create mode.
 * @param {string} [props.title] - The title to display in the modal. If not provided, defaults to 'Edit Master' or 'Create Master' based on `editMode`.
 * @param {boolean} props.open - Controls the open state of the modal.
 * @param {function} [props.setOpen=() => {}] - Callback function to set the open state of the modal.
 * @param {Object} [props.master] - The master object to edit. Required if `editMode` is true.
 *
 * @returns {React.Element} The rendered modal dialog with the `CreateMasterForm` inside.
 */
export default function CreateMasterModal({ editMode, title, open, setOpen = () => {}, master }) {
   // Determine the title based on editMode and provided title
   if (!title && editMode) {
      title = 'Edit Master';
   }

   if (!title && !editMode) {
      title = 'Create Master';
   }

   return (
      <ContentModal
         title={title}
         padding="m"
         size="x-large"
         open={open}
         onClose={() => setOpen(false)}
      >
         <CreateMasterForm editMode={editMode} master={master} onSuccess={() => setOpen(false)} />
      </ContentModal>
   );
}
