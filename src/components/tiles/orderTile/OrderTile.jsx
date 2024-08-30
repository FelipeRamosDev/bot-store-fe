import './OrderTile.scss';
import PriceCard from '@/components/common/priceCard/PriceCard';
import DetailsProp from './OrderTileDetailsProp';
import Price from '@/components/displays/price/Price';

const PRICE_CONFIG = {
   dashedZero: true,
   noColor: true
}

export default function OrderTile({ order = {}, className = '', ...props }) {
   return (
      <PriceCard
         className={`order-tile ${className}`}
         borderSide="bottom"
         radius="s"
         borderColor="success"
         {...props}
      >
         <div className="card-header">
            Open Order
         </div>

         <div className="card-body">
            <div className="contained-table">
               <DetailsProp label="Average Price">
                  <Price amount={order.avgPrice || 0} {...PRICE_CONFIG} />
               </DetailsProp>

               <DetailsProp label="Client Order ID">{order.clientOrderId}</DetailsProp>
               <DetailsProp label="Order ID">{order.orderId}</DetailsProp>
               <DetailsProp label="Original Qty.">{order.origQty}</DetailsProp>
               <DetailsProp label="Original Type">{order.origType}</DetailsProp>
               <DetailsProp label="Order Side">{order.side}</DetailsProp>
               <DetailsProp label="Symbol">{order.symbol}</DetailsProp>
            </div>
         </div>
      </PriceCard>
   );
}
