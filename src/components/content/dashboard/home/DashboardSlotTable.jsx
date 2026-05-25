import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import SlotsTable from '@/components/tables/slotsTable/SlotsTable';
import DBQueryContext from '@/contexts/DBQuery';
import { DataArray, Refresh } from '@mui/icons-material';
import { useContext } from 'react';

export default function DashboardSlotTable() {
   const { refresh } = useContext(DBQueryContext);

   return (
      <div className="column">
         <ContentHeader Toolbar={() => <RoundIconButton Icon={Refresh} onClick={() => refresh()} />}>
            <DataArray /> <h2 className="card-title">Slots</h2>
         </ContentHeader>

         <SlotsTable exclude={['pnl']} />
      </div>
   );
}
