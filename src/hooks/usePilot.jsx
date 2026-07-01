import APIContext from "@/contexts/4HandsAPI";
import useFilesBucket from "./useFilesBucket";
import { useContext } from "react";
import DBQueryContext from "@/contexts/DBQuery";

export default function usePilot() {
   const { uploading, uploadFile } = useFilesBucket();
   const instance = useContext(APIContext);
   const pilot = useContext(DBQueryContext);
   const { doc } = pilot || {};

   async function getPilotVersions(pilotUID) {
      try {
         const list = await instance.ajax.authGet('/bot/version/list', { pilotUID });

         if (!list) {
            throw new Error('Failed to fetch pilot versions');
         }

         return list;
      } catch (error) {
         console.error('Error fetching pilot versions:', error);
         throw error;
      }
   }

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

   async function newVersion(pilotUID) {
      try {
         const response = await instance.ajax.authPost('/bot/version/new-version', { pilotUID });

         if (!response || response.error) {
            throw new Error('Failed to create new bot version');
         }

         return response;
      } catch (error) {
         console.error('Error creating new bot version:', error);
         throw error;
      }
   }

   async function switchVersion(pilotUID, version) {
      try {
         const response = await instance.ajax.authPost('/bot/version/switch-version', { pilotUID, version });

         if (!response || response.error) {
            throw new Error('Failed to switch bot version');
         }

         return response;
      } catch (error) {
         console.error('Error switching bot version:', error);
         throw error;
      }
   }

   async function getPilotResults(pilotUID) {
      try {
         const response = await instance.ajax.authGet('/bot/results', { botUID: pilotUID });

         if (!response || response.error) {
            throw new Error('Failed to fetch pilot results');
         }

         return response.results;
      } catch (error) {
         console.error('Error fetching pilot results:', error);
         throw error;
      }
   }

   async function createThread(eventName) {
      try {
         const created = await instance.ajax.authPut('/bot/add-thread', {
            eventName: eventName,
            botUID: doc._id
         });

         if (created.error) {
            throw created;
         }

         return created;
      } catch (err) {
         throw err;
      }
   }

   return { uploading, uploadAvatar, exportJSON, importJSON, newVersion, switchVersion, getPilotVersions, getPilotResults, createThread };
}
