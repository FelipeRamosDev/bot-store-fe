import RegisterForm from "@/components/forms/registerForm/RegisterForm";
import ContentModal from "../base/contentModal/ContentModal";
import useUser from "@/hooks/useUser";

export default function CreateUserModal({ open, onClose }) {
   const { register } = useUser();
   const handleRegister = (data) => register(data);

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
