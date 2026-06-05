'use client';

import { Skeleton } from "@mui/material";
import PlanCard from "../../payment/PlanCard/PlanCard";
import { forwardRef } from "react";
import { useSearchParams } from "next/navigation";
import usePlans from "@/hooks/usePlans";

const PlansGrid = forwardRef(function PlansGrid(_, ref) {
   const { plans, loading } = usePlans();
   const params = useSearchParams();
   const productId = params.get("productId");
   const priceId = params.get("priceId");
   const selectedPlan = plans.find(plan => plan.productId === productId);

   return (
      <section ref={ref} className="plans-section">
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
                     features={selectedPlan.features}
                  />
               ) : plans.map(plan => (
                  <PlanCard
                     key={plan.id}
                     productId={plan.productId}
                     title={plan.name}
                     prices={plan.prices}
                     summary={plan.summary}
                     features={plan.features}
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
});

export default PlansGrid;
