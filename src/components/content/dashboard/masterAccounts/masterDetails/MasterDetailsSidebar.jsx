'use client';
import { useContext } from 'react';
import DBQueryContext, { DBQuery } from '@/contexts/DBQuery';
import UserInstanceTile from '@/components/tiles/userInstanceTile/UserinstanceTile';

export default function MasterDetailsSidebar() {
   const { doc, isLoading } = useContext(DBQueryContext);

   if (isLoading) {
      return <></>;
   }

   return <>
      <DBQuery type="doc" collection="user_instances" filter={doc?.user?.userInstance} subscribe={true}>
         <UserInstanceTile />
      </DBQuery>
   </>;
}
