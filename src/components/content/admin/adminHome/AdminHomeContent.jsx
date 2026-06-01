
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import SubscriptionsTable from "@/components/tables/stripe/subscriptionsTable/SubscriptionsTable";
import TransactionsTable from "@/components/tables/stripe/transactionsTable/TransactionsTable";
import { DataArray } from "@mui/icons-material";

export default function AdminHomeContent() {
   return (<>
      <div className="widget-wrapper">
         <ContentHeader>
            <DataArray /> <h2 className="card-title">Subscriptions</h2>
         </ContentHeader>
         <SubscriptionsTable />
      </div>

      <div className="widget-wrapper">
         <ContentHeader>
            <DataArray /> <h2 className="card-title">Transactions</h2>
         </ContentHeader>
         <TransactionsTable />
      </div>
   </>);
}
