import Spinner from '@/components/load/spinner/Spinner';

/**
 * LoadingPage Component
 *
 * This component displays a loading spinner with an optional message.
 * It is typically used to indicate that content is being loaded.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {string} [props.message='Loading'] - The message to display alongside the spinner.
 *
 * @returns {JSX.Element} The rendered loading page with a spinner and message.
 */
export default function LoadingPage({ message = 'Loading' }) {
   return <Spinner color="tertiary-dark" message={message} />;
}
