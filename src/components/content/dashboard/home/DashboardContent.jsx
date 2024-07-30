import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';
import SlotsTable from '@/components/tables/slotsTable/SlotsTable';
import PositionsTable from '@/components/tables/positionsTable/PositionsTable';

const DUMMY_MASTER = [
   { type: 'master-live', pnl: 55.45 },
   { type: 'master-demo', pnl: -5.10 },
   { type: 'master-demo', pnl: -105.35 },
   { type: 'master-live', pnl: 505.00 },
   { type: 'master-demo', pnl: 75.81 },
   { type: 'master-demo', pnl: 75.81 },
   { type: 'master-demo', pnl: 75.81 },
   { type: 'master-demo', pnl: 75.81 },
];

const DUMMY_SLOT = [
   { name: 'BTC', master: { name: 'Master Name' }, type: 'slot-live', pnl: 55.45 },
   { name: 'BTC', master: { name: 'Master Name' }, type: 'slot-demo', pnl: -5.10 },
   { name: 'BTC', master: { name: 'Master Name' }, type: 'slot-demo', pnl: -105.35 },
   { name: 'BTC', master: { name: 'Master Name' }, type: 'slot-live', pnl: 505.00 },
   { name: 'BTC', master: { name: 'Master Name' }, type: 'slot-demo', pnl: 75.81 }
];

const DUMMY_POSITION = [
   { symbol: 'BTCUSDT', type: 'position-live', positionType: 'long', pnl: 55.45 },
   { symbol: 'BTCUSDT', type: 'position-demo', positionType: 'long', pnl: -5.10 },
   { symbol: 'BTCUSDT', type: 'position-demo', positionType: 'short', pnl: -105.35 },
   { symbol: 'BTCUSDT', type: 'position-live', positionType: 'long', pnl: 505.00 },
   { symbol: 'BTCUSDT', type: 'position-demo', positionType: 'short', pnl: 75.81 }
];

export default function DashboardContent() {
   return <>
      <MastersGrid masterList={DUMMY_MASTER}/>

      <div className="slots-positions">
         <div className="column">
            <h2 className="card-title">Slots</h2>

            <SlotsTable slots={DUMMY_SLOT} />
         </div>

         <div className="column">
            <h2 className="card-title">Positions</h2>

            <PositionsTable positions={DUMMY_POSITION} />
         </div>
      </div>
   </>;
}
