import APIContext from "@/contexts/4HandsAPI";
import { useContext, useEffect, useRef, useState } from "react";

export default function usePlans() {
   const [plans, setPlans] = useState([]);
   const [loading, setLoading] = useState(true);
   const instance = useContext(APIContext);
   const query = useRef();

   useEffect(() => {
      if (query.current) {
         return;
      }

      query.current = instance.ajax.get('/plans/list-active').then(res => {
         setPlans(res);
      }).catch(err => {
         console.error("Error fetching plans:", err);
         setPlans([]);
      }).finally(() => {
         setLoading(false);
      });
   }, []);

   return { plans, setPlans, loading };
}
