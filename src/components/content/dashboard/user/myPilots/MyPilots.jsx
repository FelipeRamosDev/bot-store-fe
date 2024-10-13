'use client';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotsTable from '@/components/tables/botsTable/BotsTable';
import AuthUserContext from '@/contexts/AuthUser';
import { DBQuery } from '@/contexts/DBQuery';
import { useContext } from 'react';

export default function MyBots() {
   const { user } = useContext(AuthUserContext);

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
               sort={{ modifiedAt: -1 }}
               limit={10}
            >
               <BotsTable hideHeader={true} />
            </DBQuery>}
         </ContentFullwidth>
      </div>
   );
}
