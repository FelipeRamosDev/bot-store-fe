import AuthBasePage from "@/templates/authBasePage/AuthBasePage";
import DashboardHome from "@/components/content/dashboard/home/DashboardHome";

/**
 * DashboardPage Component
 *
 * This component renders the main Dashboard page.
 * It uses the `AuthBasePage` template and includes the `DashboardHome` component.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 */
export default function DashboardPage() {
   return (
      <AuthBasePage>
         <DashboardHome />
      </AuthBasePage>
   );
}
