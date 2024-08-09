import './MasterDetails.scss';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import MasterDetailsHeader from './MasterDetailsHeader';
import MasterDetailsContent from './MasterDetailsContent';
import MasterDetailsSidebar from './MasterDetailsSidebar';
import { DBQuery } from '@/contexts/DBQuery';

export default function MasterDetails({ index }) {
   return (
      <DBQuery type="doc" collection="master_accounts" filter={{ index }} subscribe={true}>
         <ContentSidebar className="master-details" isFullContainer={true}>
            <MasterDetailsContent />
            <MasterDetailsSidebar />

            <MasterDetailsHeader />
         </ContentSidebar>
      </DBQuery>
   );
}
