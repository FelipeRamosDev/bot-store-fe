import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import CreatePlanModal from "@/components/modals/createPlanModal/CreatePlanModal";
import PlanQuickview from "@/components/modals/quickviews/planQuickview/PlanQuickview";
import PlansTable from "@/components/tables/plansTable/PlansTable";
import { DBQuery } from "@/contexts/DBQuery";
import { DataArray, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHomeContent() {
   const [newPlanModal, setNewPlanModal] = useState(false);
   const router = useRouter();

   return (<>
      <DBQuery
         type="query"
         collection="plans"
         sort={{ createdAt: -1 }}
         limit={6}
      >
         <ContentHeader Toolbar={() => <RoundIconButton Icon={Add} onClick={() => setNewPlanModal(true)} />}>
            <DataArray /> <h2 className="card-title">Subscription Plans</h2>
         </ContentHeader>

         <PlansTable />
         <PlanQuickview setModal={() => router.push("/admin")} />
      </DBQuery>

      <CreatePlanModal open={newPlanModal} setModal={setNewPlanModal} />
   </>);
}
