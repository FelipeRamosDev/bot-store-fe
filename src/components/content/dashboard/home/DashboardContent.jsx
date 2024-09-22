'use client';

import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';
import SlotsTable from '@/components/tables/slotsTable/SlotsTable';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import { DBQuery } from '@/contexts/DBQuery';
import { useContext } from 'react';
import AuthUserContext from "@/contexts/AuthUser";
import { DataArray, Money } from '@mui/icons-material';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import DashboardSlotTable from './DashboardSlotTable';
import DashboardPositionTable from './DashboardPositionTable';

/**
 * DashboardContent component displays the main content for the dashboard.
 * 
 * This component fetches and displays data based on the logged-in user's context.
 * It includes a grid for masters, a table for slots, and a table for positions.
 * 
 * @param {Object} props - The component's props.
 * @param {Function} props.createMasterModal - A callback function to handle the creation of a master modal.
 * 
 * @returns {JSX.Element} The rendered dashboard content.
 */
export default function DashboardContent({ createMasterModal }) {
   const { user } = useContext(AuthUserContext);

   // If the user is not authenticated, render nothing
   if (!user) {
      return <></>;
   }

   return <>
      {/* Masters Grid */}
      <DBQuery
         type="query"
         collection="master_accounts"
         filter={{ user: user._id }}
         sort={{ pnl: -1 }}
         subscribe={true}
      >
         <MastersGrid createMasterModal={createMasterModal} />
      </DBQuery>

      {/* Slots and Positions Tables */}
      <div className="slots-positions">
         <DBQuery
            type="query"
            collection="slots"
            filter={{ user: user._id }}
            sort={{ pnl: -1 }}
            limit={6}
         >
            <DashboardSlotTable />
         </DBQuery>

         <DBQuery
            type="query"
            collection="positions"
            filter={{ user: user._id }}
            sort={{ modifiedAt: -1 }}
            limit={6}
         >
            <DashboardPositionTable />
         </DBQuery>
      </div>
   </>;
}
