import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import UsersTable from "@/components/tables/usersTable/UsersTable";
import { DBQuery } from "@/contexts/DBQuery";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { DataArray, Add } from "@mui/icons-material";
import CreatePlanModal from "@/components/modals/createPlanModal/CreatePlanModal";
import PlanQuickview from "@/components/modals/quickviews/planQuickview/PlanQuickview";
import PlansTable from "@/components/tables/plansTable/PlansTable";
import UserQuickview from "@/components/modals/quickviews/userQuickview/UserQuickview";
import CreateUserModal from "@/components/modals/createUserModal/CreateUserModal";

export default function AdminHomeSidebar() {
   const [ createUserModal, setCreateUserModal ] = useState(false);
   const [newPlanModal, setNewPlanModal] = useState(false);
   const router = useRouter();

   return (<>
      <div className="widget-wrapper">
         <DBQuery
            type="query"
            collection="users"
            sort={{ createdAt: -1 }}
         >
            <ContentHeader Toolbar={() => <RoundIconButton Icon={Add} onClick={() => setCreateUserModal(true)} />}>
               <DataArray /> <h2 className="card-title">Users</h2>
            </ContentHeader>

            <UsersTable />
            <UserQuickview setModal={() => router.push("/admin")} />
         </DBQuery>
      </div>

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

      <CreatePlanModal open={newPlanModal} setModal={setNewPlanModal} />
      {createUserModal && <CreateUserModal open={createUserModal} onClose={() => setCreateUserModal(false)} />}
   </>);
}
