import './PositionQuickview.scss';
import ContentModal from '../../base/contentModal/ContentModal';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';

export default function PositionQuickview({ position, className = '', onClose = () => {}, ...props }) {
   const open = Boolean(position);
   if (!position) {
      return <></>;
   }

   return (
      <ContentModal
         className={`position-quickview ${className}`}
         title={<><StatusBadge type="position-side">{position.positionType.toUpperCase()}</StatusBadge> {position.symbol}</>}
         size="large"
         padding="s"
         open={open}
         onClose={onClose}
         {...props}
      >
         <ContentSidebar isFullContainer={true}>
            <p>content</p>
            <p>sidebar</p>
         </ContentSidebar>
      </ContentModal>
   );
}
