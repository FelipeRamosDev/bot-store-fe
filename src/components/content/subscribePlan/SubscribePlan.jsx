'use client';

import SubscriptionCheckout from "@/components/payment/SubscriptionCheckout/SubscriptionCheckout";
import PlansGrid from "../../grids/plansGrid/PlansGrid";
import { useSearchParams } from "next/navigation";
import usePlans from "@/hooks/usePlans";

export default function SubscribePlan() {
   const { plans, setPlans } = usePlans();
   const searchParams = useSearchParams();

   const productId = searchParams.get('productId');
   const priceId = searchParams.get('priceId');
   const updatePlan = searchParams.get('updatePlan') === 'true';

   const isSelected = productId && priceId;
   const selectedPlan = plans.find(plan => plan.productId === productId);
   const selectedPrice = selectedPlan?.prices.find(price => price.priceId === priceId);
   const gridTitle = updatePlan && <>Upgrade your <span className="grad-txt">Plan</span></>;

   return (<div className="subscribe-plan container">
      {!isSelected && <PlansGrid
         title={gridTitle}
         plans={plans}
         setPlans={setPlans}
      />}

      {isSelected && <SubscriptionCheckout selectedPlan={selectedPlan} selectedPrice={selectedPrice} />}
   </div>);
}
