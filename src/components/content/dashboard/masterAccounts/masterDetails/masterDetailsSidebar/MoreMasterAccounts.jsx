import { DBQuery } from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';

/**
 * MoreMasterAccounts component displays additional master accounts associated with a user, excluding the current master.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.master - The current master account data.
 * @param {string} props.master._id - The unique identifier of the current master account.
 * @param {Object} props.master.user - The user associated with the master account.
 * @param {string} props.master.user._id - The unique identifier of the user.
 * @returns {JSX.Element} The rendered component.
 */
export default function MoreMasterAccounts({ master = {} }) {
   const userUID = master?.user?._id;

   return (
      <div className="master-accounts">
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
   );
}
