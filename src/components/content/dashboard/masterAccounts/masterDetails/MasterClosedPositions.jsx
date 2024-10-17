import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { Money, Refresh } from '@mui/icons-material';
import { useContext } from 'react';
import DBQueryContext, { DBQuery } from '@/contexts/DBQuery';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';

/**
 * MasterClosedPositions component displays a list of opened positions for a given master account.
 * It filters out the positions that are currently opened and displays them in a table.
 *
 * @param {Object} master - The master account object containing slot and trade information.
 * @returns {JSX.Element} The rendered component displaying opened positions.
 */
export default function MasterClosedPositions() {
   const { doc, refresh } = useContext(DBQueryContext);

   return (
      <ContentFullwidth useContainer={true}>
         {doc && <DBQuery
            type="query"
            collection="positions"
            filter={{ status: 'closed', master: doc._id }}
            sort={{ closeTime: -1 }}
            limit={11}
         >
            <div className="closed-positions">
               <ContentHeader Toolbar={() => <RoundIconButton Icon={Refresh} onClick={refresh} />}>
                  <Money />
                  <h3 className="header-title">Closed Positions</h3>
               </ContentHeader>

               <PositionsTable exclude={['type']} />
            </div>
         </DBQuery>}
      </ContentFullwidth>
   );
}
