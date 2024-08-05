import AuthBasePage from "@/templates/authBasePage/AuthBasePage";
import DashboardHome from "@/components/content/dashboard/home/DashboardHome";

export default function DashboardPage() {
   return <AuthBasePage>
      <DashboardHome />
   </AuthBasePage>;
}
