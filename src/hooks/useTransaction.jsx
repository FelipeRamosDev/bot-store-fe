import APIContext from "@/contexts/4HandsAPI";
import { useContext, useEffect, useRef, useState } from "react";

export default function useTransaction(isAdmin = false) {
   const [transactions, setTransactions] = useState([]);
   const [loading, setLoading] = useState(true);
   const instance = useContext(APIContext);
   const query = useRef();

   const fetchURL = isAdmin ? '/stripe/transactions' : '/user/billing/transactions';

   useEffect(() => {
      if (query.current) {
         return;
      }

      query.current = instance.ajax.authGet(fetchURL).then(res => {
         setTransactions(res?.transactions || []);
      }).catch(err => {
         console.error('Error fetching Stripe transactions:', err);
         setTransactions([]);
      }).finally(() => {
         setLoading(false);
      });
   }, [instance]);

   return { transactions, loading };
}
