import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import MastersTable from "@/components/tables/mastersTable/MastersTable";
import PositionsTable from "@/components/tables/positionsTable/PositionsTable";
import SlotsTable from "@/components/tables/slotsTable/SlotsTable";
import TransactionsTable from "@/components/tables/stripe/transactionsTable/TransactionsTable";
import { DBQuery } from "@/contexts/DBQuery";

export default function UserRelated({ user }) {
   if (!user) {
      return null;
   }

   return (<>
      <ContentHeader>
         <h4 className="header-title">Master Accounts</h4>
      </ContentHeader>
      {user && <DBQuery type="query" collection="master_accounts" filter={{ user: user?._id }} limit={5}>
         <MastersTable />
      </DBQuery>}

      <ContentHeader>
         <h4 className="header-title">Slots</h4>
      </ContentHeader>
      {user && <DBQuery type="query" collection="slots" filter={{ user: user?._id }} limit={5}>
         <SlotsTable />
      </DBQuery>}

      <ContentHeader>
         <h4 className="header-title">Positions</h4>
      </ContentHeader>
      {user && <DBQuery type="query" collection="positions" filter={{ user: user?._id }} limit={5}>
         <PositionsTable />
      </DBQuery>}

      <ContentHeader>
         <h4 className="header-title">Transactions</h4>
      </ContentHeader>
      {user?.stripeCustomer?.id && <TransactionsTable customerId={user?.stripeCustomer?.id} />}
   </>);
}