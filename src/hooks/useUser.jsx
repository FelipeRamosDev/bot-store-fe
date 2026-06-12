import APIContext from "@/contexts/4HandsAPI";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import useFilesBucket from "./useFilesBucket";
import AuthUserContext from "@/contexts/AuthUser";

export default function useUser() {
   const API = useContext(APIContext);
   const auth = useContext(AuthUserContext);
   const { uploadFile, uploading, getFileUrl } = useFilesBucket();
   const router = useRouter();
   const user = auth?.user;

   async function register(parsedBody) {
      try {
         const created = await API.auth.register(parsedBody, '/user/signup');

         if (created) {
            const url = new URL(window.location);

            url.pathname = '/dashboard';
            url.searchParams.set('confirmationsent', 'true');
            router.push(url.toString());
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
            const url = new URL(window.location);

            if (url.searchParams.get('redirect')) {
               const redirectPath = url.searchParams.get('redirect');

               url.searchParams.delete('redirect');
               router.push(redirectPath);
            } else {
               router.push('/dashboard');
            }
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

   async function uploadAvatar(file) {
      if (!user) {
         throw new Error('User not defined! It is necessary to be logged in to upload an avatar.');
      }

      try {
         const fileName = `avatar_${user?._id}`;
         const { filePath } = await uploadFile(file, 'user/avatar', { fileName });
         return filePath;
      } catch (err) {
         throw err;
      }
   }

   return {
      register,
      login,
      update,
      editMyProfile,
      forgotPassword,
      avatar: {
         uploadAvatar,
         uploading,
         getFileUrl
      }
   };
}
