import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import ContentModal from '../../base/contentModal/ContentModal';
import SlotQuickviewContent from './SlotQuickviewContent';
import SlotQuickviewSidebar from './SlotQuickviewSidebar';
import { DBQuery } from '@/contexts/DBQuery';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';

/**
 * SlotQuickview Component
 * 
 * This component renders a detailed modal view of a specific trading slot. It includes the slot's content, a sidebar with additional details,
 * and a table displaying closed positions associated with the slot. The modal is displayed only if a slot is provided as a prop.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.master] - The master object to display in the quick view. If null or undefined, the modal will not be rendered.
 * @param {Object} [props.slot] - The slot object to display in the quick view. If null or undefined, the modal will not be rendered.
 * @param {Function} props.onClose - A callback function to handle closing the modal.
 * 
 * @returns {JSX.Element} The rendered SlotQuickview component, or an empty fragment if no slot is provided.
 */
export default function SlotQuickview({ master, slot, onClose, ...props }) {
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
            <SlotQuickviewContent master={master} slot={slot} />
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
