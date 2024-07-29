import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';
import SlotsTable from '@/components/tables/slotsTable/SlotsTable';

const DUMMY_MASTER = [
   { type: 'master-live', pnl: 55.45 },
   { type: 'master-demo', pnl: -5.10 },
   { type: 'master-demo', pnl: -105.35 },
   { type: 'master-live', pnl: 505.00 },
   { type: 'master-demo', pnl: 75.81 }
];

const DUMMY_SLOT = [
   { name: 'BTC', master: { name: 'Master Name'}, type: 'slot-live', pnl: 55.45 },
   { name: 'BTC', master: { name: 'Master Name'}, type: 'slot-demo', pnl: -5.10 },
   { name: 'BTC', master: { name: 'Master Name'}, type: 'slot-demo', pnl: -105.35 },
   { name: 'BTC', master: { name: 'Master Name'}, type: 'slot-live', pnl: 505.00 },
   { name: 'BTC', master: { name: 'Master Name'}, type: 'slot-demo', pnl: 75.81 }
];

export default function DashboardContent() {
   return <>
      <MastersGrid masterList={DUMMY_MASTER}/>

      <div className="slots-positions">
         <div className="column" padding="m" radius="s">
            <h2 className="card-title">Slots</h2>

            <SlotsTable slots={DUMMY_SLOT} />
         </div>

         <div className="column" padding="m" radius="s">
            <h2 className="card-title">Positions</h2>
         </div>
      </div>
   </>;
}
