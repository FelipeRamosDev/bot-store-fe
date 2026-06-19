import OrderTile from '@/components/tiles/orderTile/OrderTile';

/**
 * OrdersGrid Component
 * 
 * This component is responsible for rendering a grid of orders. Each order is represented by an `OrderTile` component.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - An optional additional CSS class to apply to the orders grid.
 * @param {Array} [props.orders=[]] - An array of order objects to be displayed in the grid.
 * 
 * @returns {JSX.Element} The rendered OrdersGrid component.
 */
export default function OrdersGrid({ className = '', orders = [] }) {
   return (
      <div className={`orders-grid ${className}`}>
         {orders.map(order => <OrderTile key={order._id} order={order} />)}
      </div>
   );
}
