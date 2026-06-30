'use client';

import { useContext } from 'react';
import { DBQuery } from '@/contexts/DBQuery';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotsTable from '@/components/tables/botsTable/BotsTable';
import AuthUserContext from '@/contexts/AuthUser';
import LogoIcon from '@/components/common/logo/LogoIconLight';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import MyPilotsMenu from '@/components/menus/dropdown/myPilotsMenu/MyPilotsMenu';
import MyPilotsStatusFilter from '@/components/filters/myPilotsStatusFilter/MyPilotsStatusFilter';

export default function MyPilots() {
   const { user } = useContext(AuthUserContext);

   return (
      <div className="my-pilots">
         <ContentFullwidth className="content" useContainer={true}>
            {user && <DBQuery
               type="query"
               collection="bots"
               filter={{ ownership: user._id }}
               sort={{ 'currentResults.profitRatio': -1 }}
               limit={10}
            >
               <ContentHeader className="page-header" useContainer={true}>
                  <LogoIcon fontSize={45} />
                  <h1 className="page-title">My Pilots</h1>

                  <MyPilotsStatusFilter />
                  <MyPilotsMenu />
               </ContentHeader>

               <BotsTable hideHeader={true} />
            </DBQuery>}
         </ContentFullwidth>
      </div>
   );
}
