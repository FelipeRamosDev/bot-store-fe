import './BotValuesGrid.scss';
import BotValueSingle from '@/components/tiles/bot/botValueSingle/BotValueSingle';

export default function BotValuesGrid({ className = '', values = [], ...props }) {
   return (
      <div className={`bot-values-grid ${className}`} {...props}>
         {values.map(value => {
            switch (value.slug) {
               case 'stoploss_long':
               case 'stoploss_short':
               case 'takeprofit_long':
               case 'takeprofit_short':
                  return;
            }

            return <BotValueSingle key={value._id} botValue={value} minify={true} />
         })}
      </div>
   );
}

