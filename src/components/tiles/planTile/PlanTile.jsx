import CTAButton from "@/components/buttons/ctaButton/CTAButton";
import Card from "@/components/common/card/Card";
import Price from "@/components/displays/price/Price";
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

   const hasDiscount = subscribedPlan?.discountPercent != null;
   const discountPercent = subscribedPlan?.discountPercent;
   const intervalLabel = price?.interval === 'monthly' ? 'Monthly' : 'Yearly';
   const intervalSmall = price?.interval === 'monthly' ? 'Month' : 'Year';

   return (
      <Card className="plan-tile" padding="s">
         <label className="plan-label">Selected Plan</label>
         <h3 className="plan-title">{doc?.name}</h3>

         <div className="plan-invoice">
            <div className="invoice-row">
               <span className="invoice-label">Interval</span>
               <span className="invoice-dots"></span>
               <span className="invoice-value">{intervalLabel}</span>
            </div>

            <div className="invoice-row">
               <span className="invoice-label">{intervalLabel} amount ({price?.currency || '---'})</span>
               <span className="invoice-dots"></span>
               <span className={`invoice-value${hasDiscount ? ' strikethrough' : ''}`}>
                  <Price amount={price?.price} size="s" forceColor="warn" /> / <small>{intervalSmall}</small>
               </span>
            </div>

            {hasDiscount && (
               <>
                  <div className="invoice-row">
                     <span className="invoice-label">Discount ({discountPercent}% off)</span>
                     <span className="invoice-dots"></span>
                     <span className="invoice-value">
                        <Price forceColor="success" amount={(price?.price * discountPercent / 100) * -1} size="m" />
                     </span>
                  </div>

                  <div className="invoice-row total">
                     <span className="invoice-label"><strong>Total</strong></span>
                     <span className="invoice-dots"></span>
                     <span className="invoice-value">
                        <Price amount={price?.price * (1 - discountPercent / 100)} size="l" /> / <small>{intervalSmall}</small>
                     </span>
                  </div>
               </>
            )}
         </div>

         {!hideSubscriptionBtn && (
            <CTAButton url={`/subscribe-plan?${manageSubURL.toString()}`} fullWidth>Manage Subscription</CTAButton>
         )}
      </Card>
   );
}
