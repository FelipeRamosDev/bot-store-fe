'use client';

import { Skeleton } from "@mui/material";
import PlanCard from "../../payment/PlanCard/PlanCard";
import { forwardRef, useContext } from "react";
import { useSearchParams } from "next/navigation";
import usePlans from "@/hooks/usePlans";
import AuthUserContext from "@/contexts/AuthUser";

const PlansGrid = forwardRef(function PlansGrid({ showCoupon = false, title = <>Choose a <span className="grad-txt">Plan</span></> }, ref) {
   const auth = useContext(AuthUserContext);
   const user = auth?.user;
   const { plans, loading } = usePlans();

   const params = useSearchParams();
   const productId = params.get("productId");
   const priceId = params.get("priceId");
   const selectedPlan = plans.find(plan => plan.productId === productId);

   const currentPlan = plans.find(plan => plan.productId === user?.subscribedPlan?.productId);
   const currentPrice = currentPlan?.prices?.find(price => price.priceId === user?.subscribedPlan?.priceId);

   return (
      <section ref={ref} className="plans-section">
         <div className="section-header container">
            <h2 className="section-title">{title}</h2>
            <div className="gradient-divider"></div>
         </div>

         {user && currentPrice && <div className="current-plan container">
            <PlanCard
               cardType="billing"
               title={currentPlan.name}
               productId={currentPlan.productId}
               priceId={currentPrice.priceId}
               prices={currentPlan.prices}
               selectedPrice={currentPrice}
               cancelFeature
            />
         </div>}

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
                     showCoupon={showCoupon}
                  />
               ) : plans.map(plan => (
                  <PlanCard
                     key={plan.id}
                     productId={plan.productId}
                     title={plan.name}
                     prices={plan.prices}
                     summary={plan.summary}
                     features={plan.features}
                     showCoupon={showCoupon}
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
