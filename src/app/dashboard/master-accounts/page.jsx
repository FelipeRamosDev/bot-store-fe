import AuthBasePage from "@/templates/authBasePage/AuthBasePage";
import MasterAccounts from "@/components/content/dashboard/masterAccounts/MasterAccounts";

/**
 * MasterAccountsPage Component
 *
 * This component renders the Master Accounts page.
 * It uses the `AuthBasePage` template and includes the `MasterAccounts` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.searchParams - An object containing the search parameters from the URL (not used in this implementation).
 *
 * @returns {JSX.Element} The rendered master accounts page.
 */
export default function MasterAccountsPage({ searchParams: {} }) {
   return (
      <AuthBasePage className="master-accounts-page">
         <MasterAccounts />
      </AuthBasePage>
   );
}
