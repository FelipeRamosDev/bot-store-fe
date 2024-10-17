'use client';
import { useContext, useState } from 'react';
import { DBQuery } from '@/contexts/DBQuery';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotsTable from '@/components/tables/botsTable/BotsTable';
import AuthUserContext from '@/contexts/AuthUser';
import CreateBotFloatButton from '@/components/buttons/createBotFloatButton/CreateBotFloatButton';

export default function MyBots() {
   const { user } = useContext(AuthUserContext);
   const [ createModal, setCreateModal ] = useState(false);

   return (
      <div className="my-pilots">
         <ContentFullwidth className="page-header" useContainer={true}>
            <h1 className="page-title">My Pilots</h1>
         </ContentFullwidth>

         <ContentFullwidth className="content" useContainer={true}>
            {user && <DBQuery
               type="query"
               collection="bots"
               filter={{ author: user._id }}
               sort={{ 'currentResults.profitRatio': -1 }}
               limit={10}
            >
               <BotsTable hideHeader={true} />
            </DBQuery>}
         </ContentFullwidth>

         <CreateBotFloatButton />
      </div>
   );
}
