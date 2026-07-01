import RegisterForm from "@/components/forms/registerForm/RegisterForm";
import ContentModal from "../base/contentModal/ContentModal";
import useAdmin from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";

export default function CreateUserModal({ open, onClose }) {
   const { createUser } = useAdmin();
   const router = useRouter();

   const handleRegister = async (data) => {
      try {
         if (data.rules.includes('agent')) {
            data.isAgent = true;
         }

         const result = await createUser(data);
         if (!result.success) {
            // Handle error
            throw new Error(result.data?.message || "Failed to create user");
         }

         onClose();
         router.refresh();
         return result;
      } catch (error) {
         throw new Error(error.message);
      }
   };

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
