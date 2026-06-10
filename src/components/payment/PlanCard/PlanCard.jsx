import CTAButton from "@/components/buttons/ctaButton/CTAButton";
import Card from "@/components/common/card/Card";
import Markdown from "@/components/common/Markdown/Markdown";
import Price from "@/components/displays/price/Price";
import { FormBase } from "@/components/forms/formBase/FormBase";
import FormInput from "@/components/forms/formBase/FormInput";
import CancelSubscriptionConfirmDialog from "@/components/modals/dialogs/cancelSubscriptionConfirmDialog/CancelSubscriptionConfirmDialog";
import { parseCSS } from "@/helpers/parser";
import Form from "@/models/Form";
import SwitchFieldSchema from "@/models/Form/fieldTypes/SwitchFieldSchema";
import TextFieldSchema from "@/models/Form/fieldTypes/TextFieldSchema";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PlanCard({
   cardType,
   productId,
   title,
   prices = [],
   summary,
   features,
   selectedPrice: selectedPriceProp,
   cancelFeature = false,
   showCoupon = false,
   discountPercent = null
}) {
   const [interval, setInterval] = useState('monthly');
   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
   const [ openCoupon, setOpenCoupon ] = useState(false);
   const searchParams = useSearchParams();
   const currentPriceId = searchParams.get('currentPriceId');
   const router = useRouter();

   const selectedPrice = selectedPriceProp || prices.find(price => price.interval === interval);
   const yearAmount = interval === 'monthly' ? selectedPrice?.price * 12 : selectedPrice?.price;
   const monthAmount = interval === 'monthly' ? selectedPrice?.price : selectedPrice?.price / 12;
   const yearSize = interval === 'monthly' ? 's' : 'xl';
   const monthSize = interval === 'monthly' ? 'xl' : 's';
   const isCurrentPriceId = currentPriceId === selectedPrice?.priceId;
   const isBillingCard = cardType === 'billing';

   const FORM_SET = new Form({
      schema: [
         new SwitchFieldSchema({
            key: 'selectedInterval',
            required: true,
         }),
         new TextFieldSchema({
            key: 'couponCode',
            label: 'Have a promotion code?',
            placeholder: 'Enter code here'
         })
      ]
   });

   const handleSubmit = (data) => {
      const url = new URLSearchParams(window.location.search);

      url.set('productId', productId);
      url.set('priceId', selectedPrice?.priceId || '');
      url.set('couponCode', data?.couponCode || '');

      router.push(`/subscribe-plan?${url.toString()}`);
   };

   return (
      <Card className={parseCSS('plan-card', isBillingCard && 'billing')} elevation={50}>
         <FormBase
            formID="selected-plan"
            editData={{ selectedInterval: !Boolean(interval === 'monthly') }}
            formSet={FORM_SET}
            onSubmit={handleSubmit}
            hideSubmit
         >
            <div className="card-content">
               {isBillingCard && <label className="plan-label">Selected Plan</label>}
               <h3 className="plan-title">{title}</h3>
               {summary && <p className="plan-summary">{summary}</p>}

               {!isBillingCard && <div className="price-line">
                  <p className="line">
                     <Price className="plan-price" amount={yearAmount} size={yearSize} />/Year
                  </p>
                  <p className="line">
                     <Price className="plan-price" amount={monthAmount} size={monthSize} />/Month
                  </p>
               </div>}

               {!isBillingCard && <div className="interval-toggle">
                  <label className="interval-label month">Month</label>
                  <FormInput path="selectedInterval" onChange={() => setInterval(interval === 'monthly' ? 'yearly' : 'monthly')} />
                  <label className="interval-label year">Year</label>
               </div>}

               {features && <Markdown className="plan-features" value={features || ''} />}
            </div>

            {showCoupon && <div className="coupon-add">
               <label
                  className="coupon-label link"
                  onClick={() => setOpenCoupon(!openCoupon)}
               >
                  {openCoupon ? 'Hide promotion code' : 'Have a promotion code?'}
               </label>

               {openCoupon && <FormInput className="code-input" path="couponCode" />}
            </div>}

            {!isBillingCard && (
               <CTAButton
                  type="submit"
                  className="select-plan-button"
                  disabled={isCurrentPriceId}
                  fullWidth
               >
                  {isCurrentPriceId ? 'Plan already selected' : 'Select Plan'}
               </CTAButton>
            )}

            {isBillingCard && <div className="plan-invoice">
               <div className="invoice-row">
                  <span className="invoice-label">Interval</span>
                  <span className="invoice-dots"></span>
                  <span className="invoice-value">{selectedPrice?.interval === 'monthly' ? 'Monthly' : 'Yearly'}</span>
               </div>

               <div className="invoice-row">
                  <span className="invoice-label">{selectedPrice?.interval === 'monthly' ? 'Monthly' : 'Yearly'} amount ({selectedPrice?.currency || '---'})</span>
                  <span className="invoice-dots"></span>
                  <span className={`invoice-value${discountPercent ? ' strikethrough' : ''}`}>
                     <Price amount={selectedPrice?.price} size="s" forceColor="warn" /> / <small>{selectedPrice?.interval === 'monthly' ? 'Month' : 'Year'}</small>
                  </span>
               </div>

               {discountPercent != null && (
                  <>
                     <div className="invoice-row">
                        <span className="invoice-label">Discount ({discountPercent}% off)</span>
                        <span className="invoice-dots"></span>
                        <span className="invoice-value discount">
                           <Price forceColor="success" amount={(selectedPrice?.price * discountPercent / 100) * -1} size="m" />
                        </span>
                     </div>
                     <div className="invoice-row total">
                        <span className="invoice-label"><strong>Total</strong></span>
                        <span className="invoice-dots"></span>
                        <span className="invoice-value">
                           <Price amount={selectedPrice?.price * (1 - discountPercent / 100)} size="l" /> / <small>{selectedPrice?.interval === 'monthly' ? 'Month' : 'Year'}</small>
                        </span>
                     </div>
                  </>
               )}
            </div>}
         </FormBase>

         {cancelFeature && <Button
            className="cancel-subscription-button"
            color="error"
            variant="contained"
            fullWidth
            onClick={() => setCancelDialogOpen(true)}
         >Cancel Subscription</Button>}

         <CancelSubscriptionConfirmDialog subscriptionName={title} open={cancelDialogOpen} setOpen={setCancelDialogOpen} />
      </Card>
   );
}