'use client';
import { useContext } from 'react';
import DBQueryContext from "@/contexts/DBQuery";
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import Card from '@/components/common/card/Card';
import MasterPnlGrid from '@/components/grids/masterPnlGrid/MasterPnlGrid';
import PNLTile from '@/components/tiles/pnlTile/PNLTile';

export default function MasterDetailsContent() {
   const { doc, isLoading } = useContext(DBQueryContext);

   if (isLoading) {
      return <PageSpinner spinner={isLoading ? 'Loading Account' : false}  />
   }

   return <>
      <ContentSplit breakpoint="xl">
         <MasterPnlGrid master={doc} />
         
         <div className="pnl-grid mini-tile" padding="s" elevation={25}>
            <PNLTile
               borderSide="left"
               label="Acumulated PNL"
               size="xl"
               value={doc.pnl}
            />

            <PNLTile
               borderSide="left"
               label="Unrealized PNL"
               size="xl"
               value={doc.futuresWallet?.totalUnrealizedProfit}
            />

            <PNLTile
               borderSide="left"
               label="Realized PNL"
               size="xl"
               value={doc.futuresWallet?.totalRealizedPnl}
            />

            <PNLTile
               borderSide="bottom"
               label="Total Wallet"
               size="xl"
               noColor={true}
               value={doc.futuresWallet?.totalWalletBalance}
            />
         </div>
      </ContentSplit>
   </>;
}
