import Spinner from '@/components/load/spinner/Spinner';

export default function LoadingPage({ message = 'Loading' }) {
   return (
      <div className="loading-block">
         <div className="loading-item">
            <Spinner color="tertiary-dark" />
         </div>

         <p className="loading-item message">{message}</p>
      </div>
   );
}
