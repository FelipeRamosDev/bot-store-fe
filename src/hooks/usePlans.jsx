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

   async function create(data) {
      try {
         const created = await instance.ajax.authPut('/plans/create', data);

         if (created.error) {
            throw created;
         }

         if (created.success) {
            setPlans(prev => [...prev, created]);
            return created;
         }

         throw new Error('Unknown error when creating plan!');
      } catch (err) {
         console.error("Error creating plan:", err);
         throw err;
      }
   }

   async function update(planId, data) {
      try {
         const updated = await instance.ajax.authPost(`/plans/update`, { planId, data });

         setPlans(prevPlans => prevPlans.map(plan => plan.id === planId ? updated : plan));
         return updated;
      } catch (err) {
         console.error("Error updating plan:", err);
         throw err;
      }
   }

   return { plans, setPlans, loading, create, update };
}
