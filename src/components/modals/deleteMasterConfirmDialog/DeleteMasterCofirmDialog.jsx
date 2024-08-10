import ConfirmationDialog from '@/components/modals/confirmationDialog/ConfirmationDialog';
import APIContext from '@/contexts/4HandsAPI';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteMasterConfirmDialog({ master = {}, open, setOpen }) {
   const API = useContext(APIContext);
   const router = useRouter();

   const handleConfirm = async () => {
      const deleted = await API.ajax.authDelete('/master-account/delete', { masterUID: master._id });

      if (deleted.error) {
         throw deleted;
      }

      router.push('/dashboard');
   }

   return <ConfirmationDialog
      title="Delete Confirm"
      open={open}
      handleConfirm={handleConfirm}
      onClose={() => setOpen(false)}
      confirmLabel="DELETE"
   >
      <p style={{ marginBottom: 0 }}>Are you sure you want to delete the "{master.name}" account?</p>
      <p style={{ marginBottom: 0 }}>This action can NOT be undone.</p>
   </ConfirmationDialog>
}
