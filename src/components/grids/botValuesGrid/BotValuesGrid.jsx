import './BotValuesGrid.scss';
import BotValueSingle from '@/components/tiles/bot/botValueSingle/BotValueSingle';

/**
 * A component that displays a grid of bot values.
 * Each bot value is rendered using the `BotValueSingle` component.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - An optional CSS class name to apply to the grid container.
 * @param {Array} [props.values=[]] - An array of bot value objects to display in the grid.
 * 
 * @returns {JSX.Element} The rendered grid of bot values.
 */
export default function BotValuesGrid({ className = '', values = [], ...props }) {
   return (
      <div className={`bot-values-grid ${className}`} {...props}>
         {values.map(value => (
            <BotValueSingle key={value._id} botValue={value} minify={true} />
         ))}
      </div>
   );
}

