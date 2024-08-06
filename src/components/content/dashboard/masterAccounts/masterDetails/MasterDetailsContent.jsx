'use client';
import { useContext } from 'react';
import DBQueryContext from "@/contexts/DBQuery";
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import Card from '@/components/common/card/Card';

export default function MasterDetailsContent() {
   const { doc, isLoading } = useContext(DBQueryContext);

   if (isLoading) {
      return <PageSpinner spinner={isLoading ? 'Loading Account' : false}  />
   }

   return <>
      <ContentSplit breakpoint="l">
         <span>Content A</span>
         
         <Card padding="s" elevation={25}>
            <h3 className="card-title">Content B</h3>
         </Card>
      </ContentSplit>
   </>;
}
