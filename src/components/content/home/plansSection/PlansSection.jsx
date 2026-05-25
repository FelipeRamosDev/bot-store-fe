import CTAButton from "@/components/buttons/ctaButton/CTAButton";
import Card from "@/components/common/card/Card";
import PriceCard from "../../../payment/PriceCard/PriceCard";

export default function PlansSection() {
   return (
      <section className="plans-section">
         <div className="section-header container">
            <h2 className="section-title">Choose Your <span className="grad-txt">Plan</span></h2>
            <div className="gradient-divider"></div>
         </div>

         <div className="container">
            <div className="plans-container">
               <PriceCard
                  title="Basic Plan"
                  price="$9.99/month"
                  features={[
                     "Access to all features",
                     "Priority email support",
                     "Community access",
                     "Monthly webinars"
                  ]}
               />
               <PriceCard
                  title="Pro Plan"
                  price="$19.99/month"
                  features={[
                     "Access to all features",
                     "Priority email support",
                     "Community access",
                     "Monthly webinars"
                  ]}
               />
            </div>
         </div>
      </section>
   );
}
