import { useContext } from 'react';
import ConfirmationDialog from '@/components/modals/confirmationDialog/ConfirmationDialog';
import APIContext from '@/contexts/4HandsAPI';
import { useRouter } from 'next/navigation';
import DBQueryContext from '@/contexts/DBQuery';

/**
 * DeleteBotConfirmDialog component displays a confirmation dialog for deleting a bot.
 * It triggers a deletion request and navigates the user to the dashboard upon successful deletion.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {boolean} [props.open=false] - Boolean indicating if the dialog is open.
 * @param {Function} [props.setOpen=() => {}] - Function to set the dialog open state.
 * 
 * @returns {JSX.Element} The DeleteBotConfirmDialog component.
 */
export default function DeleteBotConfirmDialog({ open = false, setOpen = () => {} }) {
   const API = useContext(APIContext);
   const { doc = {} } = useContext(DBQueryContext);
   const router = useRouter();

   const handleConfirm = async () => {
      try {
         const deleted = await API.ajax.authDelete('/bot/delete-bot', {
            botUID: doc._id
         });

         if (deleted.error) {
            throw deleted;
         }

         if (deleted.success) {
            router.push('/dashboard');
         }
      } catch (err) {
         throw err;
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
         <p style={{ marginBottom: 0 }}>{`Are you sure you want to delete the "${doc.name}" bot?`}</p>
         <p style={{ marginBottom: 0 }}>This action can NOT be undone.</p>
      </ConfirmationDialog>
   );
}
