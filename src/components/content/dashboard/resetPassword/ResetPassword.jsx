'use client';

import Card from "@/components/common/card/Card";
import ResetPasswordForm from "@/components/forms/resetPasswordForm/ResetPasswordForm";
import APIContext from "@/contexts/4HandsAPI";
import { useRouter } from "next/navigation";
import { useContext } from "react";

/**
 * `ResetPassword` is a React component that handles the email confirmation process.
 * It uses the provided confirmation token to confirm the email address via an API call.
 * 
 * @param {Object} props - The props object.
 * @param {string} props.confirmationToken - The token used to confirm the email address.
 * 
 * @returns {JSX.Element} An empty React fragment.
 */
export default function ResetPassword({ useremail, resettoken }) {
   const API = useContext(APIContext);
   const router = useRouter();

   const onSubmit = async (data) => {
      try {
         debugger
         const changed = await API.ajax.authPut('/auth/reset-password/create-new', {
            newPassword: data.password,
            confirmPassword: data.confirmPassword,
            useremail,
            resettoken
         });
         
         if (changed.success) {
            // Redirect to login page
            router.push('/dashboard/login');
         }
      } catch (err) {
         throw err;
      }
   }

   return (
      <div className="reset-pasword">
         <Card className="info-card">
            <div className="title-wrap">
               <h1 className="card-title">Reset Password</h1>
            </div>

            <p>Reset your password by entering a new one below.</p>

            <ResetPasswordForm onSubmit={onSubmit} />
         </Card>
      </div>
   );
}
