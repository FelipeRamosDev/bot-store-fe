import SubscribePlan from '@/components/content/subscribePlan/SubscribePlan';
import AuthBasePage from '@/templates/authBasePage/AuthBasePage';

export default function SubscriptionPage() {
   return (
      <AuthBasePage className="subscribe-plan-page" fullContainer={false}>
         <SubscribePlan />
      </AuthBasePage>
   );
}
