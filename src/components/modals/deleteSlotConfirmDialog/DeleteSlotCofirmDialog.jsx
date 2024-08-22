import ConfirmationDialog from '@/components/modals/confirmationDialog/ConfirmationDialog';
import APIContext from '@/contexts/4HandsAPI';
import { useContext } from 'react';

/**
 * A confirmation dialog for deleting a slot.
 *
 * @param {Object} props - The properties to customize the delete confirmation dialog.
 * @param {Object} [props.slot={}] - The slot to be deleted. This should contain at least the `_id` and `name` properties.
 * @param {boolean} [props.open=false] - Controls whether the dialog is open or closed.
 * @param {function} [props.setOpen=() => {}] - Function to control the dialog's open state.
 *
 * @returns {React.Element} The rendered confirmation dialog for deleting a slot.
 */
export default function DeleteSlotConfirmDialog({
   slot = {},
   open = false,
   setOpen = () => {}
}) {
   const API = useContext(APIContext);

   /**
    * Handles the confirmation action to delete the slot.
    * Sends a delete request to the API and reloads the page if successful.
    * Throws an error if the API request fails.
    *
    * @async
    * @throws {Error} Throws an error if the delete request fails.
    */
   const handleConfirm = async () => {
      const deleted = await API.ajax.authDelete('/slots/delete', { slotUID: slot._id });

      if (deleted.error) {
         throw deleted;
      }

      window.location.reload();
   }

   return (
      <ConfirmationDialog
         title="Delete Confirm"
         open={open}
         handleConfirm={handleConfirm}
         onClose={() => setOpen(false)}
         confirmLabel="DELETE"
      >
         <p style={{ marginBottom: 0 }}>Are you sure you want to delete the &quot;{slot.name}&quot; slot?</p>
         <p style={{ marginBottom: 0 }}>This action can NOT be undone.</p>
      </ConfirmationDialog>
   );
}
