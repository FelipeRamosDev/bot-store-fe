'use client';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import BotThread from '@/components/tiles/bot/botThread/BotThread';
import FunctionsIcon from '@mui/icons-material/Functions';
import AddThreadsMenu from '@/components/menus/dropdown/addThreadsMenu/AddThreadsMenu';


export default function BotThreads() {
   return (
      <div className="full-container">
         <ContentHeader Toolbar={() => <AddThreadsMenu />}>
            <FunctionsIcon fontSize="small" /> <h2 className="header-title">Bot Threads</h2>
         </ContentHeader>

         <BotThread threadID="openLong" title="Open Long" color="success" />
         <BotThread threadID="openShort" title="Open Short" color="error" />
         <BotThread threadID="closeLong" title="Close Long" color="error" />
         <BotThread threadID="closeShort" title="Close Short" color="success" />
      </div>
   );
}
