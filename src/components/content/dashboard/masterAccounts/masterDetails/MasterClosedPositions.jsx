import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { Refresh } from '@mui/icons-material';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';

/**
 * MasterClosedPositions component displays a list of opened positions for a given master account.
 * It filters out the positions that are currently opened and displays them in a table.
 *
 * @param {Object} master - The master account object containing slot and trade information.
 * @returns {JSX.Element} The rendered component displaying opened positions.
 */
export default function MasterClosedPositions() {
   const { refresh } = useContext(DBQueryContext);

   return (
      <div className="closed-positions">
         <ContentHeader Toolbar={() => <RoundIconButton Icon={Refresh} onClick={refresh} />}>
            <h3 className="header-title">Closed Positions</h3>
         </ContentHeader>

         <PositionsTable exclude={['type']} />
      </div>
   );
}
