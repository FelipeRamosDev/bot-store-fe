import APIContext from "@/contexts/4HandsAPI";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function useUser() {
   const API = useContext(APIContext);
   const router = useRouter();

   async function register(parsedBody) {
      try {
         const created = await API.auth.register(parsedBody, '/user/signup');

         if (created) {
            router.push('/dashboard?confirmationsent=true');
         }
      } catch (err) {
         throw err;
      }
   }

   async function login(parsedBody) {
      try {
         const logged = await API.auth.login(parsedBody.email, parsedBody.password, '/user/signin');

         if (logged.error) {
            throw logged;
         }

         if (logged) {
            router.push('/dashboard');
         }
      } catch (err) {
         if (err.name === 'USER_EMAIL_NOT_CONFIRMED') {
            return router.push('/dashboard');
         }

         throw err;
      }
   }

   async function update(userUID, toUpdate) {
      try {
         const updated = await API.ajax.authPost('/user/update', { userUID, toUpdate });

         if (updated.error) {
            throw updated;
         }

         return updated;
      } catch (err) {
         throw err;
      }
   }

   async function editMyProfile(toUpdate) {
      try {
         const updated = await API.ajax.authPost('/user/edit-profile', { toUpdate });

         if (updated.error) {
            throw updated;
         }

         return updated;
      } catch (err) {
         throw err;
      }
   }

   async function forgotPassword(parsedBody, setIsSent) {
      try {
         const sent = await API.ajax.authPost('/auth/reset-password/send-email', { email: parsedBody.email });

         if (sent.success) {
            setIsSent('success');
         } else {
            setIsSent('fail');
         }
      } catch (err) {
         setIsSent('fail');
         throw err;
      }
   }

   return { register, login, update, editMyProfile, forgotPassword };
}
