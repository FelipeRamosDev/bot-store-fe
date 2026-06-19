import APIContext from "@/contexts/4HandsAPI";
import useFilesBucket from "./useFilesBucket";
import { useContext } from "react";

export default function usePilot() {
   const { uploading, uploadFile } = useFilesBucket();
   const instance = useContext(APIContext);

   async function exportJSON(botUID) {
      try {
        const botStrategy = await instance.ajax.authGet('/bot/export', { botUID });
        return botStrategy;
      } catch (error) {
         console.error('Error fetching bot strategy:', error);
         throw error;
      }
   }

   async function importJSON(botData) {
      try {
         const response = await instance.ajax.authPost('/bot/import', { botData });
         return response.bot;
      } catch (error) {
         console.error('Error importing bot strategy:', error);
         throw error;
      }
   }

   async function uploadAvatar(file, pilotUID) {
      if (!file) {
         throw new Error('No file provided for upload');
      }

      if (!pilotUID) {
         throw new Error('No pilot UID provided for upload');
      }

      return await uploadFile(file, 'pilot/avatar', { fileName: `pilot_avatar_${pilotUID}` });
   }

   return { uploading, uploadAvatar, exportJSON, importJSON };
}
