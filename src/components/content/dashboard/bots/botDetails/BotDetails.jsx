import { DBQuery } from '@/contexts/DBQuery';
import BotDetailsHeader from './BotDetailsHeader';
import BotThreads from './BotThreads';
import BotSettings from './BotSettings';

/**
 * The BotDetails component fetches and displays detailed information about a bot.
 * It uses the `DBQuery` context to retrieve data from the "bots" collection based on the provided `botIndex`.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.botIndex - The index of the bot to fetch and display details for.
 * 
 * @returns {JSX.Element} The rendered component, including bot details, settings, and threads.
 */
export default function BotDetails({ botIndex }) {
   return <DBQuery
      type="doc"
      collection="bots"
      filter={{ index: botIndex }}
      subscribe={true}
   >
      <BotDetailsHeader />

      <BotSettings />
      <BotThreads />
   </DBQuery>;
}
