import MastersGrid from '@/components/grids/mastersGrid/MastersGrid';

export default function DashboardContent() {
   return <>
      <MastersGrid masterList={[
         { type: 'master-live', pnl: 55.45 },
         { type: 'master-demo', pnl: -5.10 },
         { type: 'master-demo', pnl: -105.35 },
         { type: 'master-live', pnl: 505.00 },
         { type: 'master-demo', pnl: 75.81 }
      ]}/>
   </>;
}
