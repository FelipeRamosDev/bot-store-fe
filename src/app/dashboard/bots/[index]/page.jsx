import BotDetails from '@/components/content/dashboard/bots/botDetails/BotDetails';
import AuthBasePage from '@/templates/authBasePage/AuthBasePage';

export const metadata = {
   title: 'Bot Details | CandlePilot',
   description: 'Inspect a bot configuration, status, and performance.',
};

/**
 * BotPage Component
 *
 * This component renders the Bot Details page.
 * It uses the `AuthBasePage` template and includes the `BotDetails` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.params - An object containing the dynamic route parameters.
 * @param {string} props.params.index - The index or ID of the bot to display details for.
 *
 * @returns {JSX.Element} The rendered bot details page.
 */
export default function BotPage({ params: { index } }) {
   return (
      <AuthBasePage className="bot-details no-padding">
         <BotDetails botIndex={index} />
      </AuthBasePage>
   );
}
