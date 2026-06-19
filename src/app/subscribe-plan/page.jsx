import SubscribePlan from '@/components/content/subscribePlan/SubscribePlan';
import AuthBasePage from '@/templates/authBasePage/AuthBasePage';

export const metadata = {
   title: 'Subscribe Plan | CandlePilot',
   description: 'Select a plan and manage your subscription.',
};

export default function SubscriptionPage() {
   return (
      <AuthBasePage className="subscribe-plan-page" fullContainer={false}>
         <SubscribePlan />
      </AuthBasePage>
   );
}
