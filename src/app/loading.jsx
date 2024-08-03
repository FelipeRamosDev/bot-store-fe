import Spinner from '@/components/load/spinner/Spinner';

export default function LoadingPage({ message = 'Loading' }) {
   return <Spinner color="tertiary-dark" message={message} />;
}
