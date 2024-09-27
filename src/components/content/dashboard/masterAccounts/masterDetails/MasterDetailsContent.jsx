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
import CryptoCandlestickChart from '@/components/charts/cryptoCandlestickChart/CryptoCandlestickChart';
import Card from '@/components/common/card/Card';
import MasterClosedPositions from './MasterClosedPositions';

/**
 * MasterDetailsContent component displays detailed information about a master account,
 * including performance metrics, wallet details, ongoing positions, slots, and closed positions.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.uInstance - The user instance data.
 * @param {Function} props.setEditSlotModal - Function to open or close the create/edit slot modal.
 * @param {Function} props.setDeleteConfirmDialog - Function to open or close the delete slot confirmation dialog.
 * @returns {JSX.Element} The rendered component.
 */
export default function MasterDetailsContent({ uInstance, setEditSlotModal, setDeleteConfirmDialog }) {
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
                  trade.botSlot = slot;
               }

               positions.push(trade);
            }
         });
      })
   }

   return <>
      <ContentSplit breakpoint="l">
         <MasterPnlGrid master={doc} />
         <WalletGrid master={doc} />
      </ContentSplit>

      {positions.length > 0 && <PositionsGrid title="Ongoing Positions" positions={positions} />}
      <SlotsGrid slots={doc.slots} master={doc} uInstance={uInstance} setEditSlotModal={setEditSlotModal} setDeleteConfirmDialog={setDeleteConfirmDialog} />

      <DBQuery
         type="query"
         collection="positions"
         filter={{ status: 'closed', master: masterUID }}
         sort={{ closeTime: -1 }}
         limit={11}
      >
         <MasterClosedPositions />
      </DBQuery>
   </>;
}
