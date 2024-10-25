import AuthBasePage from '@/templates/authBasePage/AuthBasePage';
import PilotStore from '@/components/content/dashboard/bots/pilotStore/PilotStore';

/**
 * PilotStorePage Component
 *
 * This component renders the main PilotStore page.
 * It uses the `AuthBasePage` template and includes the `PilotStore` component.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 */
export default function PilotStorePage() {
   return (
      <AuthBasePage>
         <PilotStore />
      </AuthBasePage>
   );
}
