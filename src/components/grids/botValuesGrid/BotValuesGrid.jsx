import './BotValuesGrid.scss';
import BotValueSingle from '@/components/tiles/bot/botValueSingle/BotValueSingle';

export default function BotValuesGrid({ className = '', values = [], ...props }) {
   return (
      <div className={`bot-values-grid ${className}`} {...props}>
         {values.map(value => (
            <BotValueSingle key={value._id} botValue={value} minify={true} />
         ))}
      </div>
   );
}

