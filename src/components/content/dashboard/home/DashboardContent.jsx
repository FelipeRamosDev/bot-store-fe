'use client';

import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateMasterForm from '@/components/forms/createMasterForm/CreateMasterForm';
import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';
import { DBQuery } from '@/contexts/DBQuery';
import { useContext, useState } from 'react';
import AuthUserContext from "@/contexts/AuthUser";
import DashboardSlotTable from './DashboardSlotTable';
import DashboardPositionTable from './DashboardPositionTable';
import { Wallet } from '@mui/icons-material';
import SpeedDialButton from '@/components/buttons/speedDialButton/SpeedDialButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';

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
export default function DashboardContent() {
   const [ createMasterModal, setCreateMasterModal ] = useState(false);
   const [ createBotModal, setCreateBotModal ] = useState(false);
   const { user } = useContext(AuthUserContext);

   const addButtonOpt = [
      {
         Icon: <Wallet />,
         tooltipTitle: 'New Master',
         onClick: () => setCreateMasterModal(true)
      },
      {
         Icon: <SmartToyIcon />,
         tooltipTitle: 'New Pilot',
         onClick: () => setCreateBotModal(true)
      }
   ];

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
         sort={{ ['futuresWallet.totalRealizedPnl']: -1 }}
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

      <SpeedDialButton
         ariaLabel="Add Button"
         options={addButtonOpt}
      />
      
      {/* Modal for Creating a Master Account */}
      <ContentModal
         title="Create Master"
         padding="m"
         size="x-large"
         open={createMasterModal}
         onClose={() => setCreateMasterModal(false)}
      >
         <CreateMasterForm onSuccess={() => setCreateMasterModal(false)} />
      </ContentModal>

      {/* Modal for Creating a Pilot */}
      <CreateBotModal open={createBotModal} setModal={setCreateBotModal} />
   </>;
}
