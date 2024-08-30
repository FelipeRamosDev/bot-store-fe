import './OrderTile.scss';
import PriceCard from '@/components/common/priceCard/PriceCard';
import DetailsProp from './OrderTileDetailsProp';
import Price from '@/components/displays/price/Price';
import { useState } from 'react';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';

const PRICE_CONFIG = {
   dashedZero: true,
   noColor: true
};

function parseTitle(currentOrder) {
   if (!currentOrder) return 'Order';
   const [ _, type ] = currentOrder.clientOrderId?.split('_');
   let displayType = '';

   switch (type) {
      case 'open':
         displayType = 'Open';
         break;
      case 'close':
         displayType = 'Close';
         break;
      case 'sl':
         displayType = 'Stoploss';
         break;
      case 'tp':
         displayType = 'Takeprofit';
         break;
   }

   return `${displayType}${!displayType || ' '}Order`;
}

export default function OrderTile({ order = {}, mainOrders = {}, className = '', ...props }) {
   const [ expanded, setExpanded ] = useState(false);
   let borderColor;

   if (order.side === 'BUY') {
      borderColor = 'success';
   }

   if (order.side === 'SELL') {
      borderColor = 'error';
   }

   return (
      <PriceCard
         className={`order-tile cursor-pointer ${className}`}
         borderSide="bottom"
         radius="s"
         borderColor={borderColor}
         onClick={() => setExpanded(prev => !prev)}
         {...props}
      >
         <div className="card-header">
            {parseTitle(order)}
            <StatusBadge variant="light" type="order-status">{order.status}</StatusBadge>
         </div>

         <div className="card-body">
            <div className="contained-table">
               {order.side && <DetailsProp label="Order Side">{order.side}</DetailsProp>}
               {order.avgPrice && <DetailsProp label="Average Price">
                  <Price amount={order.avgPrice || 0} {...PRICE_CONFIG} />
               </DetailsProp>}
               {order.origQty && <DetailsProp label="Original Qty.">{order.origQty}</DetailsProp>}

               {expanded && <>
               {order.origType && <DetailsProp label="Original Type">{order.origType}</DetailsProp>}
                  {order.clientOrderId && <DetailsProp label="Client Order ID">{order.clientOrderId}</DetailsProp>}
                  {order.orderId && <DetailsProp label="Order ID">{order.orderId}</DetailsProp>}
               </>}
            </div>
         </div>
      </PriceCard>
   );
}
