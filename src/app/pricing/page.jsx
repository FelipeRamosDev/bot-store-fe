import Pricing from '@/components/content/pricing/Pricing';
import BasePage from '@/templates/basePage/BasePage';

export default function PricingPage() {
   return (
      <BasePage className="pricing-page" fullContainer={false}>
         <Pricing />
      </BasePage>
   );
}

