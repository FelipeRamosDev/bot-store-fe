import Pricing from '@/components/content/pricing/Pricing';
import BasePage from '@/templates/basePage/BasePage';

export const metadata = {
   title: 'Pricing | CandlePilot',
   description: 'Compare plans and choose the right subscription.',
};

export default function PricingPage() {
   return (
      <BasePage className="pricing-page" fullContainer={false}>
         <Pricing />
      </BasePage>
   );
}

