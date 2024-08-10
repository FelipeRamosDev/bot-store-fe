import { useState } from 'react';
import AlertModal from '../alertModal/AlertModal';

export default function ConfirmationDialog({ children, handleConfirm = async () => {}, onClose = () => {}, ...props }) {
   const [ error, setError ] = useState(false);
   const [ loading, setLoading ] = useState(false);

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
      return <AlertModal isConfirmation={true} loading={loading} handleOk={handleOk} onClose={onClose} {...props}>
         {children}
      </AlertModal>;
   } else {
      return <AlertModal onClose={onClose} {...props}>
         <p>Error caught during the delete process.</p>
      </AlertModal>;
   }
}