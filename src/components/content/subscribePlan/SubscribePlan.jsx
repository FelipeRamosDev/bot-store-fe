'use client';

import SubscriptionCheckout from "@/components/payment/SubscriptionCheckout/SubscriptionCheckout";
import PlansGrid from "../../grids/plansGrid/PlansGrid";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import AJAX from "4hands-api/client/services/AJAX";
import APIContext from "@/contexts/4HandsAPI";

export default function SubscribePlan() {
   const [plans, setPlans] = useState([]);
   const searchParams = useSearchParams();
   const query = useRef();
   const instance = useContext(APIContext);
   const productId = searchParams.get('productId');
   const priceId = searchParams.get('priceId');
   const isSelected = productId && priceId;
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

   return (<div className="subscribe-plan container">
      {!isSelected && <PlansGrid plans={plans} setPlans={setPlans} />}
      {isSelected && <SubscriptionCheckout selectedPlan={selectedPlan} selectedPrice={selectedPrice} />}
   </div>);
}
