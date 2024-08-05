'use client';
import { useContext } from 'react';
import DBQueryContext from "@/contexts/DBQuery";
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';

export default function MasterDetailsContent() {
   const { doc, isLoading } = useContext(DBQueryContext);

   if (isLoading) {
      return <PageSpinner spinner={isLoading ? 'Loading Account' : false}  />
   }

   return <>
      Content
   </>;
}
