import DBQueryContext from "@/contexts/DBQuery";
import ContentModal from "../../base/contentModal/ContentModal";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { Cancel, Edit } from "@mui/icons-material";
import RegisterForm from "@/components/forms/registerForm/RegisterForm";
import useUser from "@/hooks/useUser";
import UserInfos from "@/components/shared/userInfos/UserInfos";
import UserRelated from "@/components/shared/userRelated/UserRelated";

export default function UserQuickview({ setModal = () => { } }) {
   const { query = [] } = useContext(DBQueryContext);
   const [editUser, setEditUser] = useState(false);
   const { update } = useUser();
   const searchParams = useSearchParams();
   const userIndex = searchParams.get("user");
   const isOpen = !!userIndex;
   const router = useRouter();

   const user = query.find(item => item.index === Number(userIndex));
   const billingAddress = user?.billingAddress || {};

   const handleUpdate = async (data) => {
      try {
         await update(user._id, data);
         router.refresh();
      } catch (error) {
         console.error("Error updating user:", error);
      }
   }

   const EditToolbar = useCallback(() => {
      if (!editUser) {
         return <RoundIconButton Icon={Edit} onClick={() => setEditUser(true)} />;
      } else {
         return <RoundIconButton Icon={Cancel} color="error" onClick={() => setEditUser(false)} />;
      }
   }, [editUser]);

   useEffect(() => {
      return () => setEditUser(false);
   }, [isOpen]);

   return (
      <ContentModal
         className="user-quickview"
         title={`User Quickview`}
         open={isOpen}
         padding="m"
         size="large"
         onClose={() => setModal(null)}
      >
         <ContentHeader Toolbar={EditToolbar}>
            <h3>{user?.fullName}</h3>
         </ContentHeader>

         {editUser && <RegisterForm onSubmit={handleUpdate} editData={user} />}
         {!editUser && <UserInfos user={user} billingAddress={billingAddress} hideSubscriptionBtn />}

         <UserRelated user={user} />
      </ContentModal>
   );
}
