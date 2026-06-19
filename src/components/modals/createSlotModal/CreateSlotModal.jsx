import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateSlotForm from '@/components/forms/createSlotForm/CreateSlotForm';

/**
 * A modal dialog for creating or editing a slot.
 *
 * @param {Object} props - The properties to customize the slot modal.
 * @param {boolean} [props.editMode=false] - Indicates if the modal is in edit mode.
 * @param {string} [props.title] - The title to display in the modal. If not provided, it defaults to 'Edit Slot' or 'Create Slot' based on `editMode`.
 * @param {boolean} [props.open=false] - Controls whether the modal is open or closed.
 * @param {function} [props.setOpen=() => {}] - Function to control the modal's open state.
 * @param {Object} [props.slot] - The slot data to pre-fill the form with when in edit mode.
 *
 * @returns {React.Element} The rendered modal for creating or editing a slot.
 */
export default function CreateSlotModal({
   editMode = false,
   title,
   open = false,
   setOpen = () => {},
   slot
}) {
   if (!title && editMode) {
      title = 'Edit Slot';
   }

   if (!title && !editMode) {
      title = 'Create Slot';
   }

   return (
      <ContentModal
         title={title}
         padding="m"
         size="x-large"
         open={open}
         onClose={() => setOpen(false)}
      >
         <CreateSlotForm
            editMode={editMode}
            slot={slot}
            onSuccess={() => setOpen(false)}
         />
      </ContentModal>
   );
}
