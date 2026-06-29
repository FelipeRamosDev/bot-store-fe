import AuthBasePage from '@/templates/authBasePage/AuthBasePage';
import MyPilots from '@/components/content/dashboard/user/myPilots/MyPilots';
import { PilotBuilderChat } from '@/components/chats';

export const metadata = {
   title: 'My Pilots | CandlePilot',
   description: 'View and manage the pilot bots assigned to your account.',
};

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
      <AuthBasePage className="no-padding">
         <PilotBuilderChat type="create">
            <MyPilots />
         </PilotBuilderChat>
      </AuthBasePage>
   );
}
