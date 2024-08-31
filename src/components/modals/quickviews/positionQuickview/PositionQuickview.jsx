import './PositionQuickview.scss';
import ContentModal from '../../base/contentModal/ContentModal';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import PositionValuesGrid from '@/components/grids/positionValuesGrid/PositionValuesGrid';
import OrdersGrid from '@/components/grids/ordersGrid/OrdersGrid';
import PositionLimits from './PositionLimits';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';
import Card from '@/components/common/card/Card';

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

               {isMobile && <PositionLimits position={position} />}
               <OrdersGrid orders={position.orders} />
            </>
            
            <>
               {!isMobile && <PositionLimits position={position} />}

               <Card padding="xs" radius="s" elevation={10}>
                  <ContainedTable
                     tableData={[
                        { label: 'Position ID', value: position.cod },
                        { label: 'Open Time', value: new Date(position.openTime).toLocaleString() },
                        { label: 'Close Time', value: position.closeTime && new Date(position.closeTime).toLocaleString(), hide: !position.closeTime },
                     ]}
                  />
               </Card>
            </>
         </ContentSidebar>
      </ContentModal>
   );
}
