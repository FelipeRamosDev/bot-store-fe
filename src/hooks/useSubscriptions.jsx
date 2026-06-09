import APIContext from "@/contexts/4HandsAPI";
import { useContext, useEffect, useRef, useState } from "react";

export default function useSubscriptions(isAdmin = false, customerId) {
   const [subscriptions, setSubscriptions] = useState([]);
   const [loading, setLoading] = useState(true);
   const instance = useContext(APIContext);
   const query = useRef();
   const fetchRoute = isAdmin ? '/stripe/subscriptions' : '/user/billing/subscriptions';

   useEffect(() => {
      if (query.current) {
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
   }, [customerId, isAdmin]);

   return { subscriptions, loading };
}

