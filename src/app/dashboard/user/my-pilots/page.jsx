import AuthBasePage from '@/templates/authBasePage/AuthBasePage';
import MyPilots from '@/components/content/dashboard/user/myPilots/MyPilots';

/**
 * MyPilotsPage Component
 *
 * This component renders the main MyPilots page.
 * It uses the `AuthBasePage` template and includes the `MyPilots` component.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 */
export default function MyPilotsPage() {
   return (
      <AuthBasePage>
         <MyPilots />
      </AuthBasePage>
   );
}
