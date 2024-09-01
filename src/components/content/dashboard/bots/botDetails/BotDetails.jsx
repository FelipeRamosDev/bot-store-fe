import './BotDetails.scss';
import { DBQuery } from '@/contexts/DBQuery';
import BotDetailsHeader from './BotDetailsHeader';
import BotThreads from './BotThreads';

export default function BotDetails({ botIndex }) {
   return <DBQuery
      type="doc"
      collection="bots"
      filter={{ index: botIndex }}
      subscribe={true}
   >
      <BotDetailsHeader />
      <BotThreads />
   </DBQuery>;
}
