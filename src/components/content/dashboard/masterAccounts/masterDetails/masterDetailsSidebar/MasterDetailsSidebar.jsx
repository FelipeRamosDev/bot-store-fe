'use client';
import { useContext } from 'react';
import DBQueryContext, { DBQuery } from '@/contexts/DBQuery';
import UserInstanceMaster from '@/components/tiles/userInstance/Userinstance';
import AccountSettings from '../../../../../shared/accountSettings/AccountSettings';
import MoreMasterAccounts from './MoreMasterAccounts';
import MasterSchedules from './MasterSchedules';

/**
 * MasterDetailsSidebar component displays detailed information and settings related to a master account.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.setUInstance - Function to set the user instance data.
 * @returns {JSX.Element} The rendered component.
 */
export default function MasterDetailsSidebar({ setUInstance }) {
   const { doc, isLoading } = useContext(DBQueryContext);
   const userInstanceUID = doc?.user?.userInstance;

   if (isLoading) {
      return <></>;
   }

   return (
      <>
         <DBQuery 
            type="doc" 
            collection="user_instances" 
            filter={userInstanceUID} 
            subscribe={true} 
            onData={(data) => setUInstance(data)}
         >
            <UserInstanceMaster />
         </DBQuery>  
         
         <AccountSettings account={doc} />
         <MasterSchedules master={doc} />
         <MoreMasterAccounts master={doc} />
      </>
   );
}
