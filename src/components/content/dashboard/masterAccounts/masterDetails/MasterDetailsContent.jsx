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
import PositionsGrid from '@/components/grids/positionsGrid/PositionsGrid';

export default function MasterDetailsContent({ uInstance }) {
   const { doc, isLoading } = useContext(DBQueryContext);
   const masterUID = doc?._id;
   const positions = [];

   if (isLoading) {
      return <PageSpinner spinner={isLoading ? 'Loading Account' : false}  />
   }

   if (doc) {
      doc.slots.map(slot => {
         slot.trades.map(trade => {
            if (trade.status === 'opened') {
               if (!trade.botSlot?.name) {
                  trade.botSlot = { ...trade.botSlot, name: slot.name }
               }

               positions.push(trade);
            }
         });
      })
   }

   return <>
      <ContentSplit breakpoint="xl">
         <MasterPnlGrid master={doc} />
         <WalletGrid master={doc} />
      </ContentSplit>

      {positions.length > 0 && <PositionsGrid title="Ongoing Positions" positions={positions} />}
      <SlotsGrid slots={doc.slots} master={doc} uInstance={uInstance} />

      <DBQuery
         type="query"
         collection="positions"
         filter={{ status: 'closed', master: masterUID }}
         sort={{ closeTime: -1 }}
         subscribe={true}
      >
         <div className="closed-positions">
            <ContentHeader>
               <h3 className="header-title">Closed Positions</h3>
            </ContentHeader>

            <PositionsTable exclude={['type']} />
         </div>
      </DBQuery>
   </>;
}
