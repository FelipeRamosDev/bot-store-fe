'use client';
import { useContext } from 'react';
import { DBQuery } from '@/contexts/DBQuery';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotsTable from '@/components/tables/botsTable/BotsTable';
import AuthUserContext from '@/contexts/AuthUser';
import CreateBotFloatButton from '@/components/buttons/createBotFloatButton/CreateBotFloatButton';
import LogoIcon from '@/components/common/logo/LogoIconLight';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DesignServices from '@mui/icons-material/DesignServices';

export default function MyBots() {
   const { user } = useContext(AuthUserContext);

   return (
      <div className="my-pilots">
         <ContentFullwidth className="content" useContainer={true}>
            <ContentHeader className="page-header" useContainer={true}>
               <LogoIcon fontSize={45} /> <h1 className="page-title">My Pilots</h1>
            </ContentHeader>

            {user && <DBQuery
               type="query"
               collection="bots"
               filter={{ author: user._id, $nor: [{ status: 'draft' }] }}
               sort={{ 'currentResults.profitRatio': -1 }}
               limit={10}
            >
               <BotsTable hideHeader={true} />
            </DBQuery>}

            <div className="draft-accordion">
               <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                     <div className="title-wrap">
                        <DesignServices className="draft-icon" /> Pilot Drafts
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     {user && <DBQuery
                        type="query"
                        collection="bots"
                        filter={{
                           author: user._id,
                           $nor: [
                              { status: 'private' },
                              { status: 'public' },
                           ]
                        }}
                        sort={{ 'currentResults.profitRatio': -1 }}
                        limit={5}
                     >
                        <BotsTable hideHeader={true} />
                     </DBQuery>}
                  </AccordionDetails>
               </Accordion>
            </div>
         </ContentFullwidth>

         <CreateBotFloatButton />
      </div>
   );
}
