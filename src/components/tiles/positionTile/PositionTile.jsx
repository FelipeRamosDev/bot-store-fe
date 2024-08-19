import Price from '@/components/displays/price/Price';
import './PositionTile.scss';
import PriceCard from '@/components/common/priceCard/PriceCard';
import Percent from '@/components/displays/percent/Percent';
import PrettyDate from '@/components/displays/prettyDate/PrettyDate';

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
            <PrettyDate hideYear={true} time={position.openTime} />
         </div>

         <div className="column align-right">
            <label>PNL/ROI</label>
            <Price amount={position.pnl} />
         </div>
      </PriceCard>
   );
}
