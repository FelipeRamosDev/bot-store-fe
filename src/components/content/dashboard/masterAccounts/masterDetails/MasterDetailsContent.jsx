'use client';
import { useContext } from 'react';
import DBQueryContext from "@/contexts/DBQuery";
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import MasterPnlGrid from '@/components/grids/masterPnlGrid/MasterPnlGrid';
import WalletGrid from '@/components/grids/walletGrid/WalletGrid';
import SlotsGrid from '@/components/grids/slotsGrid/SlotsGrid';

export default function MasterDetailsContent() {
   const { doc, isLoading } = useContext(DBQueryContext);

   if (isLoading) {
      return <PageSpinner spinner={isLoading ? 'Loading Account' : false}  />
   }

   return <>
      <ContentSplit breakpoint="xl">
         <MasterPnlGrid master={doc} />
         <WalletGrid master={doc} />
      </ContentSplit>

      <SlotsGrid slots={doc.slots} masterType={doc.type} />
   </>;
}
