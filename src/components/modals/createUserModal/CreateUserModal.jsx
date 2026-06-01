import RegisterForm from "@/components/forms/registerForm/RegisterForm";
import ContentModal from "../base/contentModal/ContentModal";
import { register } from "@/components/content/dashboard/login/Login.helper";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import APIContext from "@/contexts/4HandsAPI";

export default function CreateUserModal({ open, onClose }) {
   const API = useContext(APIContext);
   const router = useRouter();
   const handleRegister = (data) => register(data, API, router);

   return (
      <ContentModal
         title="Create New User"
         open={open}
         onClose={onClose}
         size="medium"
         padding="s"
      >
         <RegisterForm onSubmit={handleRegister} />
      </ContentModal>
   )
}
