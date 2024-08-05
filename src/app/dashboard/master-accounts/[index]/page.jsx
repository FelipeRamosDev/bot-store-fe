import AuthBasePage from "@/templates/authBasePage/AuthBasePage";
import MasterDetails from "@/components/content/dashboard/masterAccounts/masterDetails/MasterDetails";

export default function MasterAccountsPage({ params: { index } }) {
   return <AuthBasePage className="master-accounts-page">
      <MasterDetails index={index} />
   </AuthBasePage>;
}
