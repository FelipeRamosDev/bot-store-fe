import Spinner from '@/components/load/spinner/Spinner';
import Modal from '@mui/material/Modal';

export default function PageSpinner({ spinner }) {
   let message;

   if (typeof spinner === 'string') {
      message = spinner;
   } 

   return <Modal open={spinner}>
      <>
         <Spinner color="tertiary-dark" message={message} />
      </>
   </Modal>;
}

