import ContentModal from '../../base/contentModal/ContentModal';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import PositionValuesGrid from '@/components/grids/positionValuesGrid/PositionValuesGrid';
import OrdersGrid from '@/components/grids/ordersGrid/OrdersGrid';
import PositionSidebar from './PositionSidebar';
import PositionDetails from './PositionDetails';
import PositionParents from './PositionParents';

/**
 * PositionQuickview Component
 * 
 * This component renders a modal that provides a quick view of the details of a trading position. It includes a grid of position values, 
 * an orders grid (for live positions), and a sidebar with additional details. The component is responsive, adjusting its layout based 
 * on the screen size.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.position - An object representing the position data, which includes symbol, openPrice, positionType, orders, 
 *                                  and other relevant data.
 * @param {string} [props.className=''] - Additional class names for custom styling.
 * @param {Function} [props.onClose=() => {}] - A callback function triggered when the modal is closed.
 * @param {Object} [props] - Additional props passed to the ContentModal component.
 * 
 * @returns {JSX.Element} The rendered PositionQuickview component.
 */
export default function PositionQuickview({ position, className = '', onClose = () => {}, ...props }) {
   const open = Boolean(position);
   const isMobile = window.innerWidth < 768;

   if (!position) {
      return <></>;
   }

   let symbolFractional = 2;
   const stringPrice = String(position.openPrice);
   const arrayPrice = stringPrice.split('.');

   if (arrayPrice.length <= 1) {
      symbolFractional = 0;
   } else {
      symbolFractional = arrayPrice[1].length;
   }

   position.symbolFractional = symbolFractional;

   return (
      <ContentModal
         className={`position-quickview ${className}`}
         title={<>{position.symbol} <StatusBadge variant="light" type="position-side">{position.positionType?.toUpperCase()}</StatusBadge></>}
         size="large"
         padding="s"
         open={open}
         onClose={onClose}
         {...props}
      >
         <ContentSidebar isFullContainer={true}>
            <>
               <PositionValuesGrid position={position} />

               {isMobile && <PositionSidebar position={position} isMobile={isMobile} />}
               {position.type === 'position-demo' && <PositionDetails position={position} />}
               {position.type === 'position-live' && <OrdersGrid orders={position.orders} />}
            </>
            
            {!isMobile && <PositionSidebar position={position} isMobile={isMobile} />}
         </ContentSidebar>
      </ContentModal>
   );
}
