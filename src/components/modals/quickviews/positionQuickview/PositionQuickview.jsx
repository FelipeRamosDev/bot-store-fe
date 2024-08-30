import './PositionQuickview.scss';
import ContentModal from '../../base/contentModal/ContentModal';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import PositionValuesGrid from '@/components/grids/positionValuesGrid/PositionValuesGrid';
import OrdersGrid from '@/components/grids/ordersGrid/OrdersGrid';

export default function PositionQuickview({ position, className = '', onClose = () => {}, ...props }) {
   const open = Boolean(position);

   if (!position) {
      return <></>;
   }

   return (
      <ContentModal
         className={`position-quickview ${className}`}
         title={<><StatusBadge type="position-side">{position.positionType?.toUpperCase()}</StatusBadge> {position.symbol}</>}
         size="large"
         padding="s"
         open={open}
         onClose={onClose}
         {...props}
      >
         <ContentSidebar isFullContainer={true}>
            <>
               <PositionValuesGrid position={position} />
               <OrdersGrid orders={position.orders} />
            </>
            
            <>
               Sidebar
            </>
         </ContentSidebar>
      </ContentModal>
   );
}
