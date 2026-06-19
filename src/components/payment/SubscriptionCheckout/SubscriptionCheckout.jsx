import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useRef } from 'react';
import StripeElement from './StripeElement';
import { Alert, Skeleton } from '@mui/material';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import PlanCard from '../PlanCard/PlanCard';
import useSubscriptions from '@/hooks/useSubscriptions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SubscriptionCheckout({ selectedPlan, selectedPrice }) {
   const isInit = useRef(false);
   const {
      discountPercent,
      message,
      loading,
      clientSecret,
      error,
      setError,
      initCheckout,
      confirmSubscription
   } = useSubscriptions({ preventLoad: true, selectedPlan, selectedPrice });

   useEffect(() => {
      if (isInit.current) {
         return;
      }

      isInit.current = true;
      initCheckout();
   }, []);

   return (
      <ContentSidebar className="subscription-checkout">
         {selectedPlan && selectedPrice ? <PlanCard
            cardType="billing"
            productId={selectedPlan.id}
            title={selectedPlan.name}
            prices={selectedPlan.prices}
            summary={selectedPlan.summary}
            features={selectedPlan.features}
            selectedPrice={selectedPrice}
            discountPercent={discountPercent}
         /> : <></>}
         <>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            {(loading  || !clientSecret) && (
               <Skeleton variant="rectangular" width="100%" height={200} />
            )}

            {clientSecret && (
               <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeElement error={error} setError={setError} onSuccess={confirmSubscription} />
               </Elements>
            )}
         </>
      </ContentSidebar>
   );
}
