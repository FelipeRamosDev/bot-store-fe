'use client';

import { useContext, useEffect, useRef, useState } from "react";
import PlanCard from "../../payment/PlanCard/PlanCard";
import APIContext from "@/contexts/4HandsAPI";
import AJAX from "4hands-api/client/services/AJAX";
import { useSearchParams } from "next/navigation";

export default function PlansGrid() {
   const query = useRef();
   const [plans, setPlans] = useState([]);
   const instance = useContext(APIContext);
   const params = useSearchParams();
   const productId = params.get("productId");
   const priceId = params.get("priceId");
   const selectedPlan = plans.find(plan => plan.productId === productId);
   const selectedPrice = selectedPlan?.prices.find(price => price.priceId === priceId);

   useEffect(() => {
      const ajax = new AJAX({ rejectUnauthorized: false }, instance);

      if (query.current) {
         return;
      }

      query.current = ajax.get('/plans/list-active').then(res => {
         setPlans(res);
      }).catch(err => {
         console.error("Error fetching plans:", err);
         setPlans([]);
      });
   }, []);

   return (
      <section className="plans-section">
         <div className="section-header container">
            <h2 className="section-title">Choose Your <span className="grad-txt">Plan</span></h2>
            <div className="gradient-divider"></div>
         </div>
      
         <div className="container">
            <div className="plans-container">
               {selectedPlan ? (
                  <PlanCard
                     key={selectedPlan.id}
                     productId={selectedPlan.productId}
                     title={selectedPlan.name}
                     prices={selectedPlan.prices}
                     summary={selectedPlan.summary}
                  />
               ) : plans.map(plan => (
                  <PlanCard
                     key={plan.id}
                     productId={plan.productId}
                     title={plan.name}
                     prices={plan.prices}
                     summary={plan.summary}
                  />
               ))}
            </div>
         </div>
      </section>
   );
}
