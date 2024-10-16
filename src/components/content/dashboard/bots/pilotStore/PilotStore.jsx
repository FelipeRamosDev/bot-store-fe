import ContentFullwidth from "@/components/layout/contentFullwidth/ContentFullwidth";
import BotsTable from "@/components/tables/botsTable/BotsTable";
import { DBQuery } from "@/contexts/DBQuery";

export default function PilotStore() {
   return (
      <div className="pilot-store">
         <ContentFullwidth className="page-header" useContainer={true}>
            <h1 className="page-title">Pilot Store</h1>
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
