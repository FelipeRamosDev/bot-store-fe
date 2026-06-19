import ConfirmationDialog from '@/components/modals/dialogs/confirmationDialog/ConfirmationDialog';
import APIContext from '@/contexts/4HandsAPI';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

/**
 * A confirmation dialog for deleting a master account.
 *
 * @param {Object} props - The properties to customize the delete confirmation dialog.
 * @param {Object} [props.master={}] - The master account to be deleted. This should contain at least the `_id` and `name` properties.
 * @param {boolean} [props.open=false] - Controls whether the dialog is open or closed.
 * @param {function} [props.setOpen=() => {}] - Function to control the dialog's open state.
 *
 * @returns {React.Element} The rendered confirmation dialog for deleting a master account.
 */
export default function ArchiveMasterConfirmDialog({
   master = {},
   open = false,
   setOpen = () => {}
}) {
   const API = useContext(APIContext);
   const router = useRouter();

   /**
    * Handles the confirmation action to delete the master account.
    * Sends a delete request to the API and redirects to the dashboard if successful.
    * Throws an error if the API request fails.
    *
    * @async
    * @throws {Error} Throws an error if the delete request fails.
    */
   const handleConfirm = async () => {
      const archived = await API.ajax.authPost('/master-account/switch-state', { masterUID: master._id, newState: master.state === 'active' ? 'archived' : 'active' });

      if (archived.error) {
         throw archived;
      }

      router.push('/dashboard/master-accounts');
   }

   return (
      <ConfirmationDialog
         title={master.state === 'active' ? 'Archive confirm' : 'Activate confirm'}
         open={open}
         handleConfirm={handleConfirm}
         onClose={() => setOpen(false)}
         confirmLabel={master.state === 'active' ? 'ARCHIVE' : 'ACTIVATE'}
      >
         <p style={{ marginBottom: 0 }}>Are you sure you want to {master.state === 'active' ? 'ARCHIVE' : 'ACTIVATE'} the &quot;{master.name}&quot; account?</p>
      </ConfirmationDialog>
   );
}
