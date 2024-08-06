'use client';
import { useContext } from 'react';
import DBQueryContext from "@/contexts/DBQuery";
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import Card from '@/components/common/card/Card';
import PNLTile from '@/components/tiles/pnlTile/PNLTile';

export default function MasterDetailsContent() {
   const { doc, isLoading } = useContext(DBQueryContext);

   if (isLoading) {
      return <PageSpinner spinner={isLoading ? 'Loading Account' : false}  />
   }

   return <>
      <ContentSplit breakpoint="xl">
         <div>
            <PNLTile label="Day PNL" value={564.46} size="xl" borderSide="bottom" />
            <PNLTile type="percent" fractional={2} label="Day ROI" value={-552.46} size="xl" borderSide="bottom" />
         </div>
         
         <Card padding="s" elevation={25}>
            <h3 className="card-title">Content B</h3>
         </Card>
      </ContentSplit>
   </>;
}
