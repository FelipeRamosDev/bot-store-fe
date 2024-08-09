'use client';
import { useContext } from 'react';
import DBQueryContext, { DBQuery } from "@/contexts/DBQuery";
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import MasterPnlGrid from '@/components/grids/masterPnlGrid/MasterPnlGrid';
import WalletGrid from '@/components/grids/walletGrid/WalletGrid';
import SlotsGrid from '@/components/grids/slotsGrid/SlotsGrid';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';

export default function MasterDetailsContent() {
   const { doc, isLoading } = useContext(DBQueryContext);
   const masterUID = doc?._id;

   if (isLoading) {
      return <PageSpinner spinner={isLoading ? 'Loading Account' : false}  />
   }

   return <>
      <ContentSplit breakpoint="xl">
         <MasterPnlGrid master={doc} />
         <WalletGrid master={doc} />
      </ContentSplit>

      <SlotsGrid slots={doc.slots} master={doc} />

      <DBQuery
         type="query"
         collection="positions"
         filter={{ status: 'closed', master: masterUID }}
         sort={{ pnl: -1 }}
         subscribe={true}
      >
         <div className="closed-positions">
            <ContentHeader>
               <h3 className="header-title">Closed Positions</h3>
            </ContentHeader>

            <PositionsTable />
         </div>
      </DBQuery>
   </>;
}
