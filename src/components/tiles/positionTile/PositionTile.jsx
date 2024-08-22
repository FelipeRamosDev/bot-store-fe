import Price from '@/components/displays/price/Price';
import './PositionTile.scss';
import PriceCard from '@/components/common/priceCard/PriceCard';
import PrettyDate from '@/components/displays/prettyDate/PrettyDate';

/**
 * A component that displays a tile for a trading position, including details like the bot slot name, symbol, open time, and profit/loss.
 * 
 * This component is used to show summarized information about a trading position in a visually appealing card format.
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} [props.position={}] - The position data to display, which includes details like `botSlot`, `symbol`, `openTime`, and `pnl`.
 * @param {string} [props.className=''] - An optional class name to apply additional styling to the component.
 * 
 * @returns {React.Element} The rendered PositionTile component displaying the position information.
 */
export default function PositionTile({ position = {}, className = '', ...props }) {
   return (
      <PriceCard
         className={`position-tile ${className}`}
         padding="xs"
         radius="xs"
         elevation={20}
         value={position.pnl || 0}
         {...props}
      >
         <div className="column self-width">
            <label>{position.botSlot?.name}</label>
            <span className="value">{position.symbol}</span>
         </div>

         <div className="column divide">
            <label>Open Time</label>
            <PrettyDate hideYear={true} hideSeconds={true} time={position.openTime} divisor=" " />
         </div>

         <div className="column align-right">
            <label>PNL/ROI</label>
            <Price amount={position.pnl} />
         </div>
      </PriceCard>
   );
}
