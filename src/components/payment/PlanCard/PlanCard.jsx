import CTAButton from "@/components/buttons/ctaButton/CTAButton";
import Card from "@/components/common/card/Card";
import { FormBase } from "@/components/forms/formBase/FormBase";
import FormInput from "@/components/forms/formBase/FormInput";
import Form from "@/models/Form";
import SwitchFieldSchema from "@/models/Form/fieldTypes/SwitchFieldSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlanCard({ productId, title, prices = [], summary }) {
   const [interval, setInterval] = useState('monthly');
   const selectedPrice = interval === 'monthly' ? prices[0] : prices[1];
   const router = useRouter();

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
      <Card className="plan-card">
         <FormBase
            formID="selected-plan"
            editData={{ selectedInterval: !Boolean(interval === 'monthly') }}
            formSet={FORM_SET}
            onSubmit={handleSubmit}
            hideSubmit
         >
            <div className="card-content">
               <h3 className="plan-title">{title}</h3>
               <p className="plan-price">{selectedPrice?.price}</p>

               <div className="interval-toggle">
                  <label className="interval-label month">Month</label>
                  <FormInput path="selectedInterval" onChange={() => setInterval(interval === 'monthly' ? 'yearly' : 'monthly')} />
                  <label className="interval-label year">Year</label>
               </div>

               <div className="plan-summary">{summary}</div>
               <div className="plan-features">{selectedPrice?.features}</div>
            </div>

            <CTAButton type="submit" className="select-plan-button" fullWidth>Select Plan</CTAButton>
         </FormBase>
      </Card>
   );
}