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
export default function ArchiveSlotConfirmDialog({
   slot = {},
   open = false,
   setOpen = () => {}
}) {
   const API = useContext(APIContext);
   const router = useRouter();

   const handleConfirm = async () => {
      const params = {
         slotUID: slot._id,
         newState: slot.state === 'active' ? 'archived' : 'active'
      };

      const archived = await API.ajax.authPost('/slots/switch-state', params);
      if (archived.error) {
         throw archived;
      }

      router.refresh();
   }

   return (
      <ConfirmationDialog
         title={slot.state === 'active' ? 'Archive Confirm' : 'Activate Confirm'}
         open={open}
         handleConfirm={handleConfirm}
         onClose={() => setOpen(false)}
         confirmLabel={slot.state === 'active' ? 'archive' : 'activate'}
      >
         <p style={{ marginBottom: 0 }}>
            Are you sure you want to {slot.state === 'active' ? 'ARCHIVE' : 'ACTIVATE'} the &quot;{slot.name}&quot; account?
         </p>
      </ConfirmationDialog>
   );
}
