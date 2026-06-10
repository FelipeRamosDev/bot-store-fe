import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import MastersTable from "@/components/tables/mastersTable/MastersTable";
import PositionsTable from "@/components/tables/positionsTable/PositionsTable";
import SlotsTable from "@/components/tables/slotsTable/SlotsTable";
import { DBQuery } from "@/contexts/DBQuery";
import { AccountBalanceWallet, DataArray, Money } from "@mui/icons-material";

export default function UserRelated({ user }) {
   if (!user) {
      return null;
   }

   return (<>

      <ContentHeader>
         <AccountBalanceWallet /> <h4 className="header-title">Master Accounts</h4>
      </ContentHeader>
      {user && <DBQuery type="query" collection="master_accounts" filter={{ user: user?._id }} limit={5}>
         <MastersTable />
      </DBQuery>}

      <ContentHeader>
         <DataArray /> <h4 className="header-title">Slots</h4>
      </ContentHeader>
      {user && <DBQuery type="query" collection="slots" filter={{ user: user?._id }} limit={5}>
         <SlotsTable />
      </DBQuery>}

      <ContentHeader>
         <Money /> <h4 className="header-title">Positions</h4>
      </ContentHeader>
      {user && <DBQuery type="query" collection="positions" filter={{ user: user?._id }} limit={5}>
         <PositionsTable />
      </DBQuery>}
   </>);
}