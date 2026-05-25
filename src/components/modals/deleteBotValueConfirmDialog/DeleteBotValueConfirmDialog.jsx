import { useContext } from 'react';
import ConfirmationDialog from '@/components/modals/confirmationDialog/ConfirmationDialog';
import APIContext from '@/contexts/4HandsAPI';
import AuthUserContext from '@/contexts/AuthUser';

/**
 * A confirmation dialog component for deleting a bot value.
 * Displays a modal asking the user to confirm the deletion of a bot value.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.botValue - The bot value to be deleted.
 * @param {boolean} props.open - A flag indicating whether the dialog is open.
 * @param {Function} props.setOpen - A function to control the open state of the dialog.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function DeleteBotValueConfirmDialog({
   botValue = {},
   open = false,
   setOpen = () => {}
}) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUserContext);

   /**
    * Handles the confirmation of the delete action.
    * Sends a request to delete the bot value and handles errors.
    *
    * @async
    * @throws {Error} Throws an error if the delete request fails.
    */
   const handleConfirm = async () => {
      const deleted = await API.ajax.authDelete('/bot/delete-value', {
         userUID: user._id,
         valueUID: botValue._id,
         botUID: botValue.parentBot
      });

      if (deleted.error) {
         throw deleted;
      }
   }

   return (
      <ConfirmationDialog
         title="Delete Confirm"
         open={open}
         handleConfirm={handleConfirm}
         onClose={() => setOpen(false)}
         confirmLabel="DELETE"
      >
         <p style={{ marginBottom: 0 }}>Are you sure you want to delete the bot value?</p>
         <p style={{ marginBottom: 0 }}>This action can NOT be undone.</p>
      </ConfirmationDialog>
   );
}
