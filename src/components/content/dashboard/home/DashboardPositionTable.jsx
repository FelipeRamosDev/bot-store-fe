import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import DBQueryContext from '@/contexts/DBQuery';
import { Money, Refresh } from '@mui/icons-material';
import { useContext } from 'react';

/**
 * DashboardPositionTable component that renders a table displaying position data
 * with a header and a refresh button to reload the data.
 *
 * @returns {JSX.Element} The rendered dashboard component with a positions table.
 */
export default function DashboardPositionTable() {
   const { refresh } = useContext(DBQueryContext);

   return (
      <div className="column">
         <ContentHeader Toolbar={() => <RoundIconButton Icon={Refresh} onClick={() => refresh()} />}>
            <Money /> <h2 className="card-title">Positions</h2>
         </ContentHeader>

         <PositionsTable include={['symbol', 'usedLeverage', 'realizedProfit', 'openTime']} />
      </div>
   );
}
