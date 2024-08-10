import PositionsTable from '@/components/tables/positionsTable/PositionsTable';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';

export default function MasterOpenedPositions({ master }) {
   const openedPositions = [];
   
   master?.slots.map(slot => {
      slot.trades.map(position => (position.status === 'opened') && openedPositions.push(position));
   });

   return <div className="opened-positions">
      <ContentHeader>
         <h3 className="header-title">Opened Positions</h3>
      </ContentHeader>

      <PositionsTable positionsSet={openedPositions} />
   </div>
}