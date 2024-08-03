import "./FitSpinner.scss";
import Spinner from '@/components/load/spinner/Spinner';

export default function FitSpinner({ spinner }) {
   let message;

   if (typeof spinner === 'string') {
      message = spinner;
   } 

   return <div className="fit-spinner">
      <Spinner color="tertiary-dark" message={message} />
   </div>;
}

