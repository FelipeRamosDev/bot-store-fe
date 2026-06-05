
import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import CreateUserModal from "@/components/modals/createUserModal/CreateUserModal";
import UserQuickview from "@/components/modals/quickviews/userQuickview/UserQuickview";
import SubscriptionsTable from "@/components/tables/stripe/subscriptionsTable/SubscriptionsTable";
import UsersTable from "@/components/tables/usersTable/UsersTable";
import { DBQuery } from "@/contexts/DBQuery";
import { Add, DataArray } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHomeContent() {
   const [ createUserModal, setCreateUserModal ] = useState(false);
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
         <ContentHeader>
            <DataArray /> <h2 className="card-title">Subscriptions</h2>
         </ContentHeader>
         <SubscriptionsTable />
      </div>

      {createUserModal && <CreateUserModal open={createUserModal} onClose={() => setCreateUserModal(false)} />}
   </>);
}
