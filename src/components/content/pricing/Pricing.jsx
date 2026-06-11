import PlansGrid from "@/components/grids/plansGrid/PlansGrid";
import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";

export default function Pricing() {
   return (
      <div className="pricing-content">
         <StandardPageHeader pageTitle="Pricing" titleLabel="How Much It Costs" />

         <div className="container">
            <PlansGrid />
         </div>
      </div>
   );
}
