import APIContext from "@/contexts/4HandsAPI";
import { useContext, useEffect, useRef, useState } from "react";

export default function useSubscriptions({ isAdmin = false, customerId, preventLoad = false } = {}) {
   const [subscriptions, setSubscriptions] = useState([]);
   const [loading, setLoading] = useState(true);
   const instance = useContext(APIContext);
   const query = useRef();
   const fetchRoute = isAdmin ? '/stripe/subscriptions' : '/user/billing/subscriptions';

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
   }, [customerId, isAdmin, preventLoad]);

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

   return { subscriptions, loading, cancelSubscription };
}

