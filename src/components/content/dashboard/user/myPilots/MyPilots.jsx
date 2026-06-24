'use client';

import { useContext, useState } from 'react';
import { DBQuery } from '@/contexts/DBQuery';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotsTable from '@/components/tables/botsTable/BotsTable';
import AuthUserContext from '@/contexts/AuthUser';
import LogoIcon from '@/components/common/logo/LogoIconLight';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DesignServices from '@mui/icons-material/DesignServices';
import { DataObject } from '@mui/icons-material';
import usePilot from '@/hooks/usePilot';
import { useRouter } from 'next/navigation';
import RubberButton from '@/components/buttons/rubberButton/RubberButton';

export default function MyBots() {
   const { user } = useContext(AuthUserContext);
   const [loading, setLoading] = useState(false);
   const { importJSON } = usePilot();
   const router = useRouter();

   const handleImportJSON = () => {
      const fileInput = document.createElement('input');

      try {
         fileInput.type = 'file';
         fileInput.accept = 'application/json';

         fileInput.onchange = async (event) => {
            const file = event.target.files[0];

            if (file) {
               const reader = new FileReader();

               reader.onload = async (e) => {
                  setLoading(true);
                  const content = e.target.result;

                  try {
                     await importJSON(content);
                     router.refresh();
                  } catch (error) {
                     console.error('Error importing bot JSON:', error);
                  } finally {
                     setLoading(false);
                  }
               };

               reader.readAsText(file);
            }
         };

         fileInput.click();
      } catch (error) {
         console.error('Error importing bot JSON:', error);
      }
   };

   return (
      <div className="my-pilots">
         <ContentFullwidth className="content" useContainer={true}>
            <ContentHeader className="page-header" useContainer={true}>
               <LogoIcon fontSize={45} />
               <h1 className="page-title">My Pilots</h1>

               <RubberButton
                  variant="contained"
                  className="import-json-button"
                  startIcon={<DataObject />}
                  onClick={handleImportJSON}
                  disabled={loading}
               >{!loading ? 'Import JSON' : 'Importing'}</RubberButton>
            </ContentHeader>

            {user && <DBQuery
               type="query"
               collection="bots"
               filter={{ ownership: user._id, $nor: [{ status: 'draft' }] }}
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
                        sort={{ createdAt: -1 }}
                        limit={5}
                        filter={{
                           ownership: user._id,
                           status: 'draft'
                        }}
                     >
                        <BotsTable hideHeader={true} />
                     </DBQuery>}
                  </AccordionDetails>
               </Accordion>
            </div>
         </ContentFullwidth>
      </div>
   );
}
