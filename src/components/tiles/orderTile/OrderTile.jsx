import PriceCard from '@/components/common/priceCard/PriceCard';
import Price from '@/components/displays/price/Price';
import { useState } from 'react';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';

const PRICE_CONFIG = {
   dashedZero: true,
   noColor: true
};

/**
 * Parses the title for the order based on the clientOrderId.
 * 
 * @param {Object} currentOrder - The order object containing clientOrderId.
 * @returns {string} The parsed title for the order.
 */
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

/**
 * OrderTile Component
 * 
 * This component displays a tile for a trading order with its details. It includes a header with the order type and status, and a 
 * body with additional details that can be expanded or collapsed. The tile's border color is determined by the order side.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.order={}] - An object representing the order data, which includes side, avgPrice, origQty, origType, 
 *                                    clientOrderId, and orderId.
 * @param {Object} [props.mainOrders={}] - An object representing main orders (not used in the current implementation).
 * @param {string} [props.className=''] - Additional class names for custom styling.
 * 
 * @returns {JSX.Element} The rendered OrderTile component.
 */
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
            <ContainedTable
               tableData={[
                  { label: 'Order Side', value: order.side },
                  { label: 'Average Price', value: <Price amount={order.avgPrice || 0} {...PRICE_CONFIG} /> },
                  { label: 'Original Qty.', value: order.origQty },
                  { label: 'Original Type', value: order.origType, hide: !expanded },
                  { label: 'Client Order ID', value: order.clientOrderId, hide: !expanded },
                  { label: 'Order ID', value: order.orderId, hide: !expanded },
               ]}
            />
         </div>
      </PriceCard>
   );
}
