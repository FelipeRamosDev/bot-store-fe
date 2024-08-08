import "./FitSpinner.scss";
import Spinner from '@/components/load/spinner/Spinner';

export default function FitSpinner({ spinner, noBackground = false }) {
   const style = {};
   let message;

   if (typeof spinner === 'string') {
      message = spinner;
   }

   if (noBackground) {
      style.background = 'none';
      style.backgroundColor = 'none';
   }

   return <div className="fit-spinner" style={style}>
      <Spinner color="tertiary-dark" message={message} />
   </div>;
}

