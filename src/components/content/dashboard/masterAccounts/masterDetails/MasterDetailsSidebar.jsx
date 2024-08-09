'use client';
import { useContext } from 'react';
import DBQueryContext, { DBQuery } from '@/contexts/DBQuery';
import UserInstanceMaster from '@/components/tiles/userInstance/Userinstance';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';

export default function MasterDetailsSidebar() {
   const { doc, isLoading } = useContext(DBQueryContext);
   const openedPositions = [];
   const userUID = doc?.user?._id;

   if (isLoading) {
      return <></>;
   }

   doc?.slots.map(slot => {
      slot.trades.map(position => (position.status === 'opened') && openedPositions.push(position));
   });

   return <>
      <DBQuery type="doc" collection="user_instances" filter={doc?.user?.userInstance} subscribe={true}>
         <UserInstanceMaster />

         <div className="opened-positions">
            <ContentHeader>
               <h3 className="header-title">Opened Positions</h3>
            </ContentHeader>
            <PositionsTable positionsSet={openedPositions} />
         </div>

         <div className="master-accounts">
            <ContentHeader>
               <h3 className="header-title">Master Accounts</h3>
            </ContentHeader>

            <DBQuery type="query" collection="master_accounts" filter={{ user: userUID, $nor: [{ _id: doc._id }] }}>
               <MastersGrid verticalAlign={true} />
            </DBQuery>
         </div>
      </DBQuery>
   </>;
}
