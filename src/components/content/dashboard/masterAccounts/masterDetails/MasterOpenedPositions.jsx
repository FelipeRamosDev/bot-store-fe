import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';

/**
 * MasterOpenedPositions component displays a list of opened positions for a given master account.
 * It filters out the positions that are currently opened and displays them in a table.
 *
 * @param {Object} master - The master account object containing slot and trade information.
 * @returns {JSX.Element} The rendered component displaying opened positions.
 */
export default function MasterOpenedPositions({ master }) {
   // Array to hold the filtered opened positions
   const openedPositions = [];

   // Filter trades that have the status 'opened'
   master?.slots.forEach(slot => {
      slot.trades.forEach(position => {
         if (position.status === 'opened') {
            openedPositions.push(position);
         }
      });
   });

   return (
      <div className="opened-positions">
         <ContentHeader>
            <h3 className="header-title">Opened Positions</h3>
         </ContentHeader>

         <PositionsTable positionsSet={openedPositions} />
      </div>
   );
}
