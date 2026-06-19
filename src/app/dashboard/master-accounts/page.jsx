import AuthBasePage from "@/templates/authBasePage/AuthBasePage";
import MasterAccounts from "@/components/content/dashboard/masterAccounts/masterAccountsPage/MasterAccounts";

export const metadata = {
   title: 'Wallets | CandlePilot',
   description: 'Review and manage your connected wallets.',
};

/**
 * WalletsPage Component
 *
 * This component renders the Wallets page.
 * It uses the `AuthBasePage` template and includes the `MasterAccounts` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.searchParams - An object containing the search parameters from the URL (not used in this implementation).
 *
 * @returns {JSX.Element} The rendered wallets page.
 */
export default function WalletsPage({ searchParams: {} }) {
   return (
      <AuthBasePage className="master-accounts-page">
         <MasterAccounts />
      </AuthBasePage>
   );
}
