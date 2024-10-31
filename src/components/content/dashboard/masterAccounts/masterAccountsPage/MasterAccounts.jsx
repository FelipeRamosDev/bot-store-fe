'use client';
import { useContext } from 'react';
import { DBQuery } from '@/contexts/DBQuery';
import MasterAccountsContent from './MasterAccountsContent';
import AuthUserContext from '@/contexts/AuthUser';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';

/**
 * MasterAccounts component renders a page layout for master accounts.
 * It uses ContentSidebar to provide a structured layout with a sidebar.
 *
 * @returns {JSX.Element} The rendered component with a title and sidebar.
 */
export default function MasterAccounts() {
   const { user } = useContext(AuthUserContext);

   return (
      <ContentFullwidth useContainer>
         {user && <DBQuery
            type="query"
            collection="master_accounts"
            filter={{ user: user._id }}
            limit={10}
            sort={{ pnl: -1 }}
         >
            <MasterAccountsContent />
         </DBQuery>}
      </ContentFullwidth>
   );
}
