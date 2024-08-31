import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import ContentModal from '../../base/contentModal/ContentModal';
import './SlotQuickview.scss';
import SlotQuickviewContent from './SlotQuickviewContent';
import SlotQuickviewSidebar from './SlotQuickviewSidebar';

export default function SlotQuickview({ slot, onClose, ...props }) {
   const open = Boolean(slot);

   if (!slot) {
      return <></>;
   }

   return (
      <ContentModal
         className="slot-quickview"
         title={slot.name}
         open={open}
         padding="s"
         size="large"
         onClose={onClose}
         {...props}
      >
         <ContentSidebar fitMaxWidth={true}>
            <SlotQuickviewContent slot={slot} />
            <SlotQuickviewSidebar slot={slot} />
         </ContentSidebar>
      </ContentModal>
   );
}
