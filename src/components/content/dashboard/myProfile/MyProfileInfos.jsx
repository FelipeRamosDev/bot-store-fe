import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import RegisterForm from "@/components/forms/registerForm/RegisterForm";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import UserInfos from "@/components/shared/userInfos/UserInfos";
import UserRelated from "@/components/shared/userRelated/UserRelated";
import AuthUserContext from "@/contexts/AuthUser";
import useUser from "@/hooks/useUser";
import { Cancel, Edit } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function MyProfileInfos() {
   const { user } = useContext(AuthUserContext);
   const [editUser, setEditUser] = useState(false);
   const { editMyProfile } = useUser();
   const searchParams = useSearchParams();
   const editMode = searchParams.get('editMode') === 'true';
   const router = useRouter();

   if (!user) {
      return <></>;
   }

   const handleEditProfile = async (data) => {
      try {
         await editMyProfile(data);
         router.refresh();
         setEditUser(false);
      } catch (error) {
         throw error;
      }
   }

   const Toolbar = () => {
      if (editUser) {
         return <RoundIconButton Icon={Cancel} color="error" onClick={() => setEditUser(false)} />;
      } else {
         return <RoundIconButton Icon={Edit} onClick={() => setEditUser(true)} />;
      }
   }

   useEffect(() => {
      if (editMode) {
         setEditUser(true);
      }

      if (user && !user.billingAddress) {
         setEditUser(true);
      }
   }, [editMode, user]);

   return (
      <div className="my-profile-infos container">
         <ContentHeader Toolbar={Toolbar}>
            <h2 className="header-title">Personal Information</h2>
         </ContentHeader>

         {!editUser && <UserInfos user={user} billingAddress={user?.billingAddress} />}
         {editUser && <RegisterForm editData={user} onSubmit={handleEditProfile} />}
         <UserRelated user={user} />
      </div>
   )
}