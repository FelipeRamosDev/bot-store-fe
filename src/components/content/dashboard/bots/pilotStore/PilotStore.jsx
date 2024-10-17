import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotsTable from '@/components/tables/botsTable/BotsTable';
import StoreIcon from '@mui/icons-material/Store';
import { DBQuery } from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';

export default function PilotStore() {
   return (
      <div className="pilot-store">
         <ContentFullwidth useContainer={true}>
            <ContentHeader className="page-header" useContainer={true}>
               <StoreIcon className="page-title-icon" /> <h1 className="page-title">Pilot Store</h1>
            </ContentHeader>
         </ContentFullwidth>

         <ContentFullwidth className="content" useContainer={true}>
            <DBQuery
               type="query"
               collection="bots"
               filter={{ status: 'public' }}
               sort={{ 'currentResults.profitRatio': -1 }}
               limit={10}
            >
               <BotsTable hideHeader={true} onSelectAction="modal" />
            </DBQuery>
         </ContentFullwidth>
      </div>
   )
}
