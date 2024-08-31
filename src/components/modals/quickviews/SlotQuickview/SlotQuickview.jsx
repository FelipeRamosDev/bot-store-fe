import './SlotQuickview.scss';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import ContentModal from '../../base/contentModal/ContentModal';
import SlotQuickviewContent from './SlotQuickviewContent';
import SlotQuickviewSidebar from './SlotQuickviewSidebar';
import { DBQuery } from '@/contexts/DBQuery';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';

export default function SlotQuickview({ slot, onClose, ...props }) {
   const open = Boolean(slot);

   if (!slot) {
      return <></>;
   }

   return (<>
      <ContentModal
         className="slot-quickview"
         title={slot.name}
         open={open}
         padding="s"
         size="x-large"
         onClose={onClose}
         {...props}
      >
         <ContentSidebar fitMaxWidth={true}>
            <SlotQuickviewContent slot={slot} />
            <SlotQuickviewSidebar slot={slot} />
         </ContentSidebar>
         
         <DBQuery
            type="query"
            collection="positions"
            filter={{ status: 'closed', botSlot: slot._id }}
            sort={{ closeTime: -1 }}
         >
            <PositionsTable />
         </DBQuery>
      </ContentModal>
   </>);
}
