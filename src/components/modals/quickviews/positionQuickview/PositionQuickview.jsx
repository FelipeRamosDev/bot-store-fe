import './PositionQuickview.scss';
import ContentModal from '../../base/contentModal/ContentModal';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import PositionValuesGrid from '@/components/grids/positionValuesGrid/PositionValuesGrid';
import OrdersGrid from '@/components/grids/ordersGrid/OrdersGrid';
import PositionSidebar from './PositionSidebar';
import PositionDetails from './PositionDetails';

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
