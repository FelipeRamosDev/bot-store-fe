import ConfirmationDialog from '@/components/modals/confirmationDialog/ConfirmationDialog';
import APIContext from '@/contexts/4HandsAPI';
import { useContext } from 'react';

export default function DeleteSlotConfirmDialog({ slot = {}, open, setOpen }) {
   const API = useContext(APIContext);

   const handleConfirm = async () => {
      const deleted = await API.ajax.authDelete('/slots/delete', { slotUID: slot._id });

      if (deleted.error) {
         throw deleted;
      }

      window.location.reload();
   }

   return <ConfirmationDialog
      title="Delete Confirm"
      open={open}
      handleConfirm={handleConfirm}
      onClose={() => setOpen(false)}
      confirmLabel="DELETE"
   >
      <p style={{ marginBottom: 0 }}>Are you sure you want to delete the &quot;{slot.name}&quot; slot?</p>
      <p style={{ marginBottom: 0 }}>This action can NOT be undone.</p>
   </ConfirmationDialog>
}
