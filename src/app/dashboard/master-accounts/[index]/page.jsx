import AuthBasePage from '@/templates/authBasePage/AuthBasePage';
import MasterDetails from '@/components/content/dashboard/masterAccounts/masterDetails/MasterDetails';
import NotFoundPage from '@/app/not-found';

/**
 * MasterAccountPage Component
 *
 * This component renders the Master Accounts page.
 * It uses the `AuthBasePage` template and includes the `MasterDetails` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.params - An object containing the dynamic route parameters.
 * @param {string} props.params.index - The index or ID of the master account to display details for.
 *
 * @returns {JSX.Element} The rendered master accounts page.
 */
export default function MasterAccountPage({ params: { index } }) {
   if (!index) {
      return <NotFoundPage />
   }

   return (
      <AuthBasePage className="master-accounts-page">
         <MasterDetails index={index} />
      </AuthBasePage>
   );
}
