import Card from '@/components/common/card/Card';

const EVALUATING = 'Looking for a trade to start';
const PAUSED = 'The slot is paused due to a goal or limit reached!';
const STOPPED = 'The slot is stopped, start it to look for positions.';
const OFFLINE = 'The user instance is offline, turn on the instance to start'

export default function NoPosition({ slot = {}, message = 'Waiting', uInstance = {} }) {
   switch (slot.status) {
      case 'running':
         message = EVALUATING;
         break;
      case 'paused':
         message = PAUSED;
         break;
      case 'stopped':
         message = STOPPED;
         break;
   }

   if (uInstance.status === 'offline') {
      message = OFFLINE;
   }

   return (
      <Card className="empty-tile" padding="s" radius="xs" elevation={0}>
         <span className={`led ${slot.status}`}></span>
         <span>{message}</span>
      </Card>
   )
}