import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useContext, useEffect, useRef, useState } from 'react';
import APIContext from '@/contexts/4HandsAPI';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthUserContext from '@/contexts/AuthUser';
import StripeElement from './StripeElement';
import { Alert, Skeleton } from '@mui/material';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import PlanCard from '../PlanCard/PlanCard';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SubscriptionCheckout({ selectedPlan, selectedPrice }) {
   const [clientSecret, setClientSecret] = useState(null);
   const [subscriptionId, setSubscriptionId] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [message, setMessage] = useState(null);
   const instance = useContext(APIContext);
   const { user } = useContext(AuthUserContext);
   const router = useRouter();
   const isInit = useRef(false);

   const searchParams = useSearchParams();
   const productId = searchParams.get('productId');
   const priceId = searchParams.get('priceId');
   const isUpdatePlan = searchParams.get('updatePlan') === 'true';

   const initCheckout = async () => {
      setLoading(true);
      setError(null);

      try {
         const initialized = await instance.ajax.authPost('/plans/stripe/create-subscription', {
            customerEmail: user.email,
            productId,
            priceId,
            overideActive: isUpdatePlan
         });

         if (initialized.isActive) {
            setMessage('You already have an active subscription for this plan. Redirecting to dashboard...');

            setTimeout(() => {
               router.push('/dashboard');
            }, 4000);

            return;
         }

         setSubscriptionId(initialized.subscriptionId);
         setClientSecret(initialized.clientSecret);
      } catch (err) {
         setError(err.message || 'An error occurred while initializing the subscription checkout.');
      } finally {
         setLoading(false);
      }
   };

   const onSuccess = async () => {
      if (!subscriptionId || !productId || !priceId) {
         setError('Subscription confirmed but no subscription details received.');
         return;
      }

      try {
         const confirmed = await instance.ajax.authPost('/plans/stripe/confirm-subscription', { subscriptionId, productId, priceId, overideActive: isUpdatePlan });
         
         if (!confirmed.success) {
            setError(confirmed.message || 'Subscription was successful but confirming it failed. Please contact support if you have been charged.');
            return;
         }

         router.push('/dashboard');
      } catch (error) {
         setError(error.message || 'Subscription was successful but confirming it failed. Please contact support if you have been charged.');
      }
   };

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
         /> : <></>}
         <>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            {(loading  || !clientSecret) && (
               <Skeleton variant="rectangular" width="100%" height={200} />
            )}

            {clientSecret && (
               <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeElement error={error} setError={setError} onSuccess={onSuccess} />
               </Elements>
            )}
         </>
      </ContentSidebar>
   );
}
