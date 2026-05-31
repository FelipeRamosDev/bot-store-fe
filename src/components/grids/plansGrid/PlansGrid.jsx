'use client';

import { Skeleton } from "@mui/material";
import PlanCard from "../../payment/PlanCard/PlanCard";
import { useSearchParams } from "next/navigation";

export default function PlansGrid({ plans = [], loading = false }) {
   const params = useSearchParams();
   const productId = params.get("productId");
   const priceId = params.get("priceId");
   const selectedPlan = plans.find(plan => plan.productId === productId);

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
                     priceId={priceId}
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

               {loading && (<>
                  <Skeleton className="plan-card" variant="rectangular" height={200} />
                  <Skeleton className="plan-card" variant="rectangular" height={200} />
                  <Skeleton className="plan-card" variant="rectangular" height={200} />
               </>)}
            </div>

         </div>
      </section>
   );
}
