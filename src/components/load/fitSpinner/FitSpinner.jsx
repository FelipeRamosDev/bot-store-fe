import Spinner from '@/components/load/spinner/Spinner';

/**
 * FitSpinner component displays a spinner with optional background customization and a message.
 *
 * This component is used to show a spinner with an optional message. It allows for customization
 * of the background style based on the `noBackground` prop. The spinner can display a message if
 * the `spinner` prop is provided as a string.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|React.ReactNode} [props.spinner] - Message or content to display with the spinner. Can be a string or React node.
 * @param {boolean} [props.noBackground=false] - Flag to remove the background of the spinner container.
 *
 * @example
 * return (
 *   <FitSpinner 
 *     spinner="Loading, please wait..." 
 *     noBackground={true} 
 *   />
 * );
 *
 * @returns {JSX.Element} A spinner component with optional message and background customization.
 */
export default function FitSpinner({ spinner, noBackground = false, style }) {
   const sx = { ...style };
   let message;

   if (typeof spinner === 'string') {
      message = spinner;
   }

   if (noBackground) {
      sx.background = 'none';
      sx.backgroundColor = 'none';
   }

   return <div className="fit-spinner" style={sx}>
      <Spinner color="tertiary-dark" message={message} />
   </div>;
}

