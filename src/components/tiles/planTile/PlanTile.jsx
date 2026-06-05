import CTAButton from "@/components/buttons/ctaButton/CTAButton";
import Card from "@/components/common/card/Card";
import DBQueryContext from "@/contexts/DBQuery";
import { useContext } from "react";

export default function PlanTile({ subscribedPlan, hideSubscriptionBtn = false }) {
   const { doc } = useContext(DBQueryContext);
   const price = doc?.prices?.find(p => p.priceId === subscribedPlan?.priceId);

   const manageSubURL = new URLSearchParams(window.location.search);
   manageSubURL.set('updatePlan', 'true');
   manageSubURL.set('currentPriceId', subscribedPlan?.priceId);

   if (!doc || !price) {
      return null;
   }

   return (
      <Card className="plan-tile" padding="s">
         <div className="plan-prop">
            <label>Subscribed Plan</label> <span>{doc?.name}</span>
         </div>
         <div className="plan-prop">
            <label>Plan Price</label> <span>{price?.currency} {price?.price}/{price?.interval}</span>
         </div>

         {!hideSubscriptionBtn && (
            <CTAButton url={`/subscribe-plan?${manageSubURL.toString()}`} fullWidth>Manage Subscription</CTAButton>
         )}
      </Card>
   );
}
