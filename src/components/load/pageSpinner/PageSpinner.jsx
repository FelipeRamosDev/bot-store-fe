import Spinner from '@/components/load/spinner/Spinner';
import Modal from '@mui/material/Modal';

/**
 * PageSpinner component displays a modal spinner.
 *
 * This component uses a modal to display a spinner, typically used to indicate loading or processing
 * states on the entire page. The spinner's message is customizable via the `spinner` prop if provided as a string.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|boolean} [props.spinner] - If a string, it's used as the message displayed with the spinner. If boolean, it controls the modal's open state.
 *
 * @example
 * return (
 *   <PageSpinner spinner="Loading data, please wait..." />
 * );
 *
 * @returns {JSX.Element} A modal containing a spinner with an optional message.
 */
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

