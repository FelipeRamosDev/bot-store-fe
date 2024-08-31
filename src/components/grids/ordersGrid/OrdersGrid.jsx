import './OrdersGrid.scss';
import OrderTile from '@/components/tiles/orderTile/OrderTile';

export default function OrdersGrid({ className = '', orders = [] }) {
   return (
      <div className={`orders-grid ${className}`}>
         {orders.map(order => <OrderTile key={order._id} order={order} />)}
      </div>
   );
}
