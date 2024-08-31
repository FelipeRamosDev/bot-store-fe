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
 * @param {Function} [props.openPosition=()=>{}] - Function that to open the mosition modal or redirect to the position page.
 *                                                 This function will receive the _id of the position.
 * @param {string} [props.slotIsRunning=false] - An optional class name to apply additional styling to the component.
 * @param {string} [props.className=''] - An optional class name to apply additional styling to the component.
 * 
 * @returns {React.Element} The rendered PositionTile component displaying the position information.
 */
export default function PositionTile({ position = {}, slotIsRunning = false, className = '', openPosition, ...props }) {
   const isEmpty = !Object.keys(position).length;
   let cursor = '';

   if (!openPosition) {
      openPosition = () => {};
   } else {
      cursor = 'cursor-pointer';
   }

   return (
      <PriceCard
         className={`position-tile ${className} ${cursor}`}
         padding="xs"
         radius="xs"
         elevation={20}
         value={position.pnl || 0}
         onClick={() => openPosition(position._id)}
         {...props}
      >
         {!isEmpty && <>
            <div className="column self-width">
               <label>Symbol</label>
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
         </>}

         {isEmpty && <>
            <div>
               <span className="value">
                  {!slotIsRunning && 'The slot is currently stopped! To be able of opening positions you need to run it.'}
                  {slotIsRunning && 'Waiting for opened positions...'}
               </span>
            </div>
         </>}
      </PriceCard>
   );
}
