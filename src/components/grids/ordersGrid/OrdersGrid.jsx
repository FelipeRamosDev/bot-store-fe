import './OrdersGrid.scss';
import OrderTile from '@/components/tiles/orderTile/OrderTile';

export default function OrdersGrid({ className = '', orders = [] }) {
   orders = [
      {
         _id: Math.random(),
         avgPrice: 100,
         clientOrderId: 'bs_open_93_91953f87',
         orderId: 16764191206,
         origQty: 2048,
         origType: 'MARKET',
         side: 'BUY',
         status: 'FILLED'
      },
      {
         _id: Math.random(),
         avgPrice: 110,
         clientOrderId: 'bs_close_93_91953f87',
         orderId: 564516516,
         origQty: 2048,
         origType: 'MARKET',
         side: 'SELL',
         status: 'FILLED'
      },
      {
         _id: Math.random(),
         avgPrice: 100,
         clientOrderId: 'bs_sl_93_91953f87',
         orderId: 16764191206,
         origQty: 2048,
         origType: 'STOPLOSS_MARKET',
         side: 'SELL',
         status: 'CANCELED'
      },
      {
         _id: Math.random(),
         avgPrice: 100,
         clientOrderId: 'bs_tp_93_91953f87',
         orderId: 16764191206,
         origQty: 2048,
         origType: 'TAKE_PROFIT_MARKET',
         side: 'SELL',
         status: 'CANCELED'
      }
   ];

   return (
      <div className={`orders-grid ${className}`}>
         {orders.map(order => <OrderTile key={order._id} order={order} />)}
      </div>
   );
}
