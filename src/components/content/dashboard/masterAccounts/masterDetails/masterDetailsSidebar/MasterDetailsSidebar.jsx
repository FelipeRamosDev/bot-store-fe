'use client';
import { useContext } from 'react';
import DBQueryContext, { DBQuery } from '@/contexts/DBQuery';
import UserInstanceMaster from '@/components/tiles/userInstance/Userinstance';
import AccountSettings from '../../../../../shared/accountSettings/AccountSettings';
import MoreMasterAccounts from './MoreMasterAccounts';
import MasterSchedules from './MasterSchedules';

export default function MasterDetailsSidebar() {
   const { doc, isLoading } = useContext(DBQueryContext);
   const userInstanceUID = doc?.user?.userInstance;

   if (isLoading) {
      return <></>;
   }

   return <>
      <DBQuery type="doc" collection="user_instances" filter={userInstanceUID} subscribe={true}>
         <UserInstanceMaster />
      </DBQuery>  
       
      <AccountSettings account={doc} />
      <MasterSchedules master={doc} />
      <MoreMasterAccounts master={doc} />
   </>;
}
