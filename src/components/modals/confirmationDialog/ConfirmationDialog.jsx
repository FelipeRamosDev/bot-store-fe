import { useState } from 'react';
import AlertModal from '../base/alertModal/AlertModal';

/**
 * A confirmation dialog component that prompts the user to confirm an action.
 *
 * @param {Object} props - The properties to customize the confirmation dialog.
 * @param {string} [props.confirmLabel='CONFIRM'] - The label for the confirmation button.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {function} [props.handleConfirm=async () => {}] - The callback function to execute when the user confirms the action. This should return a promise.
 * @param {function} [props.onClose=() => {}] - The callback function to execute when the modal is closed.
 * @param {...Object} [props] - Additional properties to pass to the `AlertModal` component.
 *
 * @returns {React.Element} The rendered confirmation dialog.
 */
export default function ConfirmationDialog({
   confirmLabel = 'CONFIRM',
   children,
   handleConfirm = async () => {},
   onClose = () => {},
   ...props
}) {
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);

   /**
    * Handles the confirmation action, showing loading state and handling errors.
    * 
    * @async
    * @function
    */
   const handleOk = async () => {
      setLoading(true);

      try {
         await handleConfirm();
      } catch (err) {
         setError(true);
      } finally {
         setLoading(false);
      }
   }

   if (!error) {
      return (
         <AlertModal
            confirmLabel={confirmLabel}
            isConfirmation={true}
            loading={loading}
            handleOk={handleOk}
            onClose={onClose}
            {...props}
         >
            {children}
         </AlertModal>
      );
   } else {
      return (
         <AlertModal
            onClose={onClose}
            {...props}
         >
            <p>Error caught during the confirmation process.</p>
         </AlertModal>
      );
   }
}
