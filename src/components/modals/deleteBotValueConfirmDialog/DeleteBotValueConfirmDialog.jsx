import { useContext } from 'react';
import ConfirmationDialog from '@/components/modals/confirmationDialog/ConfirmationDialog';
import APIContext from '@/contexts/4HandsAPI';
import AuthUserContext from '@/contexts/AuthUser';

export default function DeleteBotValueConfirmDialog({
   botValue = {},
   open = false,
   setOpen = () => {}
}) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUserContext);

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
