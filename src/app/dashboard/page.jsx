import AuthBasePage from "@/templates/authBasePage/AuthBasePage";
import DashboardHome from "@/components/content/dashboard/home/DashboardHome";

export const metadata = {
   title: 'Dashboard | CandlePilot',
   description: 'Track your bot activity and manage your trading workspace.',
};

/**
 * DashboardPage Component
 *
 * This component renders the main Dashboard page.
 * It uses the `AuthBasePage` template and includes the `DashboardHome` component.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 */
export default function DashboardPage({ ...props }) {
   return (
      <AuthBasePage {...props}>
         <DashboardHome />
      </AuthBasePage>
   );
}
