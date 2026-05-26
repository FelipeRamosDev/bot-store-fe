import AdminHomeContent from '@/components/content/admin/adminHome/AdminHome';
import AdminBasePage from '@/templates/adminBasePage/AdminBasePage';

/**
 * AdminHomePage Component
 *
 * This component renders the Admin Home page for the application.
 * It uses the `BasePage` template to structure the layout and includes
 * both the `AdminHomeTopBanner` and `AdminHomeContent` components to display the
 * top banner and main content of the Admin Home page.
 *
 * @returns {JSX.Element} The rendered Admin Home page with a top banner and content.
 */
export default function AdminHomePage() {
   return (
      <AdminBasePage className="admin-home-page" fullContainer={false}>
         <AdminHomeContent />
      </AdminBasePage>
   );
}

