import './BotDetails.scss';
import { DBQuery } from '@/contexts/DBQuery';
import BotDetailsHeader from './BotDetailsHeader';

export default function BotDetails({ botIndex }) {
   return <DBQuery
      type="doc"
      collection="bots"
      filter={{ index: botIndex }}
      subscribe={true}
   >
      <BotDetailsHeader />
   </DBQuery>;
}
