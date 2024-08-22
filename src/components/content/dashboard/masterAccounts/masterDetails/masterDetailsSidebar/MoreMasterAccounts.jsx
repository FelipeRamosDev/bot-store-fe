import { DBQuery } from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';

export default function MoreMasterAccounts({ master = {} }) {
   const userUID = master?.user?._id;

   return <div className="master-accounts">
      <ContentHeader>
         <h3 className="header-title">Master Accounts</h3>
      </ContentHeader>

      <DBQuery
         type="query"
         collection="master_accounts"
         filter={{
            user: userUID,
            $nor: [{ _id: master._id }]
         }}
      >
         <MastersGrid verticalAlign={true} />
      </DBQuery>
   </div>
}
