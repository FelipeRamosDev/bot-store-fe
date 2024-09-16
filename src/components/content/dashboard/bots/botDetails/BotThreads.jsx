'use client';
import { useContext } from 'react';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import BotThread from '@/components/tiles/bot/botThread/BotThread';
import FunctionsIcon from '@mui/icons-material/Functions';
import AddThreadsMenu from '@/components/menus/dropdown/addThreadsMenu/AddThreadsMenu';
import APIContext from '@/contexts/4HandsAPI';
import DBQueryContext from '@/contexts/DBQuery';


export default function BotThreads() {
   const API = useContext(APIContext);
   const { doc = {} } = useContext(DBQueryContext);

   async function createThread(threadID) {
      try {
         const created = await API.ajax.authPut('/bot/add-thread', {
            eventName: threadID,
            botUID: doc._id
         });

         if (created.error) {
            throw created;
         }
      } catch (err) {
         throw err;
      }
   }

   return (
      <div className="full-container">
         <ContentHeader Toolbar={() => <AddThreadsMenu createThread={createThread} />}>
            <FunctionsIcon fontSize="small" /> <h2 className="header-title">Bot Threads</h2>
         </ContentHeader>

         <BotThread threadID="openLong" title="Open Long" color="success" createThread={createThread} />
         <BotThread threadID="openShort" title="Open Short" color="error" createThread={createThread} />
         <BotThread threadID="closeLong" title="Close Long" color="error" createThread={createThread} />
         <BotThread threadID="closeShort" title="Close Short" color="success" createThread={createThread} />
      </div>
   );
}
