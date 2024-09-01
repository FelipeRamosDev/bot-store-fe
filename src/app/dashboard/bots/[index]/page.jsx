import BotDetails from '@/components/content/dashboard/bots/botDetails/BotDetails';
import AuthBasePage from '@/templates/authBasePage/AuthBasePage';

/**
 * BotPage Component
 *
 * This component renders the Master Accounts page.
 * It uses the `AuthBasePage` template and includes the `MasterDetails` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.params - An object containing the dynamic route parameters.
 * @param {string} props.params.index - The index or ID of the master account to display details for.
 *
 * @returns {JSX.Element} The rendered master accounts page.
 */
export default function BotPage({ params: { index } }) {
   return (
      <AuthBasePage className="bot-details">
         <BotDetails botIndex={index} />
      </AuthBasePage>
   );
}
