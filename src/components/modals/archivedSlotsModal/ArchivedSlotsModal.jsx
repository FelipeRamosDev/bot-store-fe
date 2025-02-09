import { DBQuery } from '@/contexts/DBQuery';
import ContentModal from '../base/contentModal/ContentModal';
import ArchivedSlotsGrid from './ArchivedSlotsGrid';

export default function ArchivedSlotsModal({ open, setOpen, master }) {
   return <ContentModal
      title="Archived Slots"
      size="large"
      padding="m"
      open={open}
      onClose={() => setOpen(false)}
   >
      <DBQuery
         collection="slots"
         type="query"
         filter={{ master: master._id, state: 'archived' }}
      >
         <ArchivedSlotsGrid master={master} />
      </DBQuery>
   </ContentModal>
}
