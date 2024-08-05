'use client';
import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';
import SlotsTable from '@/components/tables/slotsTable/SlotsTable';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import { DBQuery } from '@/contexts/DBQuery';
import { useContext } from 'react';
import AuthUserContext from "@/contexts/AuthUser";

export default function DashboardContent({ createMasterModal }) {
   const { user } = useContext(AuthUserContext);

   if (!user) {
      return <></>;
   }

   return <>
      <DBQuery
         type="query"
         collection="master_accounts"
         filter={{ user: user._id }}
         sort={{ pnl: -1 }}
         limit={10}
         subscribe={true}
      >
        <MastersGrid createMasterModal={createMasterModal} />
      </DBQuery>

      <div className="slots-positions">
         <div className="column">
            <h2 className="card-title">Slots</h2>

            <DBQuery
               type="query"
               collection="slots"
               filter={{ user: user._id }}
               sort={{ pnl: -1 }}
               limit={7}
               subscribe={true}
            >
               <SlotsTable />
            </DBQuery>
         </div>

         <div className="column">
            <h2 className="card-title">Positions</h2>

            <DBQuery
               type="query"
               collection="positions"
               filter={{ user: user._id }}
               sort={{ modifiedAt: -1 }}
               limit={7}
               subscribe={true}
            >
               <PositionsTable />
            </DBQuery>
         </div>
      </div>
   </>;
}
