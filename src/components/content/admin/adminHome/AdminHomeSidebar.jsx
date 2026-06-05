import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import { DBQuery } from "@/contexts/DBQuery";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { DataArray, Add } from "@mui/icons-material";
import CreatePlanModal from "@/components/modals/createPlanModal/CreatePlanModal";
import PlanQuickview from "@/components/modals/quickviews/planQuickview/PlanQuickview";
import PlansTable from "@/components/tables/plansTable/PlansTable";
import TransactionsTable from "@/components/tables/stripe/transactionsTable/TransactionsTable";

export default function AdminHomeSidebar() {
   const [newPlanModal, setNewPlanModal] = useState(false);
   const router = useRouter();

   return (<>
      <div className="widget-wrapper">
         <DBQuery
            type="query"
            collection="plans"
            sort={{ createdAt: -1 }}
            limit={6}
         >
            <ContentHeader Toolbar={() => <RoundIconButton Icon={Add} onClick={() => setNewPlanModal(true)} />}>
               <DataArray /> <h2 className="card-title">Plans</h2>
            </ContentHeader>

            <PlansTable />
            <PlanQuickview setModal={() => router.push("/admin")} />
         </DBQuery>
      </div>

      <div className="widget-wrapper">
         <ContentHeader>
            <DataArray /> <h2 className="card-title">Transactions</h2>
         </ContentHeader>
         <TransactionsTable />
      </div>

      <CreatePlanModal open={newPlanModal} setModal={setNewPlanModal} />
   </>);
}
