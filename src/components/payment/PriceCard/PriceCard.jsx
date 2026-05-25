import CTAButton from "@/components/buttons/ctaButton/CTAButton";
import Card from "@/components/common/card/Card";

export default function PriceCard({ title, price, features }) {
   return (
      <Card className="plan-card">
         <h3 className="plan-title">{title}</h3>
         <p className="plan-price">{price}</p>

         <ul className="plan-features">
            {features.map((feature, index) => (
               <li key={index}>{feature}</li>
            ))}
         </ul>

         <CTAButton className="select-plan-button">Select Plan</CTAButton>
      </Card>
   );
}