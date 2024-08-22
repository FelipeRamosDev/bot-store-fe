import AuthBasePage from "@/templates/authBasePage/AuthBasePage";
import MasterAccounts from "@/components/content/dashboard/masterAccounts/MasterAccounts";

export default function MasterAccountsPage({ searchParams: {} }) {
   return <AuthBasePage className="master-accounts-page">
      <MasterAccounts />
   </AuthBasePage>;
}
