'use client';
import './MasterDetails.scss';
import { useState } from 'react';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import MasterDetailsHeader from './MasterDetailsHeader';
import MasterDetailsContent from './MasterDetailsContent';
import MasterDetailsSidebar from './masterDetailsSidebar/MasterDetailsSidebar';
import { DBQuery } from '@/contexts/DBQuery';

export default function MasterDetails({ index }) {
   const [ uInstance, setUInstance ] = useState();

   return (
      <DBQuery type="doc" collection="master_accounts" filter={{ index }} subscribe={true}>
         <ContentSidebar className="master-details" isFullContainer={true}>
            <MasterDetailsContent uInstance={uInstance} />
            <MasterDetailsSidebar setUInstance={setUInstance} />

            <MasterDetailsHeader />
         </ContentSidebar>
      </DBQuery>
   );
}
