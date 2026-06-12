import AJAX from "4hands-api/client/services/AJAX";
import { useState } from "react";

const FILE_BUCKET_HOST = process.env.NEXT_PUBLIC_FILE_BUCKET_HOST;

export default function useFilesBucket() {
   const [uploading, setUploading] = useState(false);

   const ajax = new AJAX({
      rootURL: FILE_BUCKET_HOST,
      rejectUnauthorized: false
   });

   async function uploadFile(file, bucket = 'default', options = {}) {
      const { fileName } = options;

      try {
         setUploading(true);
         return await ajax.upload('/files', file, { bucket, fileName });
      } finally {
         setUploading(false);
      }
   }

   async function deleteFile(filePath) {
      return ajax.delete('/files', { params: { filePath } });
   }

   function getFileUrl(fileName, bucket = 'default') {
      return `${FILE_BUCKET_HOST}/static/${bucket}/${fileName}`;
   }

   return { uploading, uploadFile, deleteFile, getFileUrl };
}
