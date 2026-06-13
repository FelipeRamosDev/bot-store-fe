import useFilesBucket from "./useFilesBucket";

export default function usePilot() {
   const { uploading, uploadFile } = useFilesBucket();

   async function uploadAvatar(file, pilotUID) {
      if (!file) {
         throw new Error('No file provided for upload');
      }

      if (!pilotUID) {
         throw new Error('No pilot UID provided for upload');
      }

      return await uploadFile(file, 'pilot/avatar', { fileName: `pilot_avatar_${pilotUID}` });
   }

   return { uploading, uploadAvatar };
}
