'use client';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';

export default function MasterDetailsSidebar() {
   const { doc, isLoading } = useContext(DBQueryContext);

   if (isLoading) {
      return <></>;
   }

   return <>
      Sidebar
   </>;
}
