import APIContext from "@/contexts/4HandsAPI";
import { useContext } from "react";

export default function useAdmin() {
   const API = useContext(APIContext);

   async function createUser(parsedBody) {
      try {
         const created = await API.ajax.authPost('/user/create', parsedBody);

         if (created.error) {
            throw created;
         }
         
         return { success: true, data: created };
      } catch (err) {
         throw err;
      }
   }

   return {
      createUser
   };
}
