import CTAButton from "@/components/buttons/ctaButton/CTAButton";
import Card from "@/components/common/card/Card";
import Markdown from "@/components/common/Markdown/Markdown";
import Price from "@/components/displays/price/Price";
import { FormBase } from "@/components/forms/formBase/FormBase";
import FormInput from "@/components/forms/formBase/FormInput";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import { parseCSS } from "@/helpers/parser";
import Form from "@/models/Form";
import SwitchFieldSchema from "@/models/Form/fieldTypes/SwitchFieldSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlanCard({ cardType, productId, title, prices = [], summary, features }) {
   const [interval, setInterval] = useState('monthly');
   const selectedPrice = prices.find(price => price.interval === interval);
   const router = useRouter();
   const isBillingCard = cardType === 'billing';

   const yearAmount = interval === 'monthly' ? selectedPrice?.price * 12 : selectedPrice?.price;
   const yearSize = interval === 'monthly' ? 's' : 'xl';
   const monthAmount = interval === 'monthly' ? selectedPrice?.price : selectedPrice?.price / 12;
   const monthSize = interval === 'monthly' ? 'xl' : 's';

   const FORM_SET = new Form({
      schema: [
         new SwitchFieldSchema({
            key: 'selectedInterval',
            required: true,
         }),
      ]
   });

   const handleSubmit = () => {
      router.push(`/subscribe-plan?productId=${productId}&priceId=${selectedPrice?.priceId}&register=true`);
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
               <p className="plan-summary">{summary}</p>

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

               <Markdown className="plan-features" value={features || ''} />
            </div>

            {!isBillingCard && <CTAButton type="submit" className="select-plan-button" fullWidth>Select Plan</CTAButton>}

            {isBillingCard && <ContentHeader>
               <h4 className="header-title">Summary</h4>
            </ContentHeader>}
            {isBillingCard && <div className="plan-invoice">
               <div className="invoice-row">
                  <span className="invoice-label">Interval</span>
                  <span className="invoice-dots"></span>
                  <span className="invoice-value">{interval === 'monthly' ? 'Monthly' : 'Yearly'}</span>
               </div>
               <div className="invoice-row">
                  <span className="invoice-label">{interval === 'monthly' ? 'Monthly' : 'Yearly'} amount ({selectedPrice?.currency || '---'})</span>
                  <span className="invoice-dots"></span>
                  <span className="invoice-value"><Price amount={monthAmount} size="l" />/<small>{interval === 'monthly' ? 'Month' : 'Year'}</small></span>
               </div>
            </div>}
         </FormBase>
      </Card>
   );
}