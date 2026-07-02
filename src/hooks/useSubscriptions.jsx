import APIContext from "@/contexts/4HandsAPI";
import AuthUserContext from "@/contexts/AuthUser";
import Analytics from "@/helpers/analytics";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function useSubscriptions({ isAdmin = false, customerId, preventLoad = false, selectedPlan, selectedPrice } = {}) {
   const [subscriptions, setSubscriptions] = useState([]);
   const [clientSecret, setClientSecret] = useState(null);
   const [subscriptionId, setSubscriptionId] = useState(null);
   const [discountPercent, setDiscountPercent] = useState(null);
   const [message, setMessage] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const instance = useContext(APIContext);
   const query = useRef();
   const router = useRouter();
   const searchParams = useSearchParams();
   const fetchRoute = isAdmin ? '/stripe/subscriptions' : '/user/billing/subscriptions';
   const auth = useContext(AuthUserContext);
   const user = auth?.user;

   const productId = searchParams.get('productId');
   const priceId = searchParams.get('priceId');
   const isUpdatePlan = searchParams.get('updatePlan') === 'true';
   const couponCode = searchParams.get('couponCode');

   const planString = `${selectedPlan?.name} | ${selectedPrice?.interval} | ${couponCode ? `Coupon: ${couponCode}` : 'No coupon'}`;

   useEffect(() => {
      if (query.current || preventLoad) {
         return;
      }

      query.current = instance.ajax.authGet(fetchRoute, { status: 'all', customerId }).then(res => {
         setSubscriptions(res?.subscriptions || []);
      }).catch(err => {
         console.error('Error fetching Stripe subscriptions:', err);
         setSubscriptions([]);
      }).finally(() => {
         setLoading(false);
      });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [customerId, isAdmin, preventLoad]);

   async function initCheckout() {
      setLoading(true);
      setError(null);

      if (!user || !productId || !priceId) {
         setError('Missing required information to start subscription checkout.');
         setLoading(false);
         return;
      }

      try {
         const initialized = await instance.ajax.authPost('/plans/stripe/create-subscription', {
            customerEmail: user.email,
            productId,
            priceId,
            promotionCode: couponCode,
            overideActive: isUpdatePlan
         });

         if (initialized.isActive) {
            setMessage('You already have an active subscription for this plan. Redirecting to dashboard...');

            setTimeout(() => {
               router.push('/dashboard');
            }, 4000);

            return;
         }

         Analytics.trackSubscriptionStart({
            plan: planString,
            priceApplied: selectedPrice.price,
            promotionCode: couponCode
         });

         // Free coupon: no payment needed, confirm immediately
         if (initialized.requiresPayment === false) {
            const confirmed = await instance.ajax.authPost('/plans/stripe/confirm-subscription', {
               subscriptionId: initialized.subscriptionId,
               productId,
               priceId,
               promotionCode: couponCode,
               overideActive: isUpdatePlan
            });

            if (!confirmed.success) {
               setError(confirmed.message || 'Subscription confirmed but saving it failed. Please contact support.');
               return;
            }

            router.push('/dashboard');
            return;
         }

         setSubscriptionId(initialized.subscriptionId);
         setClientSecret(initialized.clientSecret);
         if (initialized.discountPercent != null) setDiscountPercent(initialized.discountPercent);
      } catch (err) {
         setError(err.message || 'An error occurred while initializing the subscription checkout.');
      } finally {
         setLoading(false);
      }
   };

   async function confirmSubscription() {
      if (!subscriptionId || !productId || !priceId) {
         setError('Subscription confirmed but no subscription details received.');
         return;
      }

      try {
         const confirmed = await instance.ajax.authPost('/plans/stripe/confirm-subscription', {
            subscriptionId,
            productId,
            priceId,
            promotionCode: couponCode,
            overideActive: isUpdatePlan
         });

         if (!confirmed.success) {
            setError(confirmed.message || 'Subscription was successful but confirming it failed. Please contact support if you have been charged.');
            return;
         }

         Analytics.trackSubscription({
            plan: planString,
            priceApplied: selectedPrice.price,
            promotionCode: couponCode
         });

         router.push('/dashboard');
      } catch (error) {
         setError(error.message || 'Subscription was successful but confirming it failed. Please contact support if you have been charged.');
      }
   };

   async function cancelSubscription() {
      try {
         const canceled = await instance.ajax.authPost('/user/billing/cancel-subscription');

         if (canceled.error) {
            throw canceled;
         }
      } catch (error) {
         throw error;
      }
   }

   async function enableAIUsage() {
      try {
         const enabled = await instance.ajax.authPost('/user/billing/enable-ai-usage');

         if (enabled.error) {
            throw enabled;
         }
      } catch (error) {
         throw error;
      }
   }

   return {
      subscriptions,
      discountPercent,
      message,
      loading,
      clientSecret,
      subscriptionId,
      error,
      setError,
      setMessage,
      setDiscountPercent,
      initCheckout,
      confirmSubscription,
      cancelSubscription,
      enableAIUsage
   };
}

